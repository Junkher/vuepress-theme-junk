export interface GroupConfig {
  path: string
  name: string
  keys: string[]
}

export type GroupMap = Record</** Group path */ string, GroupConfig>
