<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { Platform } from '../../shared/index.js'
import { useThemeLocaleData } from '../composables/index.js'
const themeLocale = useThemeLocaleData()
const footerHtml = themeLocale.value.footer
const sns = themeLocale.value.personalInfo?.sns
const icons: Record<Platform, string> = {
  github: 'akar-icons:github-fill',
  email: 'ic:outline-email',
  bilibili: 'ri:bilibili-line',
  youtube: 'bxl:youtube',
  telegram: 'fa:telegram',
  twitter: 'bxl:twitter',
  instagram: 'bxl:instagram',
}
</script>

<template>
  <footer class="footer">
    <div v-html="footerHtml" />
    <span>
      Powered by
      <a href="https://v2.vuepress.vuejs.org/">VuePress</a> &
      <a href="">Junk</a>
    </span>
    <div class="sns-wrapper">
      <a v-for="(link, platform, index) in sns" :key="index" :href="link">
        <Icon :icon="icons[platform]" :inline="true" />
      </a>
    </div>
  </footer>
</template>
