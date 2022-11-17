<script setup lang="ts">
import { Icon } from '@iconify/vue'
import ToggleColorModeButton from '@theme/ToggleColorModeButton.vue'
import ToggleFullScreenButton from '@theme/ToggleFullScreenButton.vue'
import { usePageData } from '@vuepress/client'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { JunkThemePageData } from '../../shared/index.js'

const isToolkitOpen = ref(false)

const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const page = usePageData<JunkThemePageData>()
const backHomeLink = page.value.filePathRelative
  ? `/${page.value.filePathRelative.split('/').at(-2)}/`
  : null

const route = useRouter()
const backHome = (): void => {
  if (backHomeLink) route.push(backHomeLink)
}
</script>

<template>
  <div
    class="toolkit-wrapper"
    :class="{ open: isToolkitOpen }"
    @mouseenter="isToolkitOpen = true"
    @mouseleave="isToolkitOpen = false"
  >
    <div class="toolkit-btn" title="toolkit">
      <Icon icon="ep:menu" width="40" />
    </div>
    <div class="tool-wrapper">
      <ToggleColorModeButton class="tool" />
      <ToggleFullScreenButton class="tool" />
      <div class="tool" title="back to home" @click="backHome">
        <Icon icon="bx:home-heart" />
      </div>
      <div class="tool" title="top" @click="scrollToTop">
        <Icon icon="akar-icons:chevron-up" />
      </div>
    </div>
  </div>
</template>

<style></style>
