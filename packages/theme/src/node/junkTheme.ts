// import { viteBundler } from '@vuepress/bundler-vite'
import { createPage } from '@vuepress/core'
import type { Page, Theme } from '@vuepress/core'
import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links'
import { containerPlugin } from '@vuepress/plugin-container'
import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon'
import { gitPlugin } from '@vuepress/plugin-git'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'
import { palettePlugin } from '@vuepress/plugin-palette'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
import { themeDataPlugin } from '@vuepress/plugin-theme-data'
import { tocPlugin } from '@vuepress/plugin-toc'
import { fs, getDirname, path } from '@vuepress/utils'
// import autoprefixer from 'autoprefixer'
// import tailwindcss from 'tailwindcss'
import { menuPlugin } from 'vuepress-plugin-menu'
import type {
  JunkThemeLocaleOptions,
  JunkThemeNormalPageFrontmatter,
  JunkThemePageData,
  JunkThemePluginsOptions,
} from '../shared/index.js'
import {
  assignDefaultLocaleOptions,
  resolveContainerPluginOptions,
} from './utils/index.js'

const __dirname = getDirname(import.meta.url)

export interface JunkThemeOptions extends JunkThemeLocaleOptions {
  /**
   * To avoid confusion with the root `plugins` option,
   * we use `themePlugins`
   */
  themePlugins?: JunkThemePluginsOptions
}

export const junkTheme = ({
  themePlugins = {},
  ...localeOptions
}: JunkThemeOptions = {}): Theme => {
  assignDefaultLocaleOptions(localeOptions)

  return {
    name: 'vuepress-theme-junk',

    templateBuild: path.resolve(__dirname, '../../templates/build.html'),

    alias: {
      // use alias to make all components replaceable
      ...Object.fromEntries(
        fs
          .readdirSync(path.resolve(__dirname, '../client/components'))
          .filter((file) => file.endsWith('.vue'))
          .map((file) => [
            `@theme/${file}`,
            path.resolve(__dirname, '../client/components', file),
          ])
      ),
    },

    clientConfigFile: path.resolve(__dirname, '../client/config.js'),

    extendsBundlerOptions: (bundlerOptions, app) => {
      // if (app.options.bundler.name === '@vuepress/bundler-vite') {
      //   app.options.bundler = viteBundler({
      //     viteOptions: {
      //       css: {
      //         postcss: {
      //           plugins: [autoprefixer()],
      //         },
      //       },
      //     },
      //   })
      // }
    },

    extendsPage: (
      page: Page<
        Partial<JunkThemePageData>,
        Partial<JunkThemeNormalPageFrontmatter>
      >
    ) => {
      // save relative file path into page data to generate edit link
      page.data.filePathRelative = page.filePathRelative
      // save title into route meta to generate navbar and sidebar
      page.routeMeta.title = page.title
    },

    extendsMarkdownOptions: (markdownOptions, app) => {
      if (markdownOptions.headers === false) return
      markdownOptions.headers ??= {}
      if (markdownOptions.headers.level) return
      markdownOptions.headers.level = [1, 2, 3, 4]
    },

    plugins: [
      // vuepress-plugin-menu
      themePlugins.menu !== false
        ? menuPlugin({
            filter: (page): boolean =>
              Boolean(page.filePathRelative) && !page.frontmatter.draft,
            sorter: (pageA, pageB) =>
              new Date(pageB.frontmatter.date as Date).getTime() -
              new Date(pageA.frontmatter.date as Date).getTime(),
            getPageInfo: ({ frontmatter, data }) => ({
              title: data.title || '',
              date: frontmatter.date || null,
              tag: frontmatter.tag || [],
              description: frontmatter.description || '',
              cover: frontmatter.cover || '',
            }),
            path: '/home/',
            layout: 'Home',
            itemLayout: 'Home',
            groups: localeOptions.menuGroups,
          })
        : [],

      // @vuepress/plugin-toc
      themePlugins.toc !== false
        ? tocPlugin({
            defaultPropsOptions: {
              containerClass: 'toc',
              listClass: 'toc-list',
              itemClass: 'toc-item',
              linkTag: 'RouterLink',
              linkClass: 'toc-link',
              linkActiveClass: 'active',
              linkChildrenActiveClass: 'active',
            },
          })
        : [],

      // @vuepress/plugin-active-header-link
      themePlugins.activeHeaderLinks !== false
        ? activeHeaderLinksPlugin({
            headerLinkSelector: 'a.toc-link',
            headerAnchorSelector: '.header-anchor',
            // should greater than page transition duration
            delay: 300,
          })
        : [],

      // @vuepress/plugin-container
      themePlugins.container?.tip !== false
        ? containerPlugin(resolveContainerPluginOptions(localeOptions, 'tip'))
        : [],
      themePlugins.container?.warning !== false
        ? containerPlugin(
            resolveContainerPluginOptions(localeOptions, 'warning')
          )
        : [],
      themePlugins.container?.danger !== false
        ? containerPlugin(
            resolveContainerPluginOptions(localeOptions, 'danger')
          )
        : [],
      themePlugins.container?.details !== false
        ? containerPlugin({
            type: 'details',
            before: (info) =>
              `<details class="custom-container details">${
                info ? `<summary>${info}</summary>` : ''
              }\n`,
            after: () => '</details>\n',
          })
        : [],
      themePlugins.container?.codeGroup !== false
        ? containerPlugin({
            type: 'code-group',
            before: () => `<CodeGroup>\n`,
            after: () => '</CodeGroup>\n',
          })
        : [],
      themePlugins.container?.codeGroupItem !== false
        ? containerPlugin({
            type: 'code-group-item',
            before: (info) => `<CodeGroupItem title="${info}">\n`,
            after: () => '</CodeGroupItem>\n',
          })
        : [],

      // // @vuepress/plugin-external-link-icon
      themePlugins.externalLinkIcon !== false
        ? externalLinkIconPlugin({
            locales: Object.entries(localeOptions.locales || {}).reduce(
              (result, [key, value]) => {
                result[key] = {
                  openInNewWindow:
                    value.openInNewWindow ?? localeOptions.openInNewWindow,
                }
                return result
              },
              {}
            ),
          })
        : [],

      // @vuepress/plugin-git
      themePlugins.git !== false
        ? gitPlugin({
            createdTime: false,
            updatedTime: localeOptions.lastUpdated !== false,
            contributors: localeOptions.contributors !== false,
          })
        : [],

      // @vuepress/plugin-medium-zoom
      themePlugins.mediumZoom !== false
        ? mediumZoomPlugin({
            selector:
              '.theme-junk-content > img, .theme-junk-content :not(a) > img',
            zoomOptions: {},
            // should greater than page transition duration
            delay: 300,
          })
        : [],

      // @vuepress/plugin-nprogress
      themePlugins.nprogress !== false ? nprogressPlugin() : [],

      // @vuepress/plugin-palette
      palettePlugin({ preset: 'sass' }),

      // @vuepress/plugin-prismjs
      themePlugins.prismjs !== false ? prismjsPlugin() : [],

      // @vuepress/plugin-theme-data
      themeDataPlugin({ themeData: localeOptions }),

      // vuepress-plugin-blog2
    ],
    onInitialized: async (app): Promise<void> => {
      if (app.pages.every((page) => page.path !== '/')) {
        // create a heropage
        const heropage = await createPage(app, {
          path: '/',
          // set frontmatter
          frontmatter: {
            layout: 'Hero',
            title: 'Welcome:)',
          },
          // set markdown content
          content: `\
              # Welcome to ${app.options.title}

              This is the default heropage
              `,
        })
        // add it to `app.pages`
        app.pages.push(heropage)
      }
    },
  }
}
