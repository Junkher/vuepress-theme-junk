<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useFullscreen } from '@vueuse/core'
import { useThemeLocaleData } from '../composables/index.js'

const themeLocale = useThemeLocaleData()
const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()
</script>

<template>
  <div :title="themeLocale.toggleFullscreen" @click="toggleFullscreen">
    <Icon v-show="isFullscreen" icon="mdi-light:fullscreen-close" />
    <Icon v-show="!isFullscreen" icon="mdi-light:fullscreen" />
  </div>
</template>

<style></style>
