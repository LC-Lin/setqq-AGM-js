import { Zero, plugins } from './zero'
import toSafeInteger from 'lodash-es/toSafeInteger'
import random from 'lodash-es/random'
import './zero/plugins/HelperPlugin'
import './zero/plugins/StorePlugin'
import { GroupManagerPlugin } from './script/plugins/GroupManagerPlugin'

import 群管 from './script/components/GroupManager'
import 初始化提示 from './script/components/InitialTips'
import OATB from './script/components/OATB'

Zero.use(plugins.HelperPlugin)
Zero.use(plugins.StorePlugin)
Zero.use(GroupManagerPlugin)

const 现实君 = new class extends Zero {
  types = [sq.Type.Group]
  verify = '一言'
  handle() {
    const { uin, uinName } = this.$event
    const yiyan = this.$api.httpCall(
      'GET',
      random(1) ? 'https://api.uixsj.cn/hitokoto/w.php' : 'https://api.uixsj.cn/hitokoto/en.php',
      '', ''
    )
    this.$helper.targetedText(`\n${yiyan}`, [uin, uinName])
  }
}()

const top = new class extends Zero {
  components = [初始化提示, 群管, 现实君, OATB]
}()

class Client implements sq.Client {
  id = 'lc.script.gm'
  name = 'A-群管'
  author = 'LC'
  version = '1.6.1'
  ui = 'app.html'
  info = '点击可以打开插件界面'
  icon = ''
  handleMessage(event: sq.ApiEvent) {
    Zero.handleMessage(top, event)
    if (event.getType() === sq.Type.Load)
      top.$store.init()
  }
  onAction(api: sq.ApiEvent): string {
    top.$api = api
    let remsg = ''
    const text = api.getTextMsg()
    if (text === 'gm')
      remsg = JSON.stringify(top.$store.use('gm', v => v) || { lm: [], hm: [] })
    else if (text.startsWith('removehm: '))
      top.$gm.removeHighManager(toSafeInteger(text.substring(10)))
    else if (text.startsWith('removelm: '))
      top.$gm.removeLowManager(toSafeInteger(text.substring(10)))
    else if (text.startsWith('addhm: '))
      top.$gm.addHighManager(toSafeInteger(text.substring(7)))
    else if (text.startsWith('addlm: '))
      top.$gm.addLowManager(toSafeInteger(text.substring(7)))
    return remsg
  }
}

export const { id, name, author, version, ui, info, icon, handleMessage, onAction } = new Client()
