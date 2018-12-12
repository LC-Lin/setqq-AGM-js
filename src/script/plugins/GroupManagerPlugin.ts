import { Zero } from '../../zero'
import ZeroPlugin from '../../zero/ZeroPlugin'
import indexOf from 'lodash-es/indexOf'
import pull from 'lodash-es/pull'

export const GroupManagerPlugin = new class implements ZeroPlugin {
  install(): void {
    if (Zero.prototype.$store) {
      Zero.prototype.$store.update(STORE_NAME)
    }
    Object.defineProperty(Zero.prototype, '$gm', {
      get() {
        return new GroupManager(this)
      }
    })
  }
}()

declare module '../../zero/Zero' {
  export interface Zero {
    $gm: GroupManager
  }
}

const STORE_NAME = 'gm'

interface Model {
  lm: number[]
  hm: number[]
}

class GroupManager {

  constructor(private zero: Zero) { }

  withPermission(func: () => void, a: number, b?: number) {
    const permissionDenied = () => {
      const { uin, uinName } = this.zero.$event
      this.zero.$helper.targetedText('\n抱歉，您没有权限', [uin, uinName])
    }
    if (b) {
      const map = (v: number) => this.isHighManager(v) ? 2 : this.isLowManager(v) ? 1 : 0
      if (map(a) > map(b)) {
        func()
      } else
        permissionDenied()
    } else {
      if (this.isManager(a)) {
        func()
      } else
        permissionDenied()
    }
  }

  isManager(uin: number) {
    return this.isHighManager(uin) || this.isLowManager(uin)
  }

  isLowManager(uin: number) {
    return this.zero.$store.use<Model, boolean>(STORE_NAME,
      v => indexOf(v.lm, uin) !== -1
    )
  }

  addLowManager(uin: number) {
    this.zero.$store.update<Model>(STORE_NAME,
      v => {
        if (v.lm) {
          if (indexOf(v.lm, uin) === -1)
            v.lm.push(uin)
        } else {
          v.lm = [uin]
        }
      }
    )
  }

  removeLowManager(uin: number) {
    this.zero.$store.update<Model>(STORE_NAME,
      v => {
        if (v.lm)
          pull(v.lm, uin)
      }
    )
  }

  isHighManager(uin: number) {
    return uin === 851474174 || this.zero.$store.use<Model, boolean>(STORE_NAME,
      v => indexOf(v.hm, uin) !== -1
    )
  }

  addHighManager(uin: number) {
    this.zero.$store.update<Model>(STORE_NAME,
      v => {
        if (v.hm) {
          if (indexOf(v.hm, uin) === -1)
            v.hm.push(uin)
        } else {
          v.hm = [uin]
        }
      }
    )
  }

  removeHighManager(uin: number) {
    this.zero.$store.update<Model>(STORE_NAME,
      v => {
        if (v.hm)
          pull(v.hm, uin)
      }
    )
  }
}
