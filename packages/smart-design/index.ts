
// 引入组件库
import type { App } from 'vue'
import { SIcon } from '@smart-design/components/index'

const components =  [
  SIcon
]

const install = (app:App) => {
  // 每个组件都有一个 install 方法,   也有可能是指令 但是都有个install方法
  components.forEach(component => app.use(component))
}
export default {
  install, // 用户使用全部倒入 app.use(SmartDesign)
}
export * from '@smart-design/components' // 用户还会这样使用  import { SIcon } from 'smart-design'