
// 主要维护所有路径的

import path from 'path'
// 项目的根目录
export const projectRoot = path.resolve(__dirname,'../../')

export const outDir = path.resolve(__dirname,'../../dist')

// 组件库的目录
export const SmartUIRoot = path.resolve(projectRoot,'packages/smart-design')

// 组件目录
export const compRoot = path.resolve(projectRoot,'packages/components')
