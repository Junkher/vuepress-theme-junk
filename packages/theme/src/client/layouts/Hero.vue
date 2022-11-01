<script setup lang="ts">
import { useBlogCategory } from 'vuepress-plugin-blog2/client'
import { useThemeLocaleData } from '../composables/index.js'

const themeLocale = useThemeLocaleData()
const heroContent = themeLocale.value.heroContent
const heroBtnText = themeLocale.value.heroBtnText

const categoryMap = useBlogCategory('category')
const categories = Object.keys(categoryMap.value.map)
const getRandomTo = (): string =>
  categories[Math.floor(Math.random() * categories.length)].toLowerCase()
</script>

<template>
  <main class="hero">
    <div class="hero-content text-center" v-html="heroContent" />
    <a :href="`/home/${getRandomTo()}/`">{{ heroBtnText }}</a>
    <!-- <RouterLink to="/category"> Fk Me </RouterLink> -->
  </main>
</template>

<style></style>
