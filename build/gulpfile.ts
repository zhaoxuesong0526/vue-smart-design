// gulp 用来控制流程控制 一件一件事去做
// gulp 打包 有 parallel并行 和  串行 series

import { series, parallel } from 'gulp'

import { withTaskName, run } from './utils/index'
import { SmartUIRoot, outDir } from './utils/paths'
import { genTypes } from './gen-types'

const copySourceCode = () => async () => {
  await run(`cp ${SmartUIRoot}/package.json ${outDir}/package.json`)
}

//1. 打包样式 2.打包工具方法 3.打包所有组件 4.打包每个组件 5.生成一个组件库 5.发布组件
export default series(
  // 需要是promise
  // 这样 一个一个的流程控制
  withTaskName('clean', async () => {
    return run('rm -rf ./dist') // 删除dist目录
  }),
  /**
   *
   */

  // 下边这些可以并行打包    可以写删除parallel()  也可以把步骤拿出来 一个个执行
  parallel(
    // 打包样式
    withTaskName('buildPackages', () => {
      //pnpm run 执行    执行谁 --filter 找到packages 下的package.json下的build 然后并行打包parallel   ---- 这些命令pnpm官网可以查找
      return run('pnpm run --filter ./packages/theme-chalk build')
    }),
    // 打包工具
    withTaskName('buildUtils', () => {
      //pnpm run 执行    执行谁 --filter 找到packages 然后并行打包parallel   ---- 这些命令pnpm官网可以查找
      return run('pnpm run --filter ./packages/utils build')
    }),

    // 打包全部的组件
    withTaskName('buildFullComponent', () => {
      // pnpm run build 默认后边其实是 pnpm run build defualt
      // pnpm run build buildFullComponent  打包的时候去找 buildFullComponent 这个方法
      // 执行build命令会调用 rollup, 我们给rollp传递参数 buildFullComponent 就回执行这个buildFullComponent
      return run('pnpm run build buildFullComponent') //
    }),

    // 打包 成一个个的组件  一个一个的打包
    withTaskName('buildComponent', () => {
      return run('pnpm run build buildComponent') //
    })
  ),
  parallel(genTypes,copySourceCode())
)

// 把所有组件打包成一个文件  这是个任务
export * from './full-component'

// 把组件一个一个的打包  按需引入  这是个任务
export * from './component'
