import type { Article } from 'vuepress-plugin-blog2'

export interface JunkThemePostInfo extends Record<string, unknown> {
  title: string
  date: string | null
  description: string | null
  cover: string | null
}

export type JunkThemePost = Article<JunkThemePostInfo>
