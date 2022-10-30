<script lang="ts" setup>
import PostItem from '@theme/PostItem.vue'
import type { JunkThemePost } from '../../shared/index.js'
defineProps<{
  items: JunkThemePost[]
}>()
</script>

<template>
  <div class="post-list-wrapper">
    <div v-if="!items.length">Nothing in here.</div>
    <PostItem v-for="(item, index) in items" :key="index" :item="item" />
    <!-- <article
      v-for="({ info, path }, index) in items"
      :key="index"
      class="article"
    >
      <header class="title">
        <RouterLink :to="path">
          {{ info.title }}
        </RouterLink>
      </header>
      <hr />
      <div class="article-info">
        <span v-if="info.author" class="author">Author: {{ info.author }}</span>
        <span v-if="info.date" class="date"
          >Date: {{ new Date(info.date).toLocaleDateString() }}</span
        >
        <span v-if="info.category" class="category"
          >Category: {{ info.category.join(',') }}</span
        >
        <span v-if="info.tag" class="tag">Tag: {{ info.tag.join(',') }}</span>
      </div>
    </article> -->
  </div>
</template>
