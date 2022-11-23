import { inject, provide } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import type { MenuData } from 'vuepress-plugin-menu'
import { useMenu } from 'vuepress-plugin-menu/client'
import type { JunkThemePostInfo } from '../../shared/index.js'

export type GroupMapRef = ComputedRef<MenuData<JunkThemePostInfo>>

export const groupMapSymbol: InjectionKey<GroupMapRef> = Symbol.for('groupMap')

/**
 * Inject groupMap
 */
export const useGroupMap = (): GroupMapRef => {
  const groupMap = inject(groupMapSymbol)

  if (!groupMap) {
    throw new Error('useGroupMap() is called without provider.')
  }

  return groupMap
}

/**
 * Provide groupMap
 */
export const setupGroupMap = (): void => {
  const groupMap = useMenu<JunkThemePostInfo>()
  provide(groupMapSymbol, groupMap)
}
