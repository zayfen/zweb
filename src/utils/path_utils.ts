import * as path from 'path'

/**
 * 获取相对于路径根路径的绝对路径
 * @param path 相对于项目根目录下的路径
 */
export function pathRelativeRoot (_path: string): string {
  let rootPath: string = path.resolve(__dirname, '../../') 
  return path.resolve(rootPath, _path)
}


export function fileName (_path: string): string {
  return path.basename(_path)
}

export function cutPath (fullPath: string, partialPath: string): string {
  let _path = fullPath.split(partialPath).join('')
  return _path.charAt(0) === '/' ? _path : '/' + _path
}