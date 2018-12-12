import toSafeInteger from 'lodash-es/toSafeInteger'

export default class Event {

  type: sq.Type

  text: string

  atCount: number

  at: string[]

  groupid: number

  uin: number

  code: number

  groupName: string

  uinName: string

  time: number

  value: number

  title: string

  constructor(event: sq.Event) {
    this.type = event.getType()
    this.text = event.getTextMsg()
    this.atCount = toSafeInteger(event.atCnt())
    this.at = new Array(this.atCount)
    for (let i = 0; i < this.at.length; i++) {
      this.at[i] = event.at(i)
    }
    this.groupid = toSafeInteger(event.getGroupId())
    this.uin = toSafeInteger(event.getUin())
    this.code = toSafeInteger(event.getCode())
    this.groupName = event.getGroupName()
    this.uinName = event.getUinName()
    this.time = toSafeInteger(event.getTime())
    this.value = toSafeInteger(event.getValue())
    this.title = event.getTitle()
  }
}
