import type { Post } from 'vuepress-plugin-menu'

export interface JunkThemePostInfo extends Record<string, unknown> {
  title: string
  date: string | null
  description: string | null
  cover: string | null
}

export type JunkThemePost = Post<JunkThemePostInfo>
