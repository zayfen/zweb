# zweb ...
一个基于 Koa + Typescript 的web框架。利用typescript的decorator简化路由和中间件的编写

## Introduction

### 框架结构介绍


#### 工程结构树

![工程结构树](https://res.cloudinary.com/zayfen/image/upload/v1569573329/img/njlr9vosuraeyuglt7uq.png)


#### 重要文件（夹）介绍

| 文件          | 描述                  |
| ------------- | --------------------- |
| app.json      | pm2启动配置文件       |
| config/       | 项目环境&业务配置目录 |
| logs/         | pm2日志目录           |
| src/          | 框架代码目录          |
| src/middlewares | 中间件目录 |
| src/middlewares/internal/ | 自启动加载的应用级中间件 |
| src/controllers/ | controller目录 |
| src/controllers/{module}/*.ts |  定义class router的ts文件 |
| src/controllers/{module}/middlewares/ |  属于class & method 的中间件，也可以称为 module级的中间件，主要给当前的 module中的 class  和 method 使用|
| tests/        | 单元测试目录          |
| tsconfig.json | typescript 配置文件   |


### Usage

#### 启动
```bash

# 启动之前
npm install
pm2 install typescript

# 开发环境启动
npm run dev

# 生产环境启动
npm run start
```



#### 增加controller
在`src/controllers/`下面建立一个模块目录，比如moduleA, 在moduleA目录下建立你的typescript文件，文件中创建 继承 BaseRouter的Class， 比如 class Index extends BaseRouter; 在class中就可以用 @GET  @MIDDLEWARE 等增加接口协议路径 和中间件

e.g.: src/controllers/index/index.ts
```typescript
/**
   This is index router
 */
import * as Koa from 'koa'
import { GET, POST, MIDDLEWARE } from '../../core/decorators'
import { BaseRouter, MiddleWare } from '../../core/types'

class Index implements BaseRouter {
  prefix: string = '/'  // 路由前缀
  name: string = 'zayfen'

// class级中间件
  public classMiddlewares(): Array<MiddleWare | string> {
    return ['auth']
  }

  // path: "/"，仅支持get方法
  @MIDDLEWARE('mark')
  @MIDDLEWARE('auth')
  @GET("/")
  public GetRoot(ctx: Koa.Context) {
    ctx.body = "GetName: Hello World"
  }

// path: "/name", 支持get 和 post 方法
  @GET("/name")
  @POST("/name")
  public GetName(ctx: Koa.Context) {
    console.log(ctx.method)
    ctx.body = this.name
  }

//（带有参数） path: "/search/:name/:age", 仅支持get方法
  @GET("/search/:name/:age")
  public GetNameAndAge(ctx: Koa.Context) {
    ctx.body = JSON.stringify(ctx.params)
  }

// 这个不是路由，只是一个普通的method
  private GetAge(ctx: Koa.Context) {
    ctx.body = "_GetAge"
  }
}

/**
   export: Index Router
*/

```
**注意**:

* 路由函数必须是public的
* BaseRouter.prefix： 指定路由的前缀
* BaseRouter.classMiddlewares(): 返回class级别的中间件，此处指定的中间件会对所有的method生效，并且在method中间件之前执行



#### 增加应用级中间件
在` src/middlewares/internal/ `中增加中间件文件，增加的文件会在应用启动的时候主动加载

#### 增加class & method 级中间件
在对应的 `src/controllers/{module}/middlewares/`目录中增加中间件文件，此处的中间件只是给当前模块中的 class和method使用
> class 和 method中间件的查找顺序: src/controllers{odule}/middlewares/  => /src/middlewares/




