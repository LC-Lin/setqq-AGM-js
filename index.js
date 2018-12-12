Script = {
  id: "saki_java_script_demo",
  name: "Demo",
  version: "1.0.0",
  author: "Saki",
  info: "This is Demo",
  ui: "",
  icon: "",
  // handleMessage: function (api) {
  //   let type = api.getType()
  //   if (type === 19) {
  //     // 加载库

  //     // 加载库结束

  //     var Zero = zero.Zero

  //     var a = {
  //       types: [19],
  //       handle() {
  //         this.$api.logI('初始化成功')
  //       }
  //     }

  //     var b = {
  //       types: [0],
  //       verify() {
  //         this.$api.logI(`verifying ${this.$event.text}`)
  //         return true
  //       },
  //       handle() {
  //         let { groupName, uinName, text } = this.$event
  //         this.$api.logI(`handle: ${groupName}-${uinName}-${text}`)
  //         this.$helper.sendText(`接受到消息: ${uinName}-${text}`)
  //       }
  //     }

  //     var top = Zero.of({
  //       components: [a, b]
  //     })
  //   }
  //   Zero.handleMessage(top, api)



  // },
  handleMessage(api) {
    let type = api.getType()
    if (type === 19) {
      api.logI('初始化成功')
    }
  },
  onAction: function (api) {
    return api.getTextMsg();
  }
}
