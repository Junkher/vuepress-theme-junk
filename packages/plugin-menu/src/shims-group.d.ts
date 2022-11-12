declare module '@temp/menu/group' {
  interface GroupConfig {
    path: string
    name: string
    keys: string[]
  }

  type GroupMap = Record</** Group path */ string, GroupConfig>

  export const groupMap: GroupMap
}
