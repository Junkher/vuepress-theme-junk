<script setup lang="ts">
// import PageMeta from '@theme/PageMeta.vue'
import PageNav from '@theme/PageNav.vue'
import PageTop from '@theme/PageTop.vue'
</script>

<template>
  <main class="page">
    <PageTop />
    <slot name="top" />

    <div class="theme-junk-content">
      <slot name="content-top" />

      <Content />

      <slot name="content-bottom" />
    </div>

    <!-- <PageMeta /> -->

    <PageNav />

    <slot name="bottom" />
  </main>
</template>
