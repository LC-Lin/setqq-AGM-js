let script = require('../dist/script/script')
let assert = require('assert')
let Api = require('./api')

describe('script', () => {
  it('初始化', () => {
    let load = new Api()
    load.type = 19
    script.handleMessage(load)
  })
  it('添加小主人指令', () => {
    let api = new Api()
    api.type = 0
    api.text = '添加小主人'
    script.handleMessage(api)
  })
  it('1A2B', () => {
    let api = new Api()
    api.type = 0
    api.text = '1A2B'
    script.handleMessage(api)
    api.text = '1111'
    script.handleMessage(api)
    api.text = '1234'
    script.handleMessage(api)
  })
})
