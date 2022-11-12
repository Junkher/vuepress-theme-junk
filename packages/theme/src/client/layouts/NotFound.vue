<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useThemeLocaleData } from '../composables/index.js'

const themeLocale = useThemeLocaleData()

const messages = themeLocale.value.notFound ?? ['Not Found']
const getMsg = (): string =>
  messages[Math.floor(Math.random() * messages.length)]

// get random group path as home link
const homeLink = ref('')
const groupPaths = themeLocale.value.menuGroups!.map(({ path }) => path)
onMounted(() => {
  homeLink.value = groupPaths[Math.floor(Math.random() * groupPaths.length)]
})
// const homeLink = themeLocale.value.home ?? routeLocale.value
const homeText = themeLocale.value.backToHome ?? 'Back to home'
</script>

<template>
  <div class="theme-container">
    <main class="page">
      <div class="theme-junk-content">
        <h1>404</h1>

        <blockquote>{{ getMsg() }}</blockquote>

        <RouterLink :to="homeLink">{{ homeText }}</RouterLink>
      </div>
    </main>
  </div>
</template>
