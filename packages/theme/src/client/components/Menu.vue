<script setup lang="ts">
import PostList from '@theme/PostList.vue'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useMenu } from 'vuepress-plugin-menu/client'
import type { JunkThemePostInfo } from '../../shared/index.js'

const menu = useMenu<JunkThemePostInfo>()
const postItems = computed(() => menu.value.currentPosts ?? [])
</script>

<template>
  <!-- <input type="range" min="0" max="100" value="4" class="range" /> -->
  <div class="menu">
    <div class="menu-item-list">
      <RouterLink
        v-for="({ path, name }, key) in menu.map"
        :key="key"
        :to="path"
        class="menu-item"
      >
        {{ name }}
      </RouterLink>
    </div>
  </div>
  <PostList :items="postItems" />
</template>
