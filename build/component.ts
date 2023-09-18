import { series,parallel } from 'gulp'

import glob,{ sync } from 'fast-glob'
import { compRoot } from './utils/paths'
import path from 'path'

import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'

import { rollup, OutputOptions } from 'rollup'
import { buildConfig } from './utils/config'
import { pathRewriter,run } from './utils'

import {Project,SourceFile} from 'ts-morph'
import { outDir,projectRoot } from './utils/paths'

import fs from 'fs/promises'
import * as VueCompiler from "@vue/compiler-sfc";

// 需要把 packages/components 下所有文件夹 里边是index.ts 的都拿到

// 可以用node读  还有个快速方式 有个第三方模块 fast-glob 快速匹配所有文件
const buildEachComponent = async () => {
  // 搜索目录
  const files = sync('*', {
    cwd: compRoot,
    onlyDirectories: true // 只要文件夹
  })
  // 分别把components 文件夹下的组件 放到 dist/es/components下 和 dist/lib/components下
  // 为什么放到这俩（es lib）里边呢，因为在packages目录下 components和utils是平级关系 所以打包后也要是平级关系 这样能正常引入
  const builds = files.map(async file => {
    // file每个组件夹目录名
    const entry = path.resolve(compRoot, file, 'index.ts') // 找到每个目录的index.ts

    // 打包的配置
    const config = {
      input: entry,
      plugins: [nodeResolve(), commonjs(), typescript(), vue()],
      external: id => {
        // 不用再打包@smart-design开头的了 比如 import { withInstall } from '@smart-design/utils/with-intall'
        // 因为我们已经单独打包过utlis目录了， 只需要重写路径就行了
        return /^vue/.test(id) || /^@smart-design/.test(id)
      }
    }
    // 产生 rollup 配置对象
    const bundle = await rollup(config)

    // 每个文件的配置
    /**
      [
        {
          format: 'esm',
          file: '/Users/xiangbingzhao/smart-design/dist/es/components/icon/index.js',
          exports: 'named',
          paths: [Function (anonymous)]
        },
        {
          format: 'cjs',
          file: '/Users/xiangbingzhao/smart-design/dist/lib/components/icon/index.js',
          exports: 'named',
          paths: [Function (anonymous)
      ]
     */
    const options = Object.values(buildConfig).map(config => ({
      format: config.format, // 打包格式
      file: path.resolve(config.output.path, `components/${file}/index.js`), // 打包路径
      exports: 'named',
      paths: pathRewriter(config.output.name) // 重写路径
    }))
    const result = options.map(option => bundle.write(option as OutputOptions))
    return Promise.all(result)
  })

  return Promise.all(builds)
}




async function genTypes() {
  const project = new Project({
    // 生成.d.ts 我们需要有一个tsconfig
    compilerOptions: {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true,
      noEmitOnError: true,
      outDir: path.resolve(outDir, "types"),
      baseUrl: projectRoot,
      paths: {
        "@smart-design/*": ["packages/*"],
      },
      skipLibCheck: true,
      strict: false,
    },
    tsConfigFilePath: path.resolve(projectRoot, "tsconfig.json"),
    skipAddingFilesFromTsConfig: true,
  });

  const filePaths = await glob("**/*", {
    // ** 任意目录  * 任意文件
    cwd: compRoot,
    onlyFiles: true,
    absolute: true,
  });

  const sourceFiles: SourceFile[] = [];

  await Promise.all(
    filePaths.map(async function (file) {
      if (file.endsWith(".vue")) {
        const content = await fs.readFile(file, "utf8");
        const sfc = VueCompiler.parse(content);
        const { script } = sfc.descriptor;
        if (script) {
          const content = script.content; // 拿到脚本  icon.vue.ts  => icon.vue.d.ts
          const sourceFile = project.createSourceFile(file + ".ts", content);
          sourceFiles.push(sourceFile);
        }
      } else {
        const sourceFile = project.addSourceFileAtPath(file); // 把所有的ts文件都放在一起 发射成.d.ts文件
        sourceFiles.push(sourceFile);
      }
    })
  );
  await project.emit({
    // 默认是放到内存中的
    emitOnlyDtsFiles: true,
  });

  const tasks = sourceFiles.map(async (sourceFile: any) => {
    const emitOutput = sourceFile.getEmitOutput();
    const tasks = emitOutput.getOutputFiles().map(async (outputFile: any) => {
      const filepath = outputFile.getFilePath();
      await fs.mkdir(path.dirname(filepath), {
        recursive: true,
      });
      // @smart-design -> smart-design/es -> .d.ts 肯定不用去lib下查找
      await fs.writeFile(filepath, pathRewriter("es")(outputFile.getText()));
    });
    await Promise.all(tasks);
  });

  await Promise.all(tasks)
}
function copyTypes(){
    const src = path.resolve(outDir,'types/components/')
    const copy = (module)=>{
        const output = path.resolve(outDir,module,'components')
        return ()=> run(`cp -r ${src}/* ${output}`)
    }
    return parallel(copy('es'),copy('lib'))
}

async function buildComponentEntry() {
    const config = {
        input: path.resolve(compRoot, "index.ts"),
        plugins: [typescript()],
        external: () => true,
    };
    const bundle = await rollup(config);
    return Promise.all(
        Object.values(buildConfig)
            .map((config) => ({
                format: config.format,
                file: path.resolve(config.output.path, "components/index.js"),
            }))
            .map((config) => bundle.write(config as OutputOptions))
    );
}


export const buildComponent = series(buildEachComponent, genTypes,copyTypes(),buildComponentEntry);
