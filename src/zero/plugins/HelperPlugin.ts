import { Zero } from '..'
import Event from '../Event'
import ZeroPlugin from '../ZeroPlugin'
import flatten from 'lodash-es/flatten'
import chunk from 'lodash-es/chunk'

export const HelperPlugin = new class implements ZeroPlugin {
  install(): void {
    Object.defineProperty(Zero.prototype, '$helper', {
      get() {
        return new ApiHelper(this)
      }
    })
  }
}()

declare module '../Zero' {
  export interface Zero {
    $helper: ApiHelper
  }
}

type At = [number, string]

class ApiHelper {
  constructor(private m: Zero) { }

  deleteMember(uin: number) {
    this.useM((m, e) => {
      m.setType(sq.Type.DeleteMember)
      m.setGroupId(e.groupid)
      m.setUin(uin)
    })
  }

  sendText(text: string, type?: sq.Type, uin?: number) {
    this.useM((m, e) => {
      type = type || sq.Type.Group
      m.setType(type)
      m.setGroupId(e.groupid)
      if (uin)
        m.setUin(uin)
      m.add('msg', text)
    })
  }

  targetedText(text: string, target: At | At[]) {
    this.useM((m, e) => {
      m.setType(sq.Type.Group)
      m.setGroupId(e.groupid)
      const t = chunk(flatten(target), 2)
      t.forEach(v => m.add('at', v.join('@') + ' '))
      m.add('msg', text)
    })
  }

  sendXML(xml: string, type?: sq.Type, uin?: number) {
    this.useM((m, e) => {
      type = type || sq.Type.Group
      m.setType(type)
      m.setGroupId(e.groupid)
      if (uin)
        m.setUin(uin)
      m.add('xml', xml)
    })
  }

  sendJSON(json: string, type?: sq.Type, uin?: number) {
    this.useM((m, e) => {
      type = type || sq.Type.Group
      m.setType(type)
      m.setGroupId(e.groupid)
      if (uin)
        m.setUin(uin)
      m.add('json', json)
    })
  }

  sendImg(url: string, type?: sq.Type, uin?: number) {
    this.useM((m, e) => {
      type = type || sq.Type.Group
      m.setType(type)
      m.setGroupId(e.groupid)
      if (uin)
        m.setUin(uin)
      m.add('img', url)
    })
  }

  sendPtt(url: string, type?: sq.Type, uin?: number) {
    this.useM((m, e) => {
      type = type || sq.Type.Group
      m.setType(type)
      m.setGroupId(e.groupid)
      if (uin)
        m.setUin(uin)
      m.add('ptt', url)
    })
  }

  like(uin?: number) {
    this.useM((m, e) => {
      uin = uin || e.uin
      m.setType(sq.Type.Like)
      m.setUin(uin)
    })
  }

  updateProfile(uin: number, profile: string) {
    this.useM((m, e) => {
      m.setType(sq.Type.UpdateProfile)
      m.setGroupId(e.groupid)
      m.setUin(uin)
      m.setTitle(profile)
    })
  }

  muteMember(uin: number, seconds: number) {
    this.useM((m, e) => {
      m.setType(sq.Type.MuteMember)
      m.setGroupId(e.groupid)
      m.setUin(uin)
      m.setValue(seconds)
    })
  }

  muteGroup(on: boolean) {
    this.useM((m, e) => {
      m.setType(sq.Type.MuteGroup)
      m.setGroupId(e.groupid)
      m.setValue(on ? 0 : 1)
    })
  }

  private useM(func: (api: sq.ApiEvent, event: Event) => void) {
    this.m.$api.clearMsg()
    func(this.m.$api, this.m.$event)
    this.m.$api.send()
  }
}
