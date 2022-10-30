import type { GitPluginPageData } from '@vuepress/plugin-git'
import type { NavLink, SidebarConfig } from './nav.js'

export interface JunkThemePageData extends GitPluginPageData {
  filePathRelative: string | null
}

export interface JunkThemePageFrontmatter {
  home?: boolean
  navbar?: boolean
  pageClass?: string
}

export interface JunkThemeHomePageFrontmatter extends JunkThemePageFrontmatter {
  home: true
  heroImage?: string
  heroImageDark?: string
  heroAlt?: string
  heroText?: string | null
  tagline?: string | null
  actions?: {
    text: string
    link: string
    type?: 'primary' | 'secondary'
  }[]
  features?: {
    title: string
    details: string
  }[]
  footer?: string
  footerHtml?: boolean
}

export interface JunkThemeNormalPageFrontmatter
  extends JunkThemePageFrontmatter {
  home?: false
  editLink?: boolean
  editLinkPattern?: string
  toc?: boolean
  cover?: string
  lastUpdated?: boolean
  contributors?: boolean
  sidebar?: 'auto' | false | SidebarConfig
  sidebarDepth?: number
  prev?: string | NavLink
  next?: string | NavLink
}
