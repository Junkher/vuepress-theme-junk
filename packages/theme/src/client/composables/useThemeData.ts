import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
} from '@vuepress/plugin-theme-data/client'
import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
} from '@vuepress/plugin-theme-data/client'
import type { JunkThemeData } from '../../shared/index.js'

export const useThemeData = (): ThemeDataRef<JunkThemeData> =>
  _useThemeData<JunkThemeData>()
export const useThemeLocaleData = (): ThemeLocaleDataRef<JunkThemeData> =>
  _useThemeLocaleData<JunkThemeData>()
