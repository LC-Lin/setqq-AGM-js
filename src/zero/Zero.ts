import Event from './Event'
import ZeroPlugin from './ZeroPlugin'
import result from 'lodash-es/result'
import assign from 'lodash-es/assign'
import indexOf from 'lodash-es/indexOf'

export class Zero {

  static installed: ZeroPlugin[] = []

  static use(plugin: ZeroPlugin, options?: any) {
    if (indexOf(this.installed, plugin) === -1) {
      plugin.install(options)
      this.installed.push(plugin)
    }
  }

  static of(obj: any): Zero {
    if (obj.components) {
      obj.components = (obj.components as any[]).map<Zero>(e => e instanceof Zero ? e : Zero.of(e))
    }
    return assign(new Zero(), obj)
  }

  static handleMessage(top: Zero, api: sq.ApiEvent) {
    if (!(top instanceof Zero)) {
      api.logE('at Zero.handleMessage(top, api): the top must be created by Zero.of(obj)')
      return
    }

    const event = new Event(api)

    const queue: Zero[] = [top]
    while (queue.length) {
      const item = queue.shift()
      if (!item) {
        continue
      }

      item.$api = api
      item.$event = event
      if (item.typeMatched() && item.verify_()) {
        item.handle()
        if (item.components) {
          queue.splice(queue.length - 1, 0, ...item.components)
        }
      }
    }
  }

  $api!: sq.ApiEvent
  $event!: Event

  protected types?: sq.Type[] | (() => sq.Type[])

  protected verify?: string | RegExp | (() => boolean)

  protected components?: Zero[]

  // tslint:disable-next-line:no-empty
  protected handle() { }

  private typeMatched(): boolean {
    const r = result(this, 'types') as (sq.Type[] | undefined)
    return !r || r.some(
      (t => t === this.$event.type)
    )
  }

  private verify_(): boolean {
    return Boolean(!this.verify ||
      typeof this.verify === 'string' && this.$event.text === this.verify ||
      this.verify instanceof RegExp && this.$event.text.match(this.verify) ||
      this.verify instanceof Function && this.verify()
    )
  }
}
