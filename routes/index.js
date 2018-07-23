const router = require('koa-router')()
router.prefix('/web')
router.get('/*', async (ctx, next) => {
   await ctx.render('index', {})
   await next()
})
module.exports = router
