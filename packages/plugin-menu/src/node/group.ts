import type { App, Page } from '@vuepress/core'
import { createPage } from '@vuepress/core'
import { logger } from '@vuepress/utils'
import type { GroupMap, MenuPluginOptions } from '../shared/index.js'
import { removeLeadingSlash } from './utils/index.js'

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateMenuGroup)
    __VUE_HMR_RUNTIME__.updateMenuGroup(groupMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ groupMap }) => {
    __VUE_HMR_RUNTIME__.updateMenuGroup(groupMap);
  });
`

export const prepareGroup = async (
  app: App,
  options: Partial<MenuPluginOptions>,
  init = false
): Promise<string[]> => {
  const {
    groups = [],
    filter = (page): boolean => Boolean(page.filePathRelative),
    sorter = (): number => -1,
    path = '',
    layout = 'Layout',
    itemLayout = 'Layout',
  } = options
  const groupMap: GroupMap = {}
  const pageKeys: string[] = []
  const pageMapStore: Record<string, Page[]> = {}
  // sort groups by weight
  groups.sort((groupA, groupB) => {
    if (groupA.weight && groupB.weight) return groupA.weight - groupB.weight
    else if (groupA.weight) return -1
    else if (groupB.weight) return 1
    else return 0
  })
  // init the maps
  for (let { path, name } of groups) {
    // path with no slash as group key
    const group = removeLeadingSlash(path)
    // assign the group key to name, if name is not specified,
    name ??= group
    pageMapStore[group] = []
    groupMap[group] = {
      path,
      name,
      keys: [],
    }
  }
  // map pages and group
  app.pages.filter(filter).forEach((page) => {
    // get the second last segment of page path as group key
    const group = page.filePathRelative
      ? page.filePathRelative.split('/').at(-2)
      : null
    if (!group) return
    if (Object.keys(pageMapStore).includes(group)) {
      pageMapStore[group].push(page)
      pageKeys.push(page.key)
    }
  })

  // create page for menu
  const mainPath = path
  const mainPage = await createPage(app, {
    path,
    frontmatter: {
      title: 'Menu',
      layout,
    },
  })
  const index = app.pages.findIndex(({ path }) => path === mainPath)
  if (index === -1) app.pages.push(mainPage)
  else if (app.pages[index].key !== mainPage.key) {
    app.pages.splice(index, 1, mainPage)

    if (init) logger.warn(`Overriding existed path ${mainPath}`)
  }
  pageKeys.push(mainPage.key)

  for (const group in pageMapStore) {
    // sort pages by sorter
    groupMap[group].keys = pageMapStore[group]
      .sort(sorter)
      .map(({ key }) => key)
    // create page for menu groups
    const subPage = await createPage(app, {
      path: groupMap[group].path,
      frontmatter: {
        title: groupMap[group].name,
        layout: itemLayout,
      },
    })
    const index = app.pages.findIndex(
      ({ path }) => path === groupMap[group].path
    )
    if (index === -1) app.pages.push(subPage)
    else if (app.pages[index].key !== subPage.key) {
      app.pages.splice(index, 1, subPage)
      if (init) logger.warn(`Overriding existed path ${groupMap[group].path}`)
    }
    pageKeys.push(subPage.key)
  }
  await app.writeTemp(
    `menu/group.js`,
    `\
export const groupMap = ${JSON.stringify(groupMap)};
${app.env.isDev ? HMR_CODE : ''}
      `
  )

  if (app.env.isDebug) logger.info('All groups generated.')

  return pageKeys
}
