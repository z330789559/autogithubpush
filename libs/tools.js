const os=require('os')

module.exports.getOsInfo=function () {
    return os.type();
}