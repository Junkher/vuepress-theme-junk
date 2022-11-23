<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { usePageNav } from '../composables/index.js'

const { nextPost, prevPost } = usePageNav()
</script>

<template>
  <nav v-if="prevPost || nextPost" class="page-nav">
    <p class="inner">
      <RouterLink v-if="prevPost" :to="prevPost.path" class="prev">
        {{ prevPost.info.title }}
      </RouterLink>
      <RouterLink v-if="nextPost" :to="nextPost.path" class="next">
        {{ nextPost.info.title }}
      </RouterLink>
    </p>
  </nav>
</template>
