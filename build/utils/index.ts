
import { spawn } from 'child_process'

import { projectRoot } from './paths'

// 给任务加个名字
export const withTaskName = (name: string, fn) => {
  return Object.assign(fn, { displayName: name })
}

// 这个方法一执行 就可以执行命令 携带参数
// 在node中使用子进程运行脚本
export const run = async (command:string) => { // rf -rf
  return new Promise((resolve) =>{
    const [cmd, ...arg] = command.split(',')
    const app = spawn(cmd, arg, { // 以什么位置执行， 在哪个目录下执行
      cwd:projectRoot, // 目录
      stdio: 'inherit',// 直接将这个子进程的输出 共享给父进程，
      shell:true, // 默认情况下 linux才支持 rm -rm , mac天生支持， windows 需要在电脑装 git bash
    })
    app.on('close',resolve)
  })
}

// 重写路径
export const pathRewriter = (format)=>{
  return (id:string)=>{
    // replaceAll 不兼容 可能node版本低
    id = id.replace('@smart-design',`smart-design/${format}`);
    return id
  }
}

