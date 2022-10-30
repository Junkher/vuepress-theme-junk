<script setup lang="ts">
import { withBase } from '@vuepress/client'
import type { PersonalConfig } from '../../shared/index.js'
import { useThemeLocaleData } from '../composables/index.js'
const themeLocale = useThemeLocaleData()
const personalInfo = themeLocale.value.personalInfo as PersonalConfig
</script>

<template>
  <div class="about">
    <!-- background-image is not responsive -->
    <!-- <div
      class="banner"
      :style="{ 'background-image': `url(${withBase(personalInfo.banner)})` }"
    ></div> -->
    <div class="img-wrapper">
      <img :src="withBase(personalInfo.banner)" alt="banner" class="banner" />
      <img :src="withBase(personalInfo.avatar)" alt="avatar" class="avatar" />
    </div>
    <div class="text-wrapper">
      <h1>{{ personalInfo.name }}</h1>
      <p>{{ personalInfo.bio }}</p>
    </div>
  </div>
</template>

<style></style>
