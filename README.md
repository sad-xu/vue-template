# 前端通用模板

## 安装

`npm config set registry https://registry.npm.taobao.org -g`

`npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/ -g`

`npm install`

## VSCode 相关

必装插件 `Vetur`、`ESLint`、`stylelint`

```json
// 保存时自动修复
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true,
  "source.fixAll.stylelint": true
}
```

## 技术栈

基于 `Vue CLI 3`

`Vue` + `Vue Router` + `Vuex` + `Element UI` + `SCSS`

## 内置组件

* 侧边栏组件

* 顶部导航栏组件

* `svg-icon` 图标组件

* `el-table-infinite-scroll` 扩展 `el-table`无限滚动功能

## 内置功能

* 打包自动去除 `console`

* 打包开启 `gZip`

* 打包生成分析报告（可选）

* 开发环境命令行追加自定义打印内容 `configureWebpack-dev-plugins`

* 集成 `standard` + `eslint-plugin-vue` 代码规范

* 使用 `stylelint` 规范 `css` 代码

* 全局样式变量 `variabless.scss`

* 路由自动生成侧边栏

* 导出图片、PDF

* 导出Excel 支持加粗、合并、边框

* 用户权限控制 路由 + 操作

* 埋点 `tracker.js` 路由 + 操作

* Highcharts 自动销毁功能，防止内存泄露、

* 获取项目中图片的二进制数据 `utils/index.js - getLocalImgData`

## 实验室

* CSS 动画

* `codepen` 真实预览功能

* 当前项目所有的 `svg-icon` 生成及预览

* 轻量级表格组件 `ez-table`

* 数字输入框 `ez-input` TODO: 未完成

## TODO

风格参考 `https://pixinvent.com/demo/apex-react-redux-bootstrap-admin-dashboard-template/demo-1/analytics-dashboard`

## 项目结构

```text
├── .editorconfig                       // 编辑器配置
├── .env.development                    // 开发环境变量
├── .env.production                     // 生产环境变量
├── .eslintignore                       // eslint 忽略文件配置
├── .eslintrc.js                        // eslint 代码规范配置
├── babel.config.js                     // 编译js语法 + element-ui 按需引入配置
├── dist                                // 打包产物，发布到生产环境
│   ├── favicon.png
│   ├── index.html
│   └── static
├── jest.config.js                      // 单元测试配置文件 暂时无用
├── package-lock.json                   // 依赖版本锁定文件
├── package.json                        // 项目描述、命令、依赖
├── postcss.config.js                   // CSS 浏览器前缀自动补全
├── public                              // 入口html，及不会被webpack处理的静态资源
│   ├── favicon.png
│   └── index.html
├── README.md                           // 项目文档
├── src                                 // 项目主体
│   ├── api                             // 所有接口，按功能分多个文件
│   │   └── user.js
│   ├── App.vue                         // 根组件
│   ├── assets                          // 静态资源，会被 webpack 处理
│   │   └── avatar.png
│   ├── components                      // 全局公共组件
│   │   ├── el-table-infinite-scroll
│   │   └── svg-icon
│   ├── icons                           // svg图标，通过 svg-icon 使用
│   │   ├── index.js
│   │   └── svg
│   ├── layout                          // 页面上方和左侧栏
│   │   ├── components
│   │   │   ├── AppMain.vue
│   │   │   ├── Navbar                  // 上方栏 头像 + 页面指示 + 侧边栏展开缩回按钮
│   │   │   │   ├── Breadcrumb.vue
│   │   │   │   └── Navbar.vue
│   │   │   └── Sidebar                 // 侧边栏 logo + 页面导航 根据路由自动生成
│   │   │       ├── Item.vue
│   │   │       ├── Logo.vue
│   │   │       ├── Sidebar.vue
│   │   │       └── SidebarItem.vue
│   │   └── Layout.vue
│   ├── main.js                         // 入口文件 初始化配置
│   ├── permission.js                   // 路由拦截 与权限有关
│   ├── router                          // 路由
│   │   └── index.js
│   ├── store                           // vuex
│   │   ├── getters.js
│   │   ├── index.js
│   │   └── modules
│   │       ├── app.js
│   │       └── user.js
│   ├── styles                          // CSS
│   │   ├── element-ui.scss             // 覆盖 element-ui 自带样式
│   │   ├── index.scss                  // 入口 与 全局样式
│   │   ├── transition.scss             // 全局元素过渡类
│   │   └── variables.scss              // 全局 css 变量
│   ├── utils
│   │   ├── auth.js                     // token 可根据情况舍弃
│   │   ├── export                      // 导出相关 excel、img、pdf 待升级
│   │   │   ├── excel.js
│   │   │   ├── img.js
│   │   │   ├── index.js
│   │   │   └── pdf.js
│   │   ├── filter.js                   // 全局过滤器 同时时绑定在 vue 上的全局函数
│   │   ├── index.js                    // 一般工具函数，使用时需手动引入
│   │   ├── request.js                  // 请求封装
│   │   ├── tracker.js                  // 埋点
│   │   └── url.js                      // 请求url api里用
│   └── views                           // 页面
│       ├── 404.vue                     // 404
│       ├── home                        // 主页
│       │   └── Home.vue
│       └── login                       // 登录页
│           └── Login.vue
├── tests                               // 单元测试 暂时无用
└── vue.config.js                       // 核心配置 webpack等
```
