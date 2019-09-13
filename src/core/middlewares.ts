import { listDirectoryFiles } from '../utils/fs_utils'
import * as path from 'path'

export const InternalMiddlewaresDir = path.resolve(__dirname, '../middlewares/internal')

// 内置的应用级中间件
export function internalMiddlewares(): string[] {
  let middlewaresTsFiels: string[] = listDirectoryFiles(InternalMiddlewaresDir, 1)
  let middlewares = middlewaresTsFiels.filter((_path: string) => _path.endsWith('.ts')) || []
  return middlewares
}
