

import { series,parallel } from 'gulp'
import { buildConfig } from './utils/config'
import path from 'path'
import { outDir, projectRoot } from './utils/paths'
import { src, dest } from 'gulp'
import ts from 'gulp-typescript' //ts 转 js pnpm i gulp-typescript -D -w
import { withTaskName } from './utils'
export const buildPackages = (dirname,name) => {
  const tasks = Object.entries(buildConfig).map(([module,config]) => {
    const tsConfig = path.resolve(projectRoot,'tsconfig.json')
    // 入口文件 需要所有的ts 但是不要 !gulpfile.ts !node_modules
    const inputs = ['**/*.ts','!gulpfile.ts','!node_modules']
    const output = path.resolve(dirname,'dist',config.output.name) // 输出路径
    return series(
      withTaskName(`build:${name}`,()=> {
        return src(inputs).pipe(ts.createProject(tsConfig,{
          declaration: true,// 需要生成ts 声明 文件
          strict: false,
          module:config.module,
        })()).pipe(dest(output))
      }),
      withTaskName(`build:${name}`,()=>{
        return src(`${output}/**`).pipe(dest(path.resolve(outDir,config.output.name,name)))
      })
    )
  })

  // gulp 适合流程控制  代码转译
  // 这个逻辑只是让ts 转为 js 即可,  gulp可以让js转译输出
  return parallel(...tasks)
}