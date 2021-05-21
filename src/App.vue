<template>
  <nav :id="css.nav">
    <router-link v-for="r in routeMap"
      :key="r.path"
      :to="r.path">{{ r.meta.title }}</router-link>
  </nav>
  <div :id="css.article">
    <div :class="css.theme">
      <Switch style="width:50px;height:25px;"
        v-model="currentTheme"
        :on-color="['#fff6c4','#ffe7a0']"
        :off-color="['#333','#999']"
        @change="onChangeTheme">
        <template #on>
          <span style="text-shadow:1px 1px 1px rgba(0,0,0,.8)">昼</span>
        </template>
        <template #off>
          <span style="color:#333;text-shadow:1px 1px 1px rgba(255,255,255,.9)">夜</span>
        </template>
      </Switch>
    </div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from "vue"
import { routes } from "@/router/index"
import Switch from "./packages/components/switch"
const DOC = document.documentElement
export default defineComponent({
  components: { Switch },
  setup() {
    const routeMap = ref(routes)
    const currentTheme = ref<number>(1)
    return {
      routeMap,
      currentTheme,
      onChangeTheme(theme: number) {
        if (theme === 1) {
          DOC.dataset.theme = ""
        } else {
          DOC.dataset.theme = "night"
        }
      },
    }
  },
})
</script>
<style lang="postcss" module="css">
#nav {
  background-color: var(--k-color-background);
  border-right: 1px solid var(--k-color-line-5);
  float: left;
  width: 200px;
  height: 100%;
  padding: 10px 0;
  overflow: hidden auto;
  & a {
    font-weight: bold;
    display: block;
    color: var(--k-color-4);
    padding: 10px 20px;
    text-decoration: none;
    font-size: 14px;
    &:hover {
      color: var(--k-color-2);
    }
    &:global(.router-link-exact-active) {
      color: var(--k-color-2);
    }
  }
}
#article {
  margin-left: 200px;
  padding: 20px;
  height: 100%;
  position: relative;
  .theme {
    position: absolute;
    top: 0;
    right: 15px;
    border-radius: 0 0 6px 6px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.2);
    transition: var(--k-transition);
    transform: scale(0.5, 0.5);
    transform-origin: top right;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.15);
    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
      transform: scale(1, 1);
      box-shadow: 0 3px 15px rgba(0, 0, 0, 0.35);
    }
  }
}
</style>
