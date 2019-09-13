import { Context } from 'koa'

export default function (ctx: Context, next: () => void) {
  console.log("This is Global Middleware")
  next()
}
