const fs = require('fs')
const path = require('path')

class Api {
  constructor() {
    this.type = 0
    this.text = '测试消息'
    this.groupid = 999999
    this.uin = 111111
    this.code = 0
    this.uinName = 'somebody'
    this.uinGroupName = 'some group'
    this.value = 0

    this.getType = () => this.type
    this.setType = (t) => this.type = t
    this.getTextMsg = () => this.text
    this.getGroupId = () => this.groupid
    this.setGroupId = (t) => this.groupid = t
    this.getUin = () => this.uin
    this.setUin = (t) => this.uin = t
    this.getCode = () => this.code
    this.getUinName = () => this.uinName
    this.getGroupName = () => this.uinGroupName
    this.atCnt = () => 1
    this.at = () => '123789@somebody'
    this.getTime = () => new Date().getTime()
    this.getValue = () => this.value
    this.setValue = (t) => this.value = t
    this.getTitle = () => 'title'

    this.logI = console.log
    this.logE = console.log

  }

  clearMsg() {
    console.log('clearMsg')
  }

  add(t, s) {
    console.log(`add ${t}: ${s}`)
  }

  send() {
    console.log('send')
  }

  getRootPath() {
    return __dirname
  }

  read(p) {
    return fs.existsSync(p) ? fs.readFileSync(p).toString('utf-8') : ''
  }

  write(p, str) {
    fs.exists(p,
      v => {
        if (!v) {
          fs.mkdir(path.resolve(p, '..'))
        }
      }
    )
    fs.writeFileSync(p, str, { encoding: 'utf-8' })
  }
}

module.exports = Api
