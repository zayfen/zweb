import { Context } from 'koa'
import * as koaBody from 'koa-body'

export default koaBody()

// export default function (ctx: Context, next: () => void) {
//   console.log("This is Global Middleware")
//   next()
// }
