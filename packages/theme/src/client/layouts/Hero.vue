<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useBlogCategory } from 'vuepress-plugin-blog2/client'
import { useThemeLocaleData } from '../composables/index.js'

const themeLocale = useThemeLocaleData()
const heroContent = themeLocale.value.heroContent
const heroBtnText = themeLocale.value.heroBtnText

const categoryMap = useBlogCategory('category')
const categories = Object.keys(categoryMap.value.map)

const homeLink = ref('')
const getRandomTo = (): string =>
  categories[Math.floor(Math.random() * categories.length)].toLowerCase()
onMounted(() => {
  homeLink.value = `/home/${getRandomTo()}/`
})
</script>

<template>
  <main class="hero">
    <div class="hero-content text-center" v-html="heroContent" />
    <a :href="homeLink">{{ heroBtnText }}</a>
  </main>
</template>

<style></style>
