<script setup lang="ts">
import type { JunkThemePost } from '../../shared/index.js'

// defineProps({
//   items: {
//     type: Object as PropType<>,
//     default: () => ({}),
//   },
// })

defineProps<{
  item: JunkThemePost
}>()
</script>

<template>
  <div class="post-item">
    <RouterLink :to="item.path">
      <div class="cover">
        <img :src="item.info.cover!" alt="Nothing in here" />
      </div>
      <h1 class="title">{{ item.info.title }}</h1>
      <p class="description">{{ item.info.description }}</p>
    </RouterLink>
  </div>
</template>

<style></style>
