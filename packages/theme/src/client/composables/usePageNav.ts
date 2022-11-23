import { usePageData } from '@vuepress/client'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useGroupMap } from './useGroupMap.js'

export const usePageNav = () => {
  const groupMap = useGroupMap()
  const page = usePageData()
  const route = useRoute()
  // resolve currentGroup from page path
  const currentGroup = page.value.path.split('/').at(-2)!
  // console.log(page.value.path)
  // console.log(route.path)
  // onUpdated(() => {
  //   console.log('onUpdated', route.path)
  // })
  const posts = groupMap.value.map[currentGroup].posts
  // use computed to watch updating of route
  const currentIndex = computed(() =>
    posts.findIndex((item) => item.path === route.path)
  )
  const prevPost = computed(() =>
    currentIndex.value > 0 ? posts[currentIndex.value - 1] : null
  )
  const nextPost = computed(() =>
    currentIndex.value < posts.length - 1 ? posts[currentIndex.value + 1] : null
  )
  return { prevPost, nextPost }
}
