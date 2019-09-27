import * as Koa from 'koa'

export default async function (ctx: Koa.Context, next: () => Promise<any>) {
  if (ctx.session === null || ctx.session.user) {
    console.log("用户已登录：", ctx.session.user)
    await next()
  } else {
    console.error("用户未登录")
    ctx.throw("Please Login First", 403)
  }

}
