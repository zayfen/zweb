/**
   This is index router
 */
import * as Koa from 'koa'
import { GET, POST, MIDDLEWARE } from '../../core/decorators'
import { BaseRouter, MiddleWare } from '../../core/types'

class Index implements BaseRouter {
  prefix: string = '/'
  name: string = '张云峰'

  public classMiddlewares(): Array<MiddleWare | string> {
    return ['auth']
  }

  // 获取name
  // Method: GET
  @MIDDLEWARE('mark')
  @MIDDLEWARE('auth')
  @GET("/")
  public GetRoot(ctx: Koa.Context) {
    ctx.body = "GetName: Hello World"
  }

  @GET("/name")
  @POST("/name")
  public GetName(ctx: Koa.Context) {
    console.log(ctx.method)
    ctx.body = this.name
  }

  @GET("/search/:name/:age")
  public GetNameAndAge(ctx: Koa.Context) {
    ctx.body = JSON.stringify(ctx.params)
  }


  private _GetAge(ctx: Koa.Context) {
    ctx.body = "_GetAge"
  }
}

/**
   export: Index Router
*/

export default Index
