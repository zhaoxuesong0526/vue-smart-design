
### 1. 初始化package.json 
``` bash
  pnpm init -y | npm init -y
```
### 2. 在项目根目录创建   `.npmrc `文件
```
  shamefully-hoist = true // 羞耻的变量提升
  // 默认情况下pnpm都是采用的软链，默认不会把包放在nodemondules下
```

### 3. 安装 vue  ts
```bash
   pnpm install vue@next typescript -D
```
- 在这一步可以观察一下， 将 .npmrc 的 shamefully-hoist = true删除, 并删除node_modules包重新安装一下包，观察一下node_modules的前后变化

### 4. 初始化ts 配置文件, 并且参照element-plus 修改了一下（tsconfig.json）
```bash
npx tsc --init

```

### 5.在项目根目录创建`pnpm-workspace.yaml`配置文件
 - 利用pnpm的 worksapce 实现 monorepo 在一个项目下管理多个小项目


### 6. 创建组件测试环境
```bash 
  mkdir play && cd play
  pnpm init
  pnpm install vite @vitejs/plugin-vue # 安装vite及插件   

  # 也可以用vite生成
  # npm 6.x
  npm create vite@latest my-vue-app --template vue

  # npm 7+, extra double-dash is needed:
  npm create vite@latest my-vue-app -- --template vue

  # yarn
  yarn create vite my-vue-app --template vue

  # pnpm
  pnpm create vite my-vue-app --template vue

```
 - package.json    "dev": "pnpm -C play dev" 可以在外层项目运行  -C 执行文件目录

### 7. 创建packages 目录
```bash
  mkdir packages
  # 在packages 创建子包
   - components 存放组件的 #- 初始化包 pnpm init 并且修改包名
   - theme-chalk 存放样式文件 #- 初始化包 pnpm init 并且修改包名
   - utlis 存放工具方法 #- 初始化包 pnpm init 并且修改包名
   packages
    ├─components  # 存放所有的组件
    ├─utils       # 存放工具方法
    └─theme-chalk # 存放对应的样式
```
 - 如何让各个包 可以互相引用呢？ 需要将这几个包 安装到根目录下   类似于软链

```bash
  pnpm install @smart-design/components -w #不加 ‘w’允许安装到根的目录下 直接安装会报异常
  pnpm install @smart-design/theme-chalk -w 
   pnpm install @smart-design/utils -w 
```

8. 创建`icon`组件





遇到个大坑 使用 defineOptions 一直报错
```bash
报错: defineOptions cannot be used with default export within <script>.   Plugin: unplugin-vue-define-options

后来把版本降低就好了
解决办法：
 降低插件版本到 0.12.2
- pnpm i unplugin-vue-define-options@0.12.2 -D 

``` 









打包

// @types/gulp 类型声明文件
// sucrase 执行gulp执行文件   这个包可以让是ts文件 执行gulp的时候 调用这个包 看看是ts写的  
pnpm install gulp @types/gulp  sucrase -w

 "scripts": {
    "dev": "pnpm -C play dev",
    "build": "gulp -f build/gulpfile.ts" // gulp -f 制定打包的配置文件
  },



### 打包组件
> 安装打包所需依赖
- rollup 使用rollup打包
- @rollup/plugin-node-resolve 解析第三方模块
- @rollup/plugin-commonjs  解析commonjs插件
- rollup-plugin-typescript2 // 解析ts插件
- rollup-plugin-vue // 解析 .vue插件
```bash
pnpm install rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs rollup-plugin-typescript2 rollup-plugin-vue -D -w
```
> build/full-component.ts  把所有组件打包成一个文件
```javascript

```

- build/component  一个个打包 按需引入

```bash
// 快速查找目录
pnpm install fast-glob -w -D
```


pnpm install ts-morph -w -D

ts-morph 


