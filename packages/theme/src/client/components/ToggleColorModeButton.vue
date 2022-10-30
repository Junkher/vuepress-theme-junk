<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useDarkMode, useThemeLocaleData } from '../composables/index.js'

const themeLocale = useThemeLocaleData()
const isDarkMode = useDarkMode()

const toggleColorMode = (): void => {
  isDarkMode.value = !isDarkMode.value
}
</script>

<template>
  <div :title="themeLocale.toggleColorMode" @click="toggleColorMode">
    <Icon v-show="!isDarkMode" icon="akar-icons:sun" />
    <Icon v-show="isDarkMode" icon="akar-icons:moon" />
  </div>
</template>
