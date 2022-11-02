<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { usePageData } from '@vuepress/client'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { JunkThemePageData } from '../../shared/index.js'
import ToggleColorModeButton from './ToggleColorModeButton.vue'
import ToggleFullScreenButton from './ToggleFullScreenButton.vue'

const isMenuOpen = ref(false)

const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const page = usePageData<JunkThemePageData>()
const relPermalink = page.value.filePathRelative
const backHomeLink = relPermalink
  ? `/home/${relPermalink.split('/')[1]}/`
  : null

const route = useRouter()
const backHome = (): void => {
  if (backHomeLink) route.push(backHomeLink)
}
</script>

<template>
  <div
    class="menu-wrapper"
    :class="{ open: isMenuOpen }"
    @mouseover="isMenuOpen = true"
    @mouseout="isMenuOpen = false"
  >
    <div class="menu-btn" title="menu">
      <Icon icon="ep:menu" width="40" />
    </div>
    <div class="menu-item-wrapper">
      <ToggleColorModeButton class="menu-item" />
      <ToggleFullScreenButton class="menu-item" />
      <div class="menu-item" title="back to home" @click="backHome">
        <Icon icon="bx:home-heart" />
      </div>
      <div class="menu-item" title="top" @click="scrollToTop">
        <Icon icon="akar-icons:chevron-up" />
      </div>
    </div>
  </div>
</template>

<style></style>
