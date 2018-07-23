const EventEmitter = require('events').EventEmitter
function create (options) {
    if (typeof options != 'object')
        throw new TypeError('must provide an options object')

    if (typeof options.path != 'string')
        throw new TypeError('must provide a \'path\' option')

    // make it an EventEmitter, sort of
    handler.__proto__ = EventEmitter.prototype
    EventEmitter.call(handler)

    return handler

    function handler (req, res, callback) {
        if (req.req.url.split('?').shift() !== options.path)
            return callback()

        function hasError (msg) {
            res.writeHead(400, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: msg }))

            var err = new Error(msg)

            handler.emit('error', err, req)
            callback(err)
        }

        var event = req.headers['x-gitlab-event'];

        if (!event){
            return hasError('No X-Gitlab-Event found on request')
        }


            var obj=req.body

            if(!obj ){
                return hasError(e)
            }
             try{
                     JSON.parse(JSON.stringify(obj))
             }catch (e) {
                 return hasError(e)
             }
            // console.log(obj);
            var event = obj.object_kind;

            // invalid json
            if (!obj || !obj.repository || !obj.repository.name) {
                return hasError('received invalid data from ' + req.headers['host'] + ', returning 400');
            }

            var repo = obj.repository.name;

            res.res.writeHead(200, { 'content-type': 'application/json' })
            res.res.end('{"ok":true}')

            var emitData = {
                event   : event
                , payload : obj
                , protocol: req.protocol
                , host    : req.headers['host']
                , url     : req.url
            }

            handler.emit(event, emitData)
            handler.emit('*', emitData)
        }
}
module.exports = create
