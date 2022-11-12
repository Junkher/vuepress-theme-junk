import type { Page, Plugin } from '@vuepress/core'
import { logger } from '@vuepress/utils'
// import { getDirname, path } from '@vuepress/utils'
import type { MenuPluginOptions } from '../shared/index.js'
import { prepareGroup } from './group.js'

export const menuPlugin =
  (options: MenuPluginOptions = {}): Plugin =>
  (app) => {
    const {
      getPageInfo = (): Record<string, never> => ({}),
      filter = (page): boolean => Boolean(page.filePathRelative),
    } = options
    if (app.env.isDebug) {
      logger.info(`Options: ${JSON.stringify(options)}`)
    }
    return {
      name: 'vuepress-plugin-menu',

      onInitialized: async (app): Promise<void> => {
        await prepareGroup(app, options, true)
        if (app.env.isDebug) logger.info('Temp file generated')
      },

      extendsPage: (page: Page) => {
        //  adding extra properties to page route meta for menu's list
        if (filter(page)) {
          page.routeMeta = {
            ...page.routeMeta,
            ...getPageInfo(page),
          }
        }
      },
    }
  }
