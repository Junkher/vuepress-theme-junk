import type { Page } from '@vuepress/core'

export interface Group {
  /**
   *  group pages by path, unique key
   */
  path: string
  /**
   *  name of group
   */
  name?: string
  /**
   *  weight of group
   */
  weight?: number
}

export interface MenuPluginOptions {
  /**
   * Path of menu mainPage
   *
   * @default "/menu"
   */
  path?: string
  /**
   * Layout of menu mainPage
   *
   * @default Layout
   */
  layout?: string
  /**
   * Layou of menu subPage
   *
   * @default Layout
   */
  itemLayout?: string
  /**
   * Menu groups of pages
   *
   * @example [{
   *    path: '/poem/',
   *    name: 'POEM',
   *    weight: 1,
   *  },
   *  {
   *    path: '/life/',
   *    name: 'LIFE',
   *    weight: 2,
   *  }]
   *
   */
  groups?: Group[]
  /**
   * Function used to get page info to be attached to route record.
   *
   * 获取文章信息的函数。
   */
  getPageInfo?: <
    ExtraPageData extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >,
    ExtraPageFrontmatter extends Record<
      string | number | symbol,
      unknown
    > = Record<string, unknown>,
    ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >
  >(
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>
  ) => Record<string, unknown>

  /**
   * Function used to determine whether a page should be included.
   *
   * 页面过滤器。
   *
   * @default (page): boolean => Boolean(page.filePathRelative)
   */
  filter?: <
    ExtraPageData extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >,
    ExtraPageFrontmatter extends Record<
      string | number | symbol,
      unknown
    > = Record<string, unknown>,
    ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >
  >(
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>
  ) => boolean

  /**
   * Function used to determine the order of the pages
   *
   * 页面排序器
   */
  sorter?: <
    ExtraPageData extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >,
    ExtraPageFrontmatter extends Record<
      string | number | symbol,
      unknown
    > = Record<string, unknown>,
    ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >
  >(
    pageA: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
    pageB: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>
  ) => number
}
