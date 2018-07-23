let gitlabAutoPushManageServer=require("../server/gitlabAutoPushManageServer")


describe('gitlabAutoPushManageServer',function(){
    describe('addProjectToConfig',function(){
        it('加入自动运行的项目',function(done){
            gitlabAutoPushManageServer.addProjectToConfig('d:/nodeproject/webhookdev/bin','ZORE',function(){
                done()
            })
        })
    }),
   describe('deleteProjectToConfig',function(){
        it('加入自动运行的项目',function(done){
            gitlabAutoPushManageServer.deleteProjectToConfig('ZORE',function(){
                done()
            })
        })
    })
})