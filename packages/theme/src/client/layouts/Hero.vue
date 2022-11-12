<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useThemeLocaleData } from '../composables/index.js'

const themeLocale = useThemeLocaleData()
const heroContent = themeLocale.value.heroContent
const heroBtnText = themeLocale.value.heroBtnText

// get random group path as home link
const homeLink = ref('')
const groupPaths = themeLocale.value.menuGroups!.map(({ path }) => path)
onMounted(() => {
  homeLink.value = groupPaths[Math.floor(Math.random() * groupPaths.length)]
})
</script>

<template>
  <main class="hero">
    <div class="hero-content text-center" v-html="heroContent" />
    <a :href="homeLink">{{ heroBtnText }}</a>
  </main>
</template>

<style></style>
