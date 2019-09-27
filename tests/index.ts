import * as path from 'path'
import { assert } from 'chai'
import 'mocha'

import { parseHexoMd } from '../src/utils/md_utils'

describe("parseHexoMd", function () {
  it('', function () {
    let result = parseHexoMd(path.resolve(__dirname, './data/hello-world.md'))
    console.log("result: ", result)
    assert.equal(result.title, 'Hello World')
    assert.equal(result.author, 'zayfen')
    assert.equal(result.tags.join(';'), 'test;tag2')
    assert.equal(result.archives.join(';'), '2019')
    assert.equal(result.categories.join(';'), 'web')
  })
})


