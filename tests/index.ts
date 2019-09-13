import * as fs from 'fs'
import * as path from 'path'

import { resolveRoutes } from '../src/core/router_resolver'

import { listDirectoryFiles } from '../src/utils/fs_utils'


// let routes = resolveRoutes(path.resolve(__dirname, '../src/controllers/index/index.ts'))
// console.log("routes: ", routes)
console.log(listDirectoryFiles(path.resolve(__dirname, '../src/controller')))
