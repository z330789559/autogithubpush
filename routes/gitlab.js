const router = require('koa-router')()
const gitlabServer =require('../server/gitlabAutoServer')
const gitlabAutoPushManageServer=require('../server/gitlabAutoPushManageServer')
const gitlabOperatorServer=require("../server/gitlabOperatorServer")
const querystring = require("querystring");
const HAS_MORE=3,HAS_CURRENT=1,ERROR_UNLOGIN=0
router.prefix('/api')

router.post('/github',function(ctx,next){
              console.log(ctx)
    gitlabServer.handerPost(ctx.request,ctx.respose)
      ctx.body="github restart"
       next()
})

/**
 * status:0,正常1，没有数据，2未登录
 */
router.get('/getUserList',async function(ctx,next){
     let session=ctx.session;
     let query=ctx.req.url.split("?")[1];
     let page=  querystring.parse(query)['pageIndex']||0;
     if(session['gitlab-token']){
         let userlist=await gitlabOperatorServer.getUserList(session['gitlab-token'],page,20)
         if(!!userlist && Array.isArray(userlist)){
             if(userlist.length ==20){
                 ctx.body={
                     status:HAS_MORE,
                     user:userlist}
             }else{
                 ctx.body = {
                     status: HAS_CURRENT,
                     user: userlist
                 }
             }
         }else{
             ctx.body={
                 status:ERROR_UNLOGIN,
                 user:[]
             }
         }

     }else{
         ctx.body={
            status:ERROR_UNLOGIN,
             user:[]
         }

     }
        next()
}

)
router.post('/getUserToken',async function (ctx,next) {
    let body=  ctx.request.body,res=ctx.response;
    let session=ctx.session;
    let login= body['login'],password=body['password']
    let gitlabToken=await gitlabOperatorServer.getPrivateToken(login,password)
    if(gitlabToken){
        session['gitlab-token']=gitlabToken
        ctx.body={
            "result":"ok"
        }
    }
    next()
})

router.post("/addProjectToConfig",async function(ctx,next){
    let body=  ctx.request.body
    let projectname= body['projectname'],workparh=body['workparh']
    try{
        gitlabAutoPushManageServer.addProjectToConfig(projectname,workparh)
        ctx.body={
            status:HAS_CURRENT
        }
    }catch(e){
        ctx.body={
            status:ERROR_UNLOGIN,
            error:e.message
        }
    }
    next()
})

router.get("/projectToConfigList",async function (ctx,next) {
   let projects= await gitlabAutoPushManageServer.getProjectToConfigList()
    ctx.body={
       status:HAS_CURRENT,
        user:projects
    }
    next()
})

router.get("/projects",async function (ctx,next) {
    let query=ctx.req.url.split("?")[1];
    let page=  querystring.parse(query)['pageIndex']||0;
   let projects= await gitlabOperatorServer.getProjects(page)
    ctx.body={
        status:HAS_MORE,
        user:projects
    }
    next()
})
module.exports = router
