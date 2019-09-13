// 简化代码，去掉注释 和 空格， 和回车
export function simplifyCode(code: string): string {

  // remove single line comments and blank lines
  code = removeSingleLineComments(code)

  // remove multi lines comments like /**/
  code = removeMultiLineComments(code)

  return code
}

function isSingleLineCommentOrBlankLine(line: string): boolean {
  let trimedLine = line.trim()
  return !trimedLine || trimedLine.startsWith('\/\/')
}


function removeSingleLineComments(code: string): string {
  // find //
  let lines = code.split('\n')
  let step = 0
  while (step < lines.length) {
    if (isSingleLineCommentOrBlankLine(lines[step])) {
      lines[step] = ''
    }

    step++
  }
  return lines.filter(line => line !== '').join('\n')
}


// remove comments link /**/
function removeMultiLineComments(code: string): string {
  // find /*

  let commentStart = '/*'
  let commentStartPos = code.indexOf(commentStart)
  if (commentStartPos === -1) {
    return code
  }

  let commentEnd = '*/'
  let commentEndPos = code.indexOf(commentEnd, commentStartPos + 1)
  if (commentEndPos === -1) {
    throw new Error('broken comments')
  }

  code = [code.slice(0, commentStartPos), code.slice(commentEndPos + commentEnd.length)].join('')
  return removeMultiLineComments(code)
}
