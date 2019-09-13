// Just a mark

import { MiddleWare } from './types'
import * as fs from 'fs'
import { middlewareFilePath } from './middleware_resolver'

export function GET(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // pass
  }
}

export function POST(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // pass
  }
}


export function PUT(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // pass
  }
}

export function DELETE(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // pass
  }
}

export function HEAD(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // pass
  }
}

export function PATCH(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // pass
  }
}

export function ALL(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // pass
  }
}

export function MIDDLEWARE(middleware: string) {
  return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): any {
    // if (typeof path === 'string') {
    //   if (!fs.existsSync(middlewareFilePath(middleware))) {
    //     throw new Error("Middleware not existed: " + middlewareFilePath(middleware))
    //   }
    // }
  }
}
