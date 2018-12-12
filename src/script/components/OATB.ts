import { Zero } from '../../zero'
import random from 'lodash-es/random'
import padStart from 'lodash-es/padStart'
import toSafeInteger from 'lodash-es/toSafeInteger'
import inRange from 'lodash-es/inRange'
import uniq from 'lodash-es/uniq'

const OATB = new class extends Zero {
  types = [sq.Type.Group]

  private map: { [groupid: number]: Record | undefined } = {}

  verify = () => true

  handle() {
    const { text, groupid, uin, uinName } = this.$event
    if (text === '1A2B') {
      if (this.map[groupid])
        this.$helper.targetedText('\n1A2B游戏已经开始\n快发送4位数字猜数吧', [uin, uinName])
      else {
        this.map[groupid] = new Record()
        this.$helper.targetedText('\n新一轮1A2B已经开始\n快发送4位数字猜数吧', [uin, uinName])
      }
    } else if (this.map[groupid] && text.length === 4 && inRange(Number(text), 0, 9999)) {
      const record = this.map[groupid] as Record
      const result = record.compare(text)
      if (result[1] === 'failure')
        this.$helper.targetedText(`\n${result[0]} 不符合游戏规则`, [uin, uinName])
      else if (result[1] === '4A0B') {
        this.$helper.targetedText(`\n您猜对了！\n答案是${result[0]}\n群员们一共猜了${record.count}次`, [uin, uinName])
        this.map[groupid] = undefined
      } else
        this.$helper.targetedText(`\n${result[0]}  ${result[1]}`, [uin, uinName])
    }
  }
}()

class Record {
  readonly value: string
  count: number = 0
  constructor() {
    const base = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    let v = ''
    for (let up = 9; up > 5; up--) {
      const index = random(up)
      v += base[index]
      base.splice(index, 1)
    }
    this.value = v
  }
  compare(text: string): [string, string] {
    let A = 0
    let B = 0
    const that = padStart(toSafeInteger(text).toString(), 4, '0')

    if (uniq(that).length !== 4) {
      return [that, `failure`]
    }
    for (let i = 0; i < 4; i++) {
      const c = that[i]
      if (that[i] === this.value[i])
        A++
      else if (this.value.indexOf(that[i]) !== -1)
        B++
    }
    this.count++
    return [that, `${A}A${B}B`]
  }
}

export default OATB
