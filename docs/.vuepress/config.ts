import process from 'node:process'
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { defineUserConfig } from '@vuepress/cli'
// import { docsearchPlugin } from '@vuepress/plugin-docsearch'
// import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
// import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
// import { shikiPlugin } from '@vuepress/plugin-shiki'
// import { getDirname, path } from '@vuepress/utils'
import { junkTheme } from 'vuepress-theme-junk'
import { head } from './configs/index.js'

// const __dirname = getDirname(import.meta.url)
const isProd = process.env.NODE_ENV === 'production'

export default defineUserConfig({
  // set site base to default value
  base: '/',

  // extra tags in `<head>`
  head,

  // site-level locales config
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Junklog',
      description: 'Just Junklog',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Junklog',
      description: '一些有的没的',
    },
  },

  // specify bundler via environment variable
  bundler:
    process.env.DOCS_BUNDLER === 'webpack' ? webpackBundler() : viteBundler(),

  pagePatterns: [
    'content/life/*.md',
    'content/poem/*.md',
    'content/tech/*.md',
    'index.md',
    '!.vuepress',
    '!node_modules',
  ],

  // configure default theme
  theme: junkTheme({
    logo: '/images/logo.png',
    repo: 'Junkher/vuepress-theme-junk',
    docsDir: 'docs',
    home: '/home/',
    heroContent: `
    I have no ambitions nor desires. <br />
    To be a poet is not my ambition, <br />
    it's simply my way to be alone.
     `,
    heroBtnText: 'FK ME',

    footer: '<p>© 2022-present Junklog - All right reserved</p>',

    personalInfo: {
      name: '雅佚',
      avatar: '/images/avatar.png',
      banner: '/images/banner.jpg',
      bio: 'Tritype-147. 没什么理想的理想主义者:) 不必訝異, 無須歡喜 ',
      sns: {
        github: 'https://github.com/Junkher',
        email: 'mailto:k1344065492@gmail.com',
        telegram: 'https://t.me/junkh_er',
      },
    },

    // theme-level locales config
    locales: {
      /**
       * English locale config
       *
       * As the default locale of @vuepress/theme-default is English,
       * we don't need to set all of the locale fields
       */
      '/': {
        // page meta
        editLinkText: 'Edit this page on GitHub',
      },

      /**
       * Chinese locale config
       */
      '/zh/': {
        // custom containers
        tip: '提示',
        warning: '注意',
        danger: '警告',
        // 404 page
        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个 404 页面',
          '看起来我们进入了错误的链接',
        ],
        // a11y
        openInNewWindow: '在新窗口打开',
        toggleColorMode: '切换颜色模式',
        toggleFullscreen: '切换全屏模式',
      },
    },

    themePlugins: {
      // only enable git plugin in production mode
      git: isProd,
      // use shiki plugin in production mode instead
      prismjs: !isProd,
      activeHeaderLinks: true,
      mediumZoom: true,
    },
  }),

  // configure markdown
  markdown: {
    // importCode: {
    //   handleImportPath: (str) =>
    //     str.replace(/^@vuepress/, path.resolve(__dirname, '../../ecosystem')),
    // },
    headers: {
      level: [1, 2, 3],
    },
    toc: {
      level: [1, 2],
    },
  },

  // use plugins
  plugins: [
    // docsearchPlugin({
    //   appId: '34YFD9IUQ2',
    //   apiKey: '9a9058b8655746634e01071411c366b8',
    //   indexName: 'vuepress',
    //   searchParameters: {
    //     facetFilters: ['tags:v2'],
    //   },
    //   locales: {
    //     '/zh/': {
    //       placeholder: '搜索文档',
    //       translations: {
    //         button: {
    //           buttonText: '搜索文档',
    //           buttonAriaLabel: '搜索文档',
    //         },
    //         modal: {
    //           searchBox: {
    //             resetButtonTitle: '清除查询条件',
    //             resetButtonAriaLabel: '清除查询条件',
    //             cancelButtonText: '取消',
    //             cancelButtonAriaLabel: '取消',
    //           },
    //           startScreen: {
    //             recentSearchesTitle: '搜索历史',
    //             noRecentSearchesText: '没有搜索历史',
    //             saveRecentSearchButtonTitle: '保存至搜索历史',
    //             removeRecentSearchButtonTitle: '从搜索历史中移除',
    //             favoriteSearchesTitle: '收藏',
    //             removeFavoriteSearchButtonTitle: '从收藏中移除',
    //           },
    //           errorScreen: {
    //             titleText: '无法获取结果',
    //             helpText: '你可能需要检查你的网络连接',
    //           },
    //           footer: {
    //             selectText: '选择',
    //             navigateText: '切换',
    //             closeText: '关闭',
    //             searchByText: '搜索提供者',
    //           },
    //           noResultsScreen: {
    //             noResultsText: '无法找到相关结果',
    //             suggestedQueryText: '你可以尝试查询',
    //             reportMissingResultsText: '你认为该查询应该有结果？',
    //             reportMissingResultsLinkText: '点击反馈',
    //           },
    //         },
    //       },
    //     },
    //   },
    // }),
    // googleAnalyticsPlugin({
    //   // we have multiple deployments, which would use different id
    //   id: process.env.DOCS_GA_ID ?? '',
    // }),
    // registerComponentsPlugin({
    //   componentsDir: path.resolve(__dirname, './components'),
    // }),
    // // only enable shiki plugin in production mode
    // isProd ? shikiPlugin({ theme: 'dark-plus' }) : [],
  ],
})
