import * as Koa from 'koa'

export default function (ctx: Koa.Context, next: () => void) {
  console.log("LocalMiddleware: mark.ts")
  next()
}
