import * as Router from 'koa-router'
import { controllersFiles } from './controllers'
import { internalMiddlewares } from './middlewares'
import { resolveRoutes } from './router_resolver'

// init global env, such as application middlewares, etc...
function globalInit(router: Router) {
  return new Promise((resolve, rejects) => {

    // init applications middlewares
    let middlewaresTsFiles = internalMiddlewares()
    if (middlewaresTsFiles.length === 0) {
      return resolve(true)
    }

    for (let i = 0; i < middlewaresTsFiles.length; i++) {
      import(middlewaresTsFiles[i]).then((obj: any) => {
        router.use(obj.default)
        if (i === middlewaresTsFiles.length - 1) {
          resolve(true)
        }
      }).catch((err) => {
        console.error("globalInit Error: ", err)
        resolve(false)
      })
    }


  })
}


function registerRouters(router: Router) {
  let controllers: string[] = controllersFiles()
  controllers.forEach((f: string) => {
    resolveRoutes(f).then(_r => router.use('', _r.routes()))
  })
}


export function boot(rootRouter: Router): Router {
  globalInit(rootRouter).then((success: boolean) => {
    if (!success) {
      throw new Error('Init Global Env Failed')
    }

    registerRouters(rootRouter)
  }).catch((err) => {
    console.error("boot error: ", err)
  })

  return rootRouter
}
