# vuepress-plugin-menu

[![npm](https://img.shields.io/npm/v/vuepress-plugin-menu/next.svg?logo=npm)](https://www.npmjs.com/package/vuepress-plugin-menu)
[![license](https://img.shields.io/badge/License-MIT-blue?style=flat)](LICENSE)

Group pages and attach extra page data to the route record of vue-router, inspired by [`vuepress-plugin-blog2`](https://github.com/vuepress-theme-hope/vuepress-theme-hope/tree/main/packages/blog2/) and [HUGO](https://gohugo.io/)  

This plugin is mainly used to develop themes, and has been integrated into the vuepress-theme-junk. 

For theme authors, this plugin will help you create a basic menu easily.

## Usage

```sh
pnpm add -D vuepress-plugin-menu@next
```

```
import { menuPlugin } from `vuepress-plugin-menu`

plugins: [
     menuPlugin({
      // options
     })
```

## Options

### **groups**

- Type: `Group[]`
```ts
interface Group {
  path: string
  name?: string
  weight?: number
}
```

- Details: 

  Specify the groups of pages. Plugin group pages by `path`, which must be the unique key. Entries in menu are sorted ascending by their `weight`.


### path

- Type: `string`
- Details: 

  Path of main menu page.

### layout

- Type: `string`
- Details: 

  Layout of main menu page.

### itemLayout

- Type: `string`
- Details: 

  Layout of group page.

### getPageInfo

- Type: `(page: Page) => Record<string, unknown>`
- Details: 
  
  Function used to get page info to be attached to route record.

### filter

- Type: `(page: Page) => boolean`
- Details:

  Function used to determine whether a page should be included.

### sorter

- Type:
- Details: `(pageA: Page, pageB: Page) => number`

  CompareFn used to determine the order of the pages

  
## Composition API 

### useMenu

- Details:

  Returns the menu data ref object.

- Example:
```ts
<script setup lang="ts">
import PostList from '@theme/PostList.vue'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useMenu } from 'vuepress-plugin-menu/client'

const menu = useMenu()
const postItems = computed(() => menu.value.currentPosts)
</script>

<template>
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
  <PostList :items="postItems ?? []" />
</template>
```
