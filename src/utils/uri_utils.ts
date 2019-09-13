// 规范化url path, make // => /
export function normalizePath(path: string): string {
  if (path.indexOf('\/\/') === -1) {
    return path
  }

  return normalizePath(path.replace('\/\/', '\/'))
}
