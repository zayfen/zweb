import { BaseRouter, MiddleWare } from '../../core/types'
import { GET } from '../../core/decorators'
import { Context } from 'koa'


class Message implements BaseRouter {
  prefix: string = '/message'

  public classMiddlewares(): Array<MiddleWare | string> {
    return []
  }

  @GET("/:messageId")
  public getMessageById(ctx: Context) {
    ctx.body = "Hello this is message from " + ctx.params.messageId
  }
}

export default Message
