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
  </div>
</template>
