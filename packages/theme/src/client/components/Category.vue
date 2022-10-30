<script setup lang="ts">
import PostList from '@theme/PostList.vue'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useBlogCategory } from 'vuepress-plugin-blog2/client'
import type { JunkThemePost } from '../../shared/index.js'
const categoryMap = useBlogCategory('category')
const postItems = computed(
  () => categoryMap.value.currentItems as JunkThemePost[]
)
</script>

<template>
  <!-- <input type="range" min="0" max="100" value="4" class="range" /> -->
  <div class="category">
    <div class="category-item-list">
      <RouterLink
        v-for="({ path }, name) in categoryMap.map"
        :key="name"
        :to="path"
        class="category-item"
      >
        {{ name }}
      </RouterLink>
    </div>
  </div>
  <PostList :items="postItems ?? []" />
</template>
