# 这是一个简单的自用webpack多view脚手架

### 安装步骤

    1.请确保全局安装了 webpack npm

    2.下载克隆此工程

    3.npm install

    4.npm run dev-* (开发环境 *代表views下面的模块名) npm run build-* (发布环境 *代表views下面的模块名) npm run build (发布环境 全部发布)

### 目录结构

> `src 开发环境`

>> css 通用css

>> js 通用js

>> components 通用组件

>> views 模块名字

>>> mobile mobile模块目录

>>>> *** mobile模块里的资源 包括JS,CSS等

>>> pc pc模块目录

>>>> *** pc模块里的资源 包括JS,CSS等

>> ...

>> template.html 主模板/页面

> `dist 发布环境`

>> mobile

>>> css,js等文件

>>> html

>> pc

>>> css,js等文件

>>> html

>> ...

>> template.html

> .babelrc babel配置文件

> package.json 包信息

> postcss.config.js postcss配置文件

> webpack.config.js webpack配置文件

> node_modules 模块包

### webpack 配置

    总体：热加载(不含组件热加载),全局挂载,自动清理产出文件夹,区分处理开发和发布环境

    html：html模板引擎,svg行内挂载

    css: less sass 分离样式表 自动补全前缀hack 支持css4(与less sass 冲突 选择性使用)

    js: 支持es6 typescript 代码分离 提取公共模块 丑化

    图片：压缩 base64编码

    字体：压缩

### npm包说明

* devDependencies 为开发的配置项

* dependencies 为项目的配置项 现包括jquery(已在webpack全局挂载),font-awesome,lodash

