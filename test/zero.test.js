let zero = require('../dist/zerolib/zero')
let Api = require('./api')

let Zero = zero.Zero

let a = {
  types: [19],
  handle() {
    this.$api.logI('群管初始化成功')
  }
}

let b = {
  types: [0],
  verify() {
    this.$api.logI(`verifying ${this.$event.text}`)
    return true
  },
  handle() {
    let { groupName, uinName, text } = this.$event
    this.$api.logI(`handle: ${groupName}-${uinName}-${text}`)
  }
}

let top = Zero.of({
  components: [a, b]
})

describe('zerolib', () => {
  it('导出项', () => {
    console.log(zero)
  })
  it('Zero处理消息', () => {
    Zero.handleMessage(top, new Api())
  })
  it('helper插件', () => {
    let load = new Api()
    load.type = 19
    Zero.use(zero.plugins.HelperPlugin)
    Zero.handleMessage(Zero.of({
      handle() {
        this.$helper.sendText('接收到消息了')
      }
    }), load)
  })
  it('艾特', () => {
    let load = new Api()
    load.type = 0
    Zero.use(zero.plugins.HelperPlugin)
    Zero.handleMessage(Zero.of({
      handle() {
        this.$helper.targetedText('接收到消息了', [123456, 'somebody'])
      }
    }), load)
  })
  it('Store插件', () => {
    let load = new Api()
    load.type = 0
    Zero.use(zero.plugins.StorePlugin)
    Zero.handleMessage(Zero.of({
      handle() {
        this.$store.use('demo',
          v => {
            console.log(v)
          })
      }
    }), load)
  })
})
