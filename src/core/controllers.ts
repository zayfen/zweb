import { listDirectoryFiles } from '../utils/fs_utils'
import * as path from 'path'

export const ControllersDir = path.resolve(__dirname, '../controllers')

export function controllersFiles(): string[] {
  let controllerTsFiels: string[] = listDirectoryFiles(ControllersDir, 2)
  let controllers = controllerTsFiels.filter((_path: string) => _path.endsWith('.ts')) || []
  return controllers
}
