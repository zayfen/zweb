import * as path from 'path'
import * as KoaRouter from 'koa-router'
import * as parser from '@babel/parser'
import { ClassDeclaration, Statement, ClassMethod, Decorator as BabelDecorator } from '@babel/types'

import { readFile } from '../utils/fs_utils'
import { normalizePath } from '../utils/uri_utils'
import { MethodMeta, MethodsMetas, BaseRouter, Decorators, MiddleWare } from './types'

import { simplifyCode } from './simplify_code'

import { middlewaresFromDecorators, resolveMixMiddlewares } from './middleware_resolver'

// global varable to hold current controller file

async function resolveRoutes(tsFile: string): Promise<KoaRouter> {

  // let code = simplifyCode(readFile(tsFile))
  let code = readFile(tsFile)
  //  console.log(code)

  let ast = parser.parse(code, {
    // parse in strict mode and allow module declarations
    sourceType: 'module',
    plugins: [
      'typescript',
      'classProperties',
      'classPrivateProperties',
      'classPrivateMethods',
      ['decorators', { decoratorsBeforeExport: true }]
    ],
  })

  // only handle first class
  let classDeclarationNode: Statement = ast.program.body.filter((node: ClassDeclaration) => node.type === 'ClassDeclaration')[0]
  if (classDeclarationNode.type !== 'ClassDeclaration') {
    return null
  }

  let classBody = classDeclarationNode.body.body

  let publicMethodsNodes: Array<ClassMethod> = []
  classBody.forEach(node => {
    if (node.type === 'ClassMethod' && node.accessibility === 'public') {
      publicMethodsNodes.push(node)
    }
  })

  // resolve methods
  let methods: MethodsMetas = resolveMethods(publicMethodsNodes)

  let clazz: any = await import(tsFile)
  console.log("clazz: ", clazz)
  let instance: BaseRouter = new clazz.default()

  let router: KoaRouter = await routerFromMethods(instance, methods, path.dirname(tsFile) + '/middlewares')

  return router
}


// decoratorsNodes(babel generatored) => decorators
function decoratorsFromDecoratorsNodes(decoratorsNodes: Array<BabelDecorator>): Decorators {
  let decorators: Decorators = decoratorsNodes.map((decoratorNode: any) => {
    return { callee: decoratorNode.expression.callee.name, args: decoratorNode.expression.arguments.map((node: any) => node.value) }
  })
  return decorators
}

// 将methods转成router
async function routerFromMethods(instance: BaseRouter, methods: MethodsMetas, localMiddrewareDir: string): Promise<KoaRouter> {
  console.log("localMiddlewareDir: ", localMiddrewareDir)
  let prefix: string = instance.prefix || ''
  let router = new KoaRouter()

  router = router.prefix(prefix)
  const allMethods: string[] = ['GET', 'POST', 'PUT', 'DEL', 'DELETE', 'HEAD', 'OPTION', 'PATCH', 'ALL']

  // methods.forEach(async (method: MethodMeta) => {
  for (let i = 0; i < methods.length; i++) {
    let method = methods[i]
    console.log(" ===================================================== ")
    let methodName: string = method.method

    let middlewares: Array<MiddleWare> = await resolveMixMiddlewares(instance.classMiddlewares(), localMiddrewareDir)
    console.log("Class Middlewares: ", middlewares)

    let middlewareDecorators = method.decorators.filter(decorator => allMethods.indexOf(decorator.callee) === -1)
    let httpDecorators = method.decorators.filter(decorator => allMethods.indexOf(decorator.callee) > -1)
    middlewares = middlewares.concat(await middlewaresFromDecorators(middlewareDecorators, localMiddrewareDir))

    httpDecorators.forEach((decorator, index) => {
      let callee: string = decorator.callee
      let args: Array<string | MiddleWare> = decorator.args

      let httpMethod: string = callee
      let path: string = normalizePath(prefix + args[0])
      console.log("HttpMethod: ", httpMethod, " ;Path: ", path)

      if (index == 0) { // 防止多次添加method
        middlewares.push(instance[methodName].bind(instance))
      }

      console.log("Path: ", path, " ;Middlewares: ", middlewares)

      switch (httpMethod) {
        case 'GET':
          router.get(path, ...middlewares)
          break
        case 'POST':
          router.post(path, ...middlewares)
          break
        case 'PUT':
          router.put(path, ...middlewares)
          break
        case 'DEL':
        case 'DELETE':
          router.del(path, ...middlewares)
          break
        case 'HEAD':
          router.head(path, ...middlewares)
          break
        case 'ALL':
          router.del(path, ...middlewares)
        default:
          console.log("This http method is ignorged: ", httpMethod)
      }
    })                          // end forEach
  }
  //  })

  return router
}



// 解析请求path中的param
function parseParams(path: string): string[] {
  let params: string[] = []
  if (!path) {
    return []
  }

  let seperator: string = '/:'
  let _paramPos: number = 0
  let positions: number[] = []
  while ((_paramPos = path.indexOf(seperator, _paramPos)) > -1) {
    positions.push(_paramPos)
    _paramPos += seperator.length
  }

  positions.forEach((pos, index) => {
    let begin: number = pos + seperator.length
    if (index === positions.length - 1) {
      params.push(path.slice(begin))
    } else {
      let len: number = positions[index + 1] - pos + 1 - seperator.length
      params.push(path.substr(pos + 2, len))
    }
  })

  return params
}


// 解析class中的methods信息
function resolveMethods(classMethodsNodes: Array<ClassMethod>): MethodsMetas { // 
  let methodsWithDecorators: Array<ClassMethod> = classMethodsNodes.filter((methodNode: any) => true === !!methodNode.decorators)
  // console.log(methodsWithDecorators)

  return methodsMetasFromClassMethods(methodsWithDecorators)
}

// class methods nodes (from babel) => MethodsMetas
function methodsMetasFromClassMethods(methodsNodes: Array<ClassMethod>): MethodsMetas {
  let methods: MethodsMetas = methodsNodes.map((methodNode: any) => {
    let methodName: string = methodNode.key.name

    let decorators: Decorators = decoratorsFromDecoratorsNodes(methodNode.decorators)
    return { method: methodName, decorators: decorators }
  })

  return methods
}

export { resolveRoutes, resolveMethods }
