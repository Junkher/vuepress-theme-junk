import { groupMap } from '@temp/menu/group'
import { computed, ref } from 'vue'
import type { ComputedRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { GroupMap, MenuData } from '../../shared/index.js'
import { resolveRouteWithRedirect } from '../utils/resolveRouteWithRedirect.js'

export const groupMapRef = ref(groupMap)

export const useMenu = <
  T extends Record<string, unknown> = Record<string, unknown>
>(): ComputedRef<MenuData<T>> => {
  const router = useRouter()
  const route = useRoute()
  return computed(() => {
    const routes = router.getRoutes()
    const result: MenuData<T> = {
      map: {},
    }
    // const menuGroups = Object.entries(groupMapRef.value)
    const menuGroups = groupMapRef.value
    for (const group in menuGroups) {
      const menuGroup = menuGroups[group]
      // console.log(menuGroup.path)
      result.map[group] = {
        path: menuGroup.path,
        name: menuGroup.name,
        posts: [],
      }
      for (const pageKey of menuGroup.keys) {
        const pageRoute = routes.find(({ name }) => name === pageKey)
        if (pageRoute) {
          const finalRoute = resolveRouteWithRedirect(router, pageRoute.path)
          result.map[group].posts.push({
            path: finalRoute.path,
            info: <T>finalRoute.meta,
          })
        }
      }
      if (menuGroup.path === route.path) {
        result.currentPosts = result.map[group].posts
      }
    }
    return result
  })
}

if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot)) {
  __VUE_HMR_RUNTIME__.updateMenuGroup = (map: GroupMap): void => {
    groupMapRef.value = map
  }
}
