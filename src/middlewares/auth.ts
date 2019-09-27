import * as Koa from 'koa'

export default async function (ctx: Koa.Context, next: () => Promise<any>) {
  console.log("auth")
  await next()
}
