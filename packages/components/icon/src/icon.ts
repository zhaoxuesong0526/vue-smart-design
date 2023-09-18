// 放组件props 和 一些方法公共

// vue 内置提取类型的方法
import type { ExtractPropTypes } from "vue" 
export const iconProps = {
  size: {
    type: Number
  },
  color: {
    type: String
  }
} as const // 仅读的

// 导出类型
export type IconProps =  ExtractPropTypes<typeof iconProps>