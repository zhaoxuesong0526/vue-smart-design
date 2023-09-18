<template>
  <i
    :class="bem.b()"
    :style="style"
    v-bind="$attrs"
  >
    <slot />
  </i>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { iconProps } from "./icon";
import { createNamespace } from "@smart-design/utils/create";

// defineOptions:  https://vue-macros.sxzz.moe/zh-CN/macros/define-options.html 
// 根目录安装 pnpm add unplugin-vue-define-options -D  -w
/**
 * // tsconfig.json
{
  "compilerOptions": {

    "types": ["unplugin-vue-define-options/macros-global" ]
  }
}
 */

 defineOptions({
  name: "SIcon",
  inheritAttrs: false,
});
const bem = createNamespace('icon')
const { size, color } = defineProps(iconProps);
const style = computed(() => {
  if( !size && !color ) return {}
  return {
    ...(size ? {'font-size': size + 'px'} : {}),
    ...(color ? {'color': color} : {}),
  };
});
</script>

