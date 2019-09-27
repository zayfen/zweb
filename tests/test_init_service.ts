import 'mocha'
import { assert } from 'chai'
import InitSevice from '../src/services/init_service'
import ArticleService from '../src/services/article_service'
import { equal } from 'assert'

describe('InitService', function () {
  it('初始化数据库 init()', function () {
    let service = new InitSevice
    service.init()

    let articleService = new ArticleService()
    articleService.getArticlesByUser('zayfen').then(articles => {
      console.log(articles)
      assert.equal(articles.length, 1, 'Article Length Should Be 1')
    })
    
  })
})