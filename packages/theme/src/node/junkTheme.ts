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
import { blogPlugin } from 'vuepress-plugin-blog2'
import type {
  JunkThemeLocaleOptions,
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
    // onInitialized(app) {
    //   if (app.options.bundler.name === '@vuepress/bundler-vite') {
    //     app.options.bundler = viteBundler({
    //       viteOptions: {
    //         css: {
    //           postcss: {
    //             plugins: [
    //               // tailwindcss({
    //               //   content: [
    //               //     './public/**/*.html',
    //               //     './src/components/**/*.{vue,js,ts}',
    //               //   ],
    //               //   corePlugins: {
    //               //     preflight: false,
    //               //   },
    //               // } as unknown as Config),
    //               autoprefixer({}),
    //             ],
    //           },
    //         },
    //       },
    //     })
    //   }
    // },

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

    extendsPage: (page: Page<Partial<JunkThemePageData>>) => {
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
      // @vuepress/plugin-toc
      themePlugins.toc !== false ? tocPlugin({}) : [],

      // @vuepress/plugin-active-header-link
      themePlugins.activeHeaderLinks !== false
        ? activeHeaderLinksPlugin({
            headerLinkSelector: 'a.vuepress-toc-link',
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
      blogPlugin({
        metaScope: '',
        filter: ({ frontmatter }): boolean => !frontmatter.draft,
        // getting article info
        getInfo: ({ frontmatter, data }) => ({
          title: data.title || '',
          author: frontmatter.author || '',
          date: frontmatter.date || null,
          category: frontmatter.category || [],
          tag: frontmatter.tag || [],
          description: frontmatter.description || '',
          cover: frontmatter.cover || '',
        }),

        category: [
          {
            key: 'category',
            getter: (page) => <string[]>page.frontmatter.category || [],
            path: '/home/',
            layout: 'Home',
            itemPath: '/home/:name',
            itemLayout: 'Home',
            frontmatter: () => ({ title: 'Home' }),
            itemFrontmatter: (name) => ({
              title: `${name}`,
              sideBar: false,
            }),
          },
        ],
      }),
    ],
    onInitialized: async (app): Promise<void> => {
      // if (app.options.bundler.name === '@vuepress/bundler-vite') {
      //   app.options.bundler = viteBundler({
      //     viteOptions: {
      //       css: {
      //         postcss: {
      //           plugins: [
      //             // tailwindcss({
      //             //   content: [
      //             //     './public/**/*.html',
      //             //     './src/components/**/*.{vue,js,ts}',
      //             //   ],
      //             //   corePlugins: {
      //             //     preflight: false,
      //             //   },
      //             // } as unknown as Config),
      //             autoprefixer({
      //               overrideBrowserslist: [
      //                 'Android 4.1',
      //                 'iOS 7.1',
      //                 'Chrome > 31',
      //                 'ff > 31',
      //                 'ie >= 8',
      //                 // 'last 2 versions', // 所有主流浏览器最近2个版本
      //               ],
      //             }),
      //           ],
      //         },
      //       },
      //     },
      //   })
      // }

      if (app.pages.every((page) => page.path !== '/')) {
        // create a homepage
        const homepage = await createPage(app, {
          path: '/',
          // set frontmatter
          frontmatter: {
            layout: 'Hero',
          },
          // set markdown content
          content: `\
              # Welcome to ${app.options.title}

              This is the default homepage
              `,
        })
        // add it to `app.pages`
        app.pages.push(homepage)
      }
    },
  }
}
