import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as path from 'path'
import { boot } from './core/boot'

const app = new Koa()
const router = new Router()

// initialized global

boot(router)


// router.get('/*', async (ctx: Koa.Context) => {
//   ctx.body = "Hello World!"
// })


app.use(router.routes())

const PORT = process.env.PORT || 8000
app.listen(PORT);

console.log("Server Running On Port " + PORT)


