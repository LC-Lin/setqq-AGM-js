declare namespace sq {
  interface Api {
    logI(msg: string): void
    logW(msg: string): void
    logE(msg: string): void
    getRootPath(): string
    getLibPath(): string
    robot(): number
    save(path: string, key: string, value: string): void
    write(path: string, str: string): void
    load(path: string, key: string, defvalue: string): string
    read(path: string): string
    httpCall(method: string, url: string, body: string, head: string): string
  }
  interface Event {
    getType(): Type
    setType(type: Type): void
    clearMsg(): void
    add(type: string, str: string): void
    send(): ApiEvent
    getTextMsg(): string
    atCnt(): number
    at(index: number): string
    getGroupId(): number
    setGroupId(gid: number): void
    getUin(): number
    setUin(uin: number): void
    getCode(): number
    setCode(code: number): void
    getGroupName(): string
    getUinName(): string
    getTime(): number
    getValue(): number
    setValue(v: number): void
    getTitle(): string
    setTitle(title: string): void
  }
  interface ApiEvent extends Event, Api { }
  const enum Type {
    Group = 0,
    Buddy = 1,
    Discussion = 2,
    System = 3,
    Temp = 4,
    Like = 8,
    UpdateProfile = 9,
    MuteMember = 10,
    MuteGroup = 11,
    DeleteMember = 12,
    RequestToJoin = 13,
    Uninstall = 18,
    Load = 19
  }
  interface Client {
    id: string
    name: string
    author: string
    version: string
    ui: string
    info: string
    icon: string
    handleMessage(api: ApiEvent): void
    onAction?(api: ApiEvent): string | void
  }
}
