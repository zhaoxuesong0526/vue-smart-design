# /bin/bash

# 确保脚本抛出遇到的错误
set -e

# 重新打包组件库
# pnpm build

# 打包生成静态文件
pnpm docs:build

# 进入待发布的 dist/ 目录

# cd docs/.vitepress

source_dir="docs/.vitepress/dist"
destination_dir="docs/dist"

cp -r "$source_dir" "$destination_dir"



# 提交打包静态网站到 gh-pages 分支
# git init
# git add .
# git commit -m 'deploy'
# git push origin gh-pages
# 部署到 https://<username>.github.io/<repo>
# git push -f git@github.com:zhaoxuesong0526/smart-design-js.git master:gh-pages

# 提交所有代码到github
# cd ../../../
git add .
git commit -m 'update'
git push
