
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import { parallel } from 'gulp'
import path from 'path'
import { SmartUIRoot, outDir } from './utils/paths'
import {rollup, OutputOptions } from 'rollup'

import fs from 'fs/promises'
import { buildConfig } from './utils/config'
import { pathRewriter } from './utils'
// 这是把组件库打包成一个文件  
const buildFull = async () => {
  // rollup打包的配置信息
  const config = {
    input: path.resolve(SmartUIRoot,'index.ts'),
    plugins:[
      nodeResolve(),
      commonjs(),
      typescript(),
      vue()
    ],
    external: (id) => { //排除vue源码 import vue from 'vue'
      return /^vue/.test(id) //表示打包的时候不打包vue代码
    }

  }

  const bundle = await rollup(config)
  // 组件库有两种使用方式   import（esm） 和 浏览器 script(umd)
  const buildConfig= [
    {
      format: 'umd',// 打包格式
      file: path.resolve(outDir,'index.umd.js'),
      name: 'SmartDesign', // name exports  globals 这三个参数一般一起使用
      exports: 'named', // 加了name 必须给抛出一个表示 named   rollup要求的
      globals: { // 表示使用的vue 是全局的 ， //可加可不加
        vue: "Vue"
      }
    },
    {
      format: 'esm',
      file: path.resolve(outDir,'index.esm.js'),
    }
  ]
 
  // OutputOptions  rollup 内置类型  config类型强转一下
  return Promise.all(buildConfig.map(config => bundle.write(config as OutputOptions)))

}



async function buildEntry() {
  const entryFiles = await fs.readdir(SmartUIRoot, { withFileTypes: true });

  
  const entryPoints = entryFiles
    .filter((f) => f.isFile())
    .filter((f) => !["package.json",'README.md'].includes(f.name))
    .map((f) => path.resolve(SmartUIRoot, f.name));


  const config = {
    input: entryPoints,
    plugins: [nodeResolve(), vue(), typescript()],
    external: (id: string) => /^vue/.test(id) || /^@smart-design/.test(id),
  };
  const bundle = await rollup(config);
  return Promise.all(
    Object.values(buildConfig)
      .map((config) => ({
        format: config.format,
        dir: config.output.path,
        paths: pathRewriter(config.output.name),
      }))
      .map((option) => bundle.write(option as OutputOptions))
  );
}




// 这是个任务  buildFullComponent 任务名
export const buildFullComponent  = parallel(buildFull,buildEntry) // 并行打包组件