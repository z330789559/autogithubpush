let assert = require('chai').assert;
const gitlabOperatorServer =require("../server/gitlabOperatorServer")
describe('githuboperator',function(){
    describe("getPrivateToken",function(){
        it('获取用户token',function(done){
            gitlabOperatorServer.getPrivateToken('libaozhong','yyaaf11314',function(error,data){
                assert.equal("李保忠",data.name)
                done()
            })
        })
    }),
        describe("getUserList",function(){
            it('获取用户列表',function(done){
                gitlabOperatorServer.getUserList('QdxwxNs1trfK5CkgFvwn',function (error,data) {
                    done()
                })
            })

        }),
        describe("getUserProjects",function(){
            it('获取用户项目列表',function(done){
                let user_id=253;
                gitlabOperatorServer.getUserProjects(user_id,function(error,data){
                    done()
                })
            })
        }),
        describe("getAllBranchsOfProject",function(){
            it('获取项目下所有分支',function(done){
                let project_id=465,private_token='QdxwxNs1trfK5CkgFvwn';
                gitlabOperatorServer.getAllBranchsOfProject(private_token,project_id,function(error,data){
                    done()
                })
            })
        })
        describe("addNewBranch",function(){
            it('增加新的分支',function(done){
                let project_id=465,private_token='QdxwxNs1trfK5CkgFvwn'
                gitlabOperatorServer.addNewBranch(private_token,project_id,'master','testbranch',function(error,data){
                    done()
                })
            })
        }),
            describe("setBranchProtect",function(){
            it('设置新的分支',function(done){
                let project_id=465,private_token='QdxwxNs1trfK5CkgFvwn'
                gitlabOperatorServer.setBranchProtect(project_id,'testbranch',private_token,function(error,data){
                    done()
                })
            })
        }),
            describe("unBranchProtect",function(){
                it('取消分支保护',function(done){
                    let project_id=465,private_token='QdxwxNs1trfK5CkgFvwn'
                    gitlabOperatorServer.unBranchProtect(project_id,'testbranch',private_token,function(error,data){
                        done()
                    })
                })
            }),
            describe("deleteBranch",function(){
            it('删除新的分支',function(done){
                let project_id=465,private_token='QdxwxNs1trfK5CkgFvwn'
                gitlabOperatorServer.deleteBranch(private_token,project_id,'testbranch',function(error,data){
                    done()
                })
            })
        })
})

