const  Request= require('request')
const ServerPath =require('../config').serverdom
const bl=require('bl')
let PRIVATE_TOKEN;
/**
 * 根据用户名密码获取private_token
 * @param username
 * @param password
 * @param callback
 */
let getPrivateToken= function(username,password){
   let url=ServerPath+'session'
    let requestData={
        login:username,
        password:password
    }
    return new Promise((resolve, reject)=> {
        Request({
            url: url,
            method: 'POST',
            json: true,
            headers: {
                "content-type": "application/json"
            },
            body: requestData
        }).pipe(bl(function (error, data) {
            if(!data)reject()
            let info=JSON.parse(data.toString())
            if(error)reject(error);
            info&&!info.error?resolve(info['private_token']):reject(info.error)
        }))
    })
}
/**
 * 获取用户列表
 * @param private_token
 * @param callback
 */
let getUserList= function (private_token,page,per_page){

        let url=ServerPath+'users?page='+page+'&per_page='+per_page
    return new Promise((resolve, reject)=>{
        Request(url,{
            headers:{
                "PRIVATE-TOKEN":private_token
            }
        }).pipe(bl(function(error,res){
          resolve(JSON.parse(res.toString()))
        }))
    })

}

/**
 * 获取用户账号相关的gitlab项目
 * @param user_id
 * @param callback
 */
let getUserProjects=function(user_id,callback){
    let url=ServerPath+'/users/'+user_id+'/projects'
    return new Promise((resolve, reject)=> {
    Request.get(url).pipe(bl(function(error,data){
        resolve(JSON.parse(data.toString()))
    }))})
}

/**
 * 获取项目下所有分支
 *  @param private_token
 * @param project_id
 * @param callback
 */
let getAllBranchsOfProject=function(private_token,project_id,callback){
    let url=ServerPath+'projects/'+project_id+'/repository/branches'
    return new Promise((resolve, reject)=> {
    Request(url,{
        method:"GET",
        headers:{
            "PRIVATE-TOKEN":private_token
        }
    }).pipe(bl(function(error,data){
        resolve(JSON.parse(data.toString()))
    }))})
}

/**
 * 创建新的分支
 * @param project_id
 * @param ref   引用的分支
 *  @param private_token
 * @param branch_name
 * @param callback
 */
let addNewBranch=function(private_token,project_id,ref,branch_name,callback){
    let url=ServerPath+'projects/'+project_id+'/repository/branches?branch='+branch_name+'&ref='+ref
    return new Promise((resolve, reject)=> {
        Request(url, {
            method: 'POST',
            headers: {
                "PRIVATE-TOKEN": private_token
            }
        }).pipe(bl(function (error, data) {
            resolve(JSON.parse(data.toString()))
        }))
    })
}
/**
 * 删除分支
 * @param project_id
 *  @param private_token
 * @param branch_name
 * @param callback
 */
let deleteBranch=function(private_token,project_id,branch_name,callback){
    let url=ServerPath+'projects/'+project_id+'/repository/branches/'+branch_name
    return new Promise((resolve, reject)=> {
        Request(url,{
        method:'DELETE',
        headers:{
            "PRIVATE-TOKEN":private_token
        }
    }).pipe(bl(function(error,data){
        resolve(data)
    }))})
}

/**
 * 设置被保护的分支
 * @param project_id
 *  @param private_token
 * @param branch_name
 * @param callback
 */
let setBranchProtect=function(project_id,branch_name,private_token,callback,developers_can_push,developers_can_merge){
     arguments.length<5?developers_can_push=true:true;
     arguments.length<6?developers_can_merge=true:true;
    let url=ServerPath+'projects/'+project_id+'/repository/branches/'+branch_name+'/protect?developers_can_push='+developers_can_push+'&developers_can_merge='+developers_can_merge
    return new Promise((resolve, reject)=> {
        Request(url, {
            method: 'PUT',
            headers: {
                "PRIVATE-TOKEN": private_token
            }
        }).pipe(bl(function (error, data) {
            resolve(data.toString())
        }))
    })
}

/**
 * 取消被保护的分支
 * @param private_token
 * @param project_id
 * @param branch_name
 * @param callback
 */
let unBranchProtect=function(project_id,branch_name,private_token,callback){
    let url=ServerPath+'projects/'+project_id+'/repository/branches/'+branch_name+'/unprotect'
    return new Promise((resolve, reject)=> {
        Request(url,{
            method:'PUT',
            headers:{
                "PRIVATE-TOKEN":private_token
            }
        }).pipe(bl(function(error,data){
            resolve(JSON.parse(data.toString()))
        }))
    })
}
let getProjects=function(page=1,per_page=20){
    let url=ServerPath+'projects?page='+page+'&per_page='+per_page
    return new Promise((resolve,reject)=>{
        Request.get(url).pipe(bl(function(error,data){
            resolve(JSON.parse(data.toString()))
        }))
    })
}
module.exports={
    getPrivateToken,
    addNewBranch,
    getUserProjects,
    getAllBranchsOfProject,
    getUserList,
    getPrivateToken,
    deleteBranch,
    setBranchProtect,
    unBranchProtect,
    getProjects
}