import type {
  JunkThemeLocaleData,
  JunkThemeLocaleOptions,
} from '../../shared/index.js'

export const DEFAULT_LOCALE_OPTIONS: JunkThemeLocaleOptions = {
  // color mode
  colorMode: 'auto',
  colorModeSwitch: true,

  // hero
  heroBtnText: 'GET STARTED',

  // navbar
  navbar: [],
  logo: null,
  repo: null,
  selectLanguageText: 'Languages',
  selectLanguageAriaLabel: 'Select language',

  // sidebar
  sidebar: 'auto',
  sidebarDepth: 2,

  // page meta
  editLink: true,
  editLinkText: 'Edit this page',
  lastUpdated: true,
  lastUpdatedText: 'Last Updated',
  contributors: true,
  contributorsText: 'Contributors',

  // 404 page messages
  notFound: [
    `There's nothing here.`,
    `How did we get here?`,
    `That's a Four-Oh-Four.`,
    `Looks like we've got some broken links.`,
  ],
  backToHome: 'Take me home',

  // a11y
  openInNewWindow: 'open in new window',
  toggleColorMode: 'toggle color mode',
  toggleFullscreen: 'toggle fullscreen',
}

export const DEFAULT_LOCALE_DATA: JunkThemeLocaleData = {
  // navbar
  selectLanguageName: 'English',
}

/**
 * Assign default options
 */
export const assignDefaultLocaleOptions = (
  localeOptions: JunkThemeLocaleOptions
): void => {
  if (!localeOptions.locales) {
    localeOptions.locales = {}
  }

  if (!localeOptions.locales['/']) {
    localeOptions.locales['/'] = {}
  }

  Object.assign(localeOptions, {
    ...DEFAULT_LOCALE_OPTIONS,
    ...localeOptions,
  })

  Object.assign(localeOptions.locales['/'], {
    ...DEFAULT_LOCALE_DATA,
    ...localeOptions.locales['/'],
  })
}
