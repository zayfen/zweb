import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as cors from 'koa2-cors'
import { boot } from './core/boot'

const app = new Koa()
const router = new Router()
import * as session from 'koa-session'

app.keys = ['abcK2?xZ', '12D@KiS::)d', 'kSJDfkjwe(23r}{']

app.use(async (ctx, next) => {
  console.log("request: ", ctx.originalUrl)
  // console.log("router.stack", router.stack)
  try {
    await next()  
  } catch (error) {
    ctx.app.emit('error', error, ctx)
  }
})

const CONFIG = {
  key: 'sid', 
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: true, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
}
// install session
app.use(session(CONFIG, app))

// initialized global
boot(router)

app.use(cors({
  origin: 'http://localhost:8081',
  credentials: true
}))

app.use(router.routes())
app.use(router.allowedMethods())

app.on('error', (err, ctx) => {
  console.error("Error: ", err)
})

const PORT = process.env.PORT || 8000
app.listen(PORT);

console.log("Server Running On Port " + PORT)


