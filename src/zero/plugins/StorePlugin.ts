import { Zero } from '..'
import ZeroPlugin from '../ZeroPlugin'

export const StorePlugin = new class implements ZeroPlugin {
  install(): void {
    Object.defineProperty(Zero.prototype, '$store', {
      get() {
        return Store.getInstance(this.$api)
      }
    })
  }
}()

declare module '../Zero' {
  export interface Zero {
    $store: Store
  }
}

class Store {

  static instance = new Store()
  static getInstance(api: sq.ApiEvent) {
    Store.instance.api = api
    return Store.instance
  }

  private api!: sq.Api

  private map: { [name: string]: any } = {}

  init(name?: string) {
    const load = (key: string) => {
      this.map[key] = JSON.parse(
        (api =>
          api.read(`${api.getRootPath()}/SQ/Zero/${key}.store`)
        )(this.api) || '{}'
      )
    }
    if (name) {
      load(name)
    } else {
      Object.keys(this.map).forEach(
        v => {
          load(v)
        }
      )
    }
  }

  update<T>(name: string, func?: (v: Partial<T>) => void) {
    if (func) {
      if (!this.map[name])
        this.init(name)
      func(this.map[name])
      this.updateFile(name)
    } else {
      this.map[name] = undefined
    }
  }

  use<T, K>(name: string, func: (v: Readonly<Partial<T>>) => K): K {
    if (!this.map[name])
      this.init(name)
    return func(this.map[name])
  }

  private updateFile(name: string) {
    (api => {
      api.write(`${api.getRootPath()}/SQ/Zero/${name}.store`, JSON.stringify(this.map[name]))
    })(this.api)
  }

}
