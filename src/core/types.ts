import * as Koa from 'koa'


interface RouterPrefix {
  prefix: string
}

export interface BaseRouter extends RouterPrefix {
  [key: string]: any,
  classMiddlewares: () => Array<MiddleWare | string>
}

export interface MethodMeta {
  method: string,
  decorators: Decorators
}

export type MethodsMetas = Array<MethodMeta>


export interface Decorator {
  callee: string,
  args: Array<string>
}

export type Decorators = Array<Decorator>


export interface MiddleWare extends Function {
  (ctx: Koa.Context, next: () => void): void;
}

// export type MiddleWare = (ctx: Koa.Context, next: () => any) => any
