<script setup lang="ts">
import Common from '@theme/Common.vue'
import Page from '@theme/Page.vue'
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import { useScroll } from '@vueuse/core'
import { computed, onMounted, provide, reactive, watchEffect } from 'vue'
import type {
  JunkThemeNormalPageFrontmatter,
  Scroll,
} from '../../shared/index.js'

const page = usePageData()
const frontmatter = usePageFrontmatter<JunkThemeNormalPageFrontmatter>()

// toc
const shouldShowToc = computed(() => frontmatter.value.toc)
const pageTopHeight = 340

// get scroll ref, provide to reuse
const scroll = reactive<Scroll>({
  y: 0,
  arrivedState: {
    left: false,
    right: false,
    top: true,
    bottom: false,
  },
})
onMounted(() => {
  const { y, arrivedState } = useScroll(document)
  watchEffect(() => {
    scroll.y = y.value
    scroll.arrivedState = arrivedState
  })
})
provide<Scroll>('scroll', scroll)

// classes
const containerClass = computed(() => [frontmatter.value.pageClass])
</script>

<template>
  <Common>
    <div class="theme-container" :class="containerClass">
      <slot name="page">
        <Page :key="page.path">
          <template #top>
            <slot name="page-top" />
          </template>
          <template #content-top>
            <slot name="page-content-top" />
          </template>
          <template #content-bottom>
            <slot name="page-content-bottom" />
          </template>
          <template #bottom>
            <slot name="page-bottom" />
          </template>
        </Page>
      </slot>
      <Toc v-if="shouldShowToc" :class="{ fixed: scroll.y > pageTopHeight }" />
    </div>
  </Common>
</template>
