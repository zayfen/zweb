
import config from '../../config'
import  { ArticleDAO, ArticleMeta } from '../dao/article_dao'
import { parseHexoMd, publishDate, mdUriPath } from '../utils/md_utils'
import { listDirectoryFiles } from '../utils/fs_utils'
import { cutPath } from '../utils/path_utils'


/**
 * 业务层
 */
class ArticlService {
  private db: ArticleDAO = null
  constructor () {
    if (this.db === null) {
      this.db = new ArticleDAO()
    }
  }

  public getArticlesByUser (author: string): Promise<ArticleMeta[]> {
    return new Promise((resolve, reject) => {
      this.db.findArticleByAuthor(author).then(articles => resolve(articles))
    })
  }

}

export default ArticlService

