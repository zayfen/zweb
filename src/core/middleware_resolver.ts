import { MiddleWare, Decorators } from './types'
import * as path from 'path'
import { rejects } from 'assert'
import * as fs from 'fs'

const MiddlewareDir = path.resolve(__dirname, "../middlewares")

export function middlewareFilePath(middleware: string, middlewareDir: string): string {
  let filePath: string = path.resolve(middlewareDir + '/' + middleware + '.ts')
  return filePath
}

export async function middlewaresFromDecorators(decorators: Decorators, targetFile: string): Promise<Array<MiddleWare>> {
  let middlewares: Array<MiddleWare> = []

  for (let i = 0; i < decorators.length; i++) {
    let decorator = decorators[i]
    if (decorator.callee === 'MIDDLEWARE') {
      middlewares.push(await findMiddleware(decorator.args[0], targetFile))
    }
  }

  return middlewares
}


export async function resolveMixMiddlewares(middlewares: Array<MiddleWare | string>, middlewaresDir?: string): Promise<MiddleWare[]> {
  let ret: MiddleWare[] = []
  for (let i = 0; i < middlewares.length; i++) {
    let item = middlewares[i]
    if (typeof item === 'string') {
      ret.push(await findMiddleware(item, middlewaresDir))
      continue
    }
    ret.push(item)
  }
  return ret
}

export function findMiddleware(middleware: string, middlewaresDir?: string): Promise<MiddleWare> {
  return new Promise<MiddleWare>((resolve, reject) => {
    if (!middlewaresDir) { // prevent targetFile is undefined or emtpry string
      middlewaresDir = MiddlewareDir
    }

    let mwPath: string = middlewareFilePath(middleware, middlewaresDir)
    if (!fs.existsSync(mwPath)) { // targetFile中没有找到中间件文件
      mwPath = middlewareFilePath(middleware, MiddlewareDir)
    }
    import(mwPath).then(obj => {
      resolve(obj.default)
    })
  })
}
