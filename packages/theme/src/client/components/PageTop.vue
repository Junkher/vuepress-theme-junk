<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { usePageData, usePageFrontmatter, withBase } from '@vuepress/client'
import { inject } from 'vue'
import type {
  JunkThemeNormalPageFrontmatter,
  Scroll,
} from '../../shared/index.js'
import { resolveDate } from '../utils/index.js'

const frontmatter = usePageFrontmatter<JunkThemeNormalPageFrontmatter>()
const page = usePageData()
const pageTopHeight = 340
const paddingTop = 128

const scroll = inject<Scroll>('scroll')!
</script>

<template>
  <div ref="d" class="page-top-holder">
    <div
      class="page-top"
      :style="{
        'background-image': frontmatter.cover
          ? `url(${withBase(frontmatter.cover)})`
          : undefined,
        'padding-top': `${paddingTop - scroll.y}px`,
        'opacity': !scroll.arrivedState.bottom
          ? `${1 - scroll.y / pageTopHeight}`
          : 0,
      }"
    >
      <div class="page-top-mask"></div>
      <div class="page-top-content">
        <h1 class="page-title">{{ page.title }}</h1>
        <p class="page-description">{{ frontmatter.description }}</p>
        <div class="page-info">
          <Icon icon="bx:calendar" :inline="true" />
          {{ resolveDate(frontmatter.date!) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
