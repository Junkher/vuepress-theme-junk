<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useBlogCategory } from 'vuepress-plugin-blog2/client'
import { useThemeLocaleData } from '../composables/index.js'

const themeLocale = useThemeLocaleData()

const messages = themeLocale.value.notFound ?? ['Not Found']
const getMsg = (): string =>
  messages[Math.floor(Math.random() * messages.length)]

const categoryMap = useBlogCategory('category')
const categories = Object.keys(categoryMap.value.map)

const homeLink = ref('')
const getRandomTo = (): string =>
  categories[Math.floor(Math.random() * categories.length)].toLowerCase()
onMounted(() => {
  homeLink.value = `/home/${getRandomTo()}/`
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
