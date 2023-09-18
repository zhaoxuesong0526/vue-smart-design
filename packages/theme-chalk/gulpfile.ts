
// 打包样式
/**
 * pnpm install 
 * gulp-sass  gulp打包sass
 *  @types/gulp-sass 在ts中使用
 *  @types/sass  sass类型
 *  @types/gulp-autoprefixer  类型声明
 *  gulp-autoprefixer  加前缀
 * @types/gulp-clean-css 
 * gulp-clean-css 压缩
 * sass 
 * -D -w
 */


import { series, src, dest }  from "gulp"; // series串行执行 src 产生数据流 顺着pipe管道往下流   dest输出到哪
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCss from 'gulp-clean-css'
import path from 'path'

// 编译
function compile(){
  // 产生一个编译方法  把sass文件 用sass方法处理
  const sass = gulpSass(dartSass)
  // 找到src下以所有scss结尾的文件
  return src(path.resolve(__dirname, './src/*.scss')).pipe(sass.sync())
  .pipe(autoprefixer()).pipe(cleanCss()).pipe(dest('./dist'))
  // dest 输出到指定目录
}
function copyfont(){
  return src(path.resolve(__dirname, './src/fonts/**')).pipe(dest('./dist/fonts'))
}

function copyFullStyle(){
  return src(path.resolve(__dirname, './dist/**')).pipe(dest(path.resolve('../../dist/theme-chalk')))
}

// 串行执行
export default series(
  compile,
  copyfont,
  copyFullStyle
)