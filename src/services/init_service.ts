
import config from '../../config'
import  { ArticleDAO, ArticleMeta } from '../dao/article_dao'
import { parseHexoMd, publishDate, mdUriPath } from '../utils/md_utils'
import { listDirectoryFiles } from '../utils/fs_utils'
import { cutPath } from '../utils/path_utils'
import * as path from 'path'


/**
 * 业务层
 */
class InitService {
  private db: ArticleDAO = null
  constructor () {
    if (this.db === null) {
      this.db = new ArticleDAO()
    }
  }

  public init () {
    this.initArticlesDb()
  }

  /* 初始化articles database */
  public initArticlesDb () {
    let files: string[] = listDirectoryFiles(path.resolve(config.hexoRoot, './source/_posts'))
    files.forEach((md: string, index: number) => {
      let mdInfo = parseHexoMd(md)
      let article: ArticleMeta = {
        title: mdInfo.title,
        author: mdInfo.author,
        tags: mdInfo.tags,
        categories: mdInfo.categories,
        archives: mdInfo.archives,
        publishDate: publishDate(md),
        path: cutPath(md, config.hexoRoot),
        url: mdUriPath(md)
      }

      this.db.insertArticle(article).then( value => {
        console.log("InserArticle Success: ", value)
      }).catch( err => {
        console.log("InsertArticle Error: ", err)
      })

    })
  }

  /* @Deprecated: initAccountDb() */
  public initAccountDb () {

  }

}

export default InitService