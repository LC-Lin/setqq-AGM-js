import { Zero } from '../../zero'

const InitialTips = new class extends Zero {
  types = [sq.Type.Load]
  handle() {
    this.$api.httpCall('PUT', `http://lty.lcmain.top/setqq/users/${this.$api.robot()}`, '', '')
    this.$api.logI('A-群管初始化成功')
  }
}()

export default InitialTips
