const fs=require('fs')
const config=require('../config')
const path=require('path')
  let writeDataToFile=  function (config){
      let writerStream =  fs.createWriteStream(path.resolve(__dirname,'..//config.json'))
           writerStream.write(JSON.stringify(config),'UTF8');
          writerStream.end();
   }
let addProjectToConfig=function(project_name,_path,callback){
    config.webhook=config.webhook||[]
    _path=_path||path.join(__dirname,'../')
    let server=config.webhook.find(function(webhooks){ return webhooks.key==project_name})
    if(server){
        server.path=_path;
    }else{
        config.webhook.push({
            path:_path,
            key:project_name
        })
    }
    writeDataToFile(config)
    callback?callback():function(){}
}
let deleteProjectToConfig=function(project_name,callback){
    if(!project_name) throw new Error('project_name 不能为空!')
    config.webhook=config.webhook||[]
    let index=config.webhook.findIndex(function(webhooks){ return webhooks.key==project_name})
    if(index >-1){
        config.webhook.splice(index,1)
    }
    writeDataToFile(config)
    callback?callback():function(){}
}
let getProjectToConfigList=function(){
    return config.webhook
}
module.exports={
    getProjectToConfigList,
    addProjectToConfig,
    deleteProjectToConfig
}