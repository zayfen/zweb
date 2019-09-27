/**
   This is index router
 */
import * as Koa from 'koa'
import { GET, POST, MIDDLEWARE } from '../../core/decorators'
import { BaseRouter, MiddleWare } from '../../core/types'
import ArticleService from '../../services/article_service'

class Index implements BaseRouter {
  prefix: string = '/api/article'
  articleService = new ArticleService()

  public classMiddlewares(): Array<MiddleWare | string> {
    return ['auth']
  }

  @GET('/list')
  public async getArticleList (ctx: Koa.Context) {
    let user: string = ctx.session.user
    let articles = await this.articleService.getArticlesByUser(user)
    ctx.body = { code: 0, message: 'success', data: { list: articles } }
  }
}

/**
   export: Index Router
*/

export default Index
