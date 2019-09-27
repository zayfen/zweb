import * as Nedb from 'nedb'
import { pathRelativeRoot } from '../utils/path_utils'

export interface ArticleMeta {
  title: string,
  author: string,
  publishDate?: string,
  tags?: string[],
  categories?: string[],
  archives?: string[],
  url: string,
  path: string // 文件存储路径
}

const db = new Nedb<ArticleMeta>({ filename: pathRelativeRoot('data/articles.db'), autoload: true })

export class ArticleDAO {
  private db: Nedb<ArticleMeta> = null
  constructor () {
    if (this.db === null) {
      this.db = db
    }
  }


  public insertArticle (article: ArticleMeta): Promise<ArticleMeta> {
    return new Promise((resolve, reject) => {
      this.db.insert(article, function (err, newDocs) {
        if (err) {
          reject(err)
        } else {
          resolve(newDocs)
        }
      })   
    })

  }


  public findArticleByAuthor (author: string): Promise<Array<ArticleMeta>> {
    return new Promise((resolve, reject) => {
      this.db.find({ author: author }, (err: Error, docs: Array<ArticleMeta>) => {
        if (err) {
          reject(err)
        } else {
          resolve(docs)
        }
      })
    })
  }


  public findArticleById (id: string): Promise<ArticleMeta> {
    return new Promise((resolve, reject) => {
      this.db.findOne({ _id: id }, (err: Error, doc: ArticleMeta) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  }


  public updateArticle (id: string, article: ArticleMeta): Promise<{ numberOfUpdated: Number, upsert: boolean }> {
    return new Promise((resolve, reject) => {
      this.db.update({_id: id}, article, {}, (err: Error, numberOfUpdated: Number, upsert: boolean) => {
        if (err) {
          reject(err)
        } else {
          resolve({ numberOfUpdated, upsert })
        }
      })
    })
  }


  public deleteArticle (id: string): Promise<Number> {
    return new Promise((resolve, reject) => {
      this.db.remove({ _id: id }, {}, (err: Error, numRemoved: Number) => {
        if (err) {
          reject(err)
        } else {
          resolve(numRemoved)
        }
      })
    })
  }


}
