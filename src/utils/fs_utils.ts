import * as fs from 'fs'
import * as readline from 'readline'
import { pathToFileURL } from 'url'

// transform path to absolutepath
export function absolutePath(path: string): string {
  return fs.realpathSync(path)
}


export function readLines(path: string) {

  return new Promise((resolve, reject) => {
    let rl = readline.createInterface({
      input: fs.createReadStream(path),
      output: null // process.stdout,
    })

    let lines: string[] = []

    rl.on('line', (line: string) => lines.push(line))

    rl.on('close', () => resolve(lines))
  })
}


export function existed (path: string): boolean {
  return fs.existsSync(path)
}


/*
  * read ts file
*/
export function readFile(tsFile: string): string {
  console.log("readFile: " + tsFile)
  tsFile = absolutePath(tsFile)

  if (!fs.existsSync(tsFile)) {
    throw new Error('File not found!: ' + tsFile)
  }

  const content = fs.readFileSync(tsFile, { encoding: 'utf8' })
  return content
}



export function isDirectory(path: string): boolean {
  if (!fs.existsSync(path)) {
    throw new Error(__filename + " isDirectory: path not existed: " + path)
  }
  let stat = fs.statSync(path)
  return stat.isDirectory()
}

/*
  list fiels of directory
*/
export function listDirectoryFiles(dir: string, level: number = -1): Array<string> {
  if (!fs.existsSync(dir)) {
    throw new Error(__filename + " listDirectoryFiles: Directory not existed: " + dir)
  }

  // 限制查询的层级
  if (level > -1 && level === 0) {
    return isDirectory(dir) ? [] : [dir]
  }

  if (!isDirectory(dir)) {
    return [dir]
  }

  let paths: string[] = fs.readdirSync(dir).map(f => [dir, f].join('/'))
  let files: string[] = []
  for (let i = 0; i < paths.length; i++) {
    if (isDirectory(paths[i])) {
      files = files.concat(listDirectoryFiles(paths[i], level - 1))
      continue
    }
    files.push(paths[i])
  }

  return files
}

function formatDate(d: Date) {
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  let year = d.getFullYear()

  if (month.length < 2) 
      month = '0' + month
  if (day.length < 2) 
      day = '0' + day

  return [year, month, day].join('/')
}

export function fileModifyDate (path: string): string {
  let date: string = ''
  let stat = fs.statSync(path)
  date = formatDate(stat.mtime)
  return date
}