# 本博客参考：https://github.com/lzxjack/react-blog，主要使用了前辈的UI设计，自己更换了一些库。（包括这篇MD也是参考前辈的）

> 这是个人博客系统的**博客展示页面**，**后台管理页面**仓库见<a href="https://github.com/dakuchazi/react-admin" target="_blank">「react-blog-admin」</a>。

Hi，这是我自己用 React 写的个人博客系统，欢迎大家`star`、`fork`，互相交流学习！💪💪

## 博客已于重构

> 终于把博客重构完上线了！😴

## 优化点

由于重构的博客同样也是基于`React`开发，功能、样式基本一致，这里就说说新版博客相比于旧版，有所改进的地方。

### 开发

- 使用`typescript`编写代码
- 使用`commitlint`保证`git commit`提交规范
- 使用`eslint`规范代码风格
- 使用`husky`在每次提交之前，触发`commitlint`与`eslint`
- 区分开发环境、生产环境，并抽离公共配置
- CSS 预处理器使用`scss`

### 代码逻辑

几乎重构了全部的逻辑代码，改进之处：

- 抽离了 10 余个公共组件，有效复用重复逻辑
- 使用`ahooks`提供的常见功能逻辑`hook`，避免闭包问题
  - `useRequest`异步数据管理
  - `useMount`
  - `useTitle`
  - `useToggle`
  - `useLocalStorageState`
  - `useSafeState`
  - `useUpdateEffect`
  - `useEventListener`
  - `useKeyPress`
  - ...
- 根据页面自动切换网页`title`
- 使用`classnames`拼接多个类名
- 使用`dayjs`代替`Moment.js`格式化时间
- 改用`echarts`绘制文章分布饼图
- 使用`markdown-navbar`生成文章目录锚点
- 评论模块中，对用户的输入内容进行过滤
- `react-router-dom`升级 6 版本
- 基于路由进行代码分割，打包生成多个`js`文件，按需加载
- 进入博客不再一次性获取全部数据，而是每个组件单独请求
- 首页文章卡片分页、文章页分页改为**后端分页**，只请求当前页的数据
- 搜索文章功能，改为发送请求后端搜索
- 评论组件
  - `emoji`表情功能支持点击复制，**有待改进**
  - 更改预览框、回复框出现位置，减少定位图层
  - 增加评论分页器
- 优化部分组件的样式
  - 小卡片触发`hover`的样式
  - 覆盖`antd`组件样式
  - 分类页改为双列展示
- 移除`animate.css`库，取消动画
- 正文移除字体「仓耳渔阳体」，改为浏览器内置字体
- 移动端适配采用动态`rem`方案
- 用到的图片资源，改用`webp`格式

### 新功能

新增的其实就一个：

- 新增主题切换功能，一键切换**黑**/**蓝**/**灰**三种主题，保存至`localStorage`，下次打开时自动切换至已选的主题

## 待优化

- 继续优化 webpack 打包后的体积，提升首屏加载速度
- 图片懒加载
- 尝试预渲染
- 改进添加`emoji`表情功能，点击即可插入表情

> 欢迎大家给出改进意见！

***



### 用到的技术/工具

🔖 博客主要使用到的技术如下：

**前端**（博客页面+后台管理）：

-   `React`脚手架`Create-React-App`
-   状态集中管理工具`Redux`
-   前端路由`React-Router`
-   `AntD`组件库
-   <a href="https://www.jinrishici.com/" target="_blank">今日诗词</a>提供首页的诗句
-   时间格式化工具<a href="http://momentjs.cn/" target="_blank">moment</a>
-   `markdown`格式渲染工具<a href="https://github.com/markedjs/marked" target="_blank">marked</a>
-   代码高亮渲染工具<a href="https://highlightjs.org/" target="_blank">highlight.js</a>
-   其他第三方包

**后端**：

- NestJs
- 腾讯云`CloudBase`

### 主要功能

#### 博客展示页面

-   首页预览所有文章
-   查看文章评论、发布评论、评论回复
-   搜索文章：根据关键字搜索、分类搜索、标签搜索
-   查看相册
-   查看说说
-   查看留言板留言、发布留言、留言回复
-   查看友链、访问友链
-   查看小作品
-   查看建站日志时间轴
-   查看关于本站/关于我
-   进入后台管理页面

#### 后台管理页面

**管理**是指：对数据的**增**、**删**、**改**、**查**。

-   首页预览博客基本数据（文章数、草稿数、友链数等），管理分类、标签
-   文章管理、草稿管理
-   相册管理
-   说说管理
-   查看留言、评论，删除留言、评论
-   友链管理
-   小作品管理
-   关于页面文字管理
-   建站日志管理

### 不断改进

由于时间有限、本人能力有限，博客系统还有很多不足之处，会在学习新知识的同时不断改进博客。

也请各路大佬多多指点 😆😆😆！