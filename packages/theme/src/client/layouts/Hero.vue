<script setup lang="ts">
import { useBlogCategory } from 'vuepress-plugin-blog2/client'
import { useThemeLocaleData } from '../composables/index.js'

const themeLocale = useThemeLocaleData()
const heroContent = themeLocale.value.heroContent
const heroBtnText = themeLocale.value.heroBtnText

const categoryMap = useBlogCategory('category')
const categories = Object.keys(categoryMap.value.map)
const to =
  categories[Math.floor(Math.random() * categories.length)].toLowerCase()
</script>

<template>
  <main class="hero">
    <ClientOnly>
      <div class="hero-content text-center" v-html="heroContent" />
    </ClientOnly>
    <a :href="`/home/${to}/`">{{ heroBtnText }}</a>
    <!-- <RouterLink to="/category"> Fk Me </RouterLink> -->
  </main>
</template>

<style></style>
