import { Zero } from '../../zero'
import { GroupManagerPlugin } from '../plugins/GroupManagerPlugin'
import toSafeInteger from 'lodash-es/toSafeInteger'
import truncate from 'lodash-es/truncate'

Zero.use(GroupManagerPlugin)

const 开启全体禁言 = new class extends Zero {
  verify = '开启全体禁言'
  handle() {
    const { uin, uinName } = this.$event
    this.$gm.withPermission(
      () => {
        this.$helper.muteGroup(true)
        this.$helper.targetedText('\n已开启全体禁言', [uin, uinName])
      }, uin)
  }
}()

const 关闭全体禁言 = new class extends Zero {
  verify = '关闭全体禁言'
  handle() {
    const { uin, uinName } = this.$event
    this.$gm.withPermission(
      () => {
        this.$helper.muteGroup(false)
        this.$helper.targetedText('\n已关闭全体禁言', [uin, uinName])
      }, uin)
  }
}()

const 禁言 = new class extends Zero {
  verify = () => {
    const { atCount, text } = this.$event
    return atCount !== 0 && text.startsWith('禁言')
  }
  handle() {
    const { uin, text, at } = this.$event
    const split = text.split(/\s/)
    const time = split.length >= 2 ? 60 * 10 : toSafeInteger(split[1])
    at.forEach(e => {
      const es = e.split('@')
      const uinTarget = toSafeInteger(es[0])
      this.$gm.withPermission(
        () => {
          this.$helper.muteMember(uinTarget, time)
        }, uin, uinTarget)
    })
  }
}()

const 解除禁言 = new class extends Zero {
  verify = () => {
    const { atCount, text } = this.$event
    return atCount !== 0 && text.startsWith('解除禁言')
  }
  handle() {
    const { uin, at } = this.$event
    at.forEach(e => {
      const es = e.split('@')
      const uinTarget = toSafeInteger(es[0])
      this.$gm.withPermission(
        () => {
          this.$helper.muteMember(uinTarget, 0)
        }, uin, uinTarget)
    })
  }
}()

const 添加小主人 = new class extends Zero {
  verify = () => {
    const { atCount, text } = this.$event
    return atCount !== 0 && text.startsWith('添加小主人')
  }
  handle() {
    const { uin, at } = this.$event
    at.forEach(e => {
      const es = e.split('@')
      const uinTarget = toSafeInteger(es[0])
      this.$gm.withPermission(
        () => {
          this.$gm.addLowManager(uinTarget)
        }, uin, uinTarget)
      this.$helper.targetedText(`\n🎉你已成为本群小主人🎉`, [uinTarget, es[1]])
    })
  }
}()

const 移除小主人 = new class extends Zero {
  verify = () => {
    const { atCount, text } = this.$event
    return atCount !== 0 && text.startsWith('移除小主人')
  }
  handle() {
    const { uin, at } = this.$event
    at.forEach(e => {
      const es = e.split('@')
      const uinTarget = toSafeInteger(es[0])
      this.$gm.withPermission(
        () => {
          this.$gm.removeLowManager(uinTarget)
        }, uin, uinTarget)
      this.$helper.targetedText(`\n😔你被取消小主人资格😔`, [uinTarget, es[1]])
    })
  }
}()

const 踢人 = new class extends Zero {
  verify = () => {
    const { atCount, text } = this.$event
    return atCount !== 0 && text.startsWith('踢人')
  }
  handle() {
    const { uin, at, uinName } = this.$event
    at.forEach(e => {
      const es = e.split('@')
      const uinTarget = toSafeInteger(es[0])
      this.$gm.withPermission(
        () => {
          this.$helper.deleteMember(uinTarget)
        }, uin, uinTarget)
      this.$helper.targetedText(`\n[${truncate(es[1], { length: 8 })}]\n⚠️已经被踢出本群⚠️`, [uin, uinName])
    })
  }
}()

const 检测权限 = new class extends Zero {
  verify = /检测权限/
  handle() {
    const h = (u: number, n?: string) => {
      const { uinName } = this.$event
      if (this.$gm.isHighManager(u))
        this.$helper.targetedText(`\n[${n ? n : '您'}]\n是大主人\n有权限`, [uin, uinName])
      else if (this.$gm.isLowManager(u))
        this.$helper.targetedText(`\n[${n ? n : '您'}]\n是小主人\n有权限`, [uin, uinName])
      else
        this.$helper.targetedText(`\n[${n ? n : '您'}]\n没有权限`, [uin, uinName])
    }
    const { uin, at, atCount } = this.$event
    if (atCount !== 0)
      at.forEach(e => {
        const es = e.split('@')
        const uinTarget = toSafeInteger(es[0])
        h(uinTarget, truncate(es[1], { length: 8 }))
      })
    else
      h(uin)
  }
}()

const GroupManager = new class extends Zero {
  types = [sq.Type.Group]
  components = [禁言, 解除禁言, 添加小主人, 移除小主人, 开启全体禁言, 关闭全体禁言, 踢人, 检测权限]
}()

export default GroupManager
