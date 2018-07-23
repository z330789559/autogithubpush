/**
 * gitlab webhook 回掉捕获和自动发布服务
 *
 */
const  createHandler = require('../libs/gitlab-webhook-koahandler.js')
let child_process = require('child_process');
const  handler = createHandler({ path: '/api/github', secret: 'webhooktest' })
const config=require('../config')
const tools=require('../libs/tools')
let GitHubServer={}
handler.on('push',(event)=>{
        console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref);
        startPublish(event.payload.repository.name)
})
handler.on('error', function (err) {
    console.error('Error:', err.message)
})
/**
 *  接收 /api/github post请求 调用hander处理请求信息
 * @param req
 * @param res
 */
GitHubServer.handerPost=function(req,res){
        return handler(req, req, function (error) {
            if (!error) {
                res.statusCode = 404
                res.end('no such location')
            }else{
                res.statusCode = 200
                res.end('success')
            }

        })

}

/**
 * 根据 配置项目名称例如ariesframe 获取gitlab地址 然后执行约定auto.bat批处理文件自动发布
 * @param name 代码从仓库名字 例如ariesframe
 */
function startPublish(name){
    let _path,filename;
    if(config && Array.isArray(config.webhook)){
        _path=config.webhook.find(function(key,index){return key.name==name})
        if(_path){
              try{
                filename=tools.getOsInfo()=="Windows_NT"?"auto.bat":"auto.sh";
                child_process.execFile(filename,null,{cwd:_path.path},function(error,stdout,stderr){
                    console.log(stdout)
                })
              }catch (e) {
                  throw  new Error(e)
              }
        }
    }
}
module.exports=GitHubServer