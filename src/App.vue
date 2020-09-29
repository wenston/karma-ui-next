<template>
  <nav :id="css.nav">
    <router-link v-for="r in routeMap"
      :key="r.path"
      :to="r.path">{{ r.meta.title }}</router-link>
  </nav>
  <div :id="css.article">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from "vue"
import { routes } from "@/router/index"
export default defineComponent({
  setup() {
    const routeMap = ref(routes)
    return {
      routeMap,
    }
  },
})
</script>
<style lang="postcss" module="css">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 14px;
}
html,
body {
  height: 100%;
}
#nav {
  background-color: #1f2e43;
  color: white;
  float: right;
  width: 200px;
  height: 100%;
  padding: 10px 0;
  & a {
    font-weight: bold;
    display: block;
    color: #ccc;
    padding: 10px 20px;
    text-decoration: none;
    &:hover {
      color: white;
    }
    &:global(.router-link-exact-active) {
      background-color: #112035;
      color: white;
    }
  }
}
#article {
  margin-right: 200px;
  padding: 20px;
  height: 100%;
}
</style>
