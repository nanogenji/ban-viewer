## Introduction

本项目是基于Vue + element-ui 开发的 Bangumi 第三方SPA

大部分功能已开发完成

Bangumi是一个提供书影音信息的站点（类似于豆瓣）

本人开发经验不足，该项目用于练手，希望通过开发学习更多

感谢Bangumi的开源API项目



## Features

### 基本功能

- 每日剧集信息
- 条目、角色详情
- 不限于关键词、标签、类别、日期搜索
- 用户登录、注册
- 不限于排行榜、近期新作、用户空间、热门标签等

## Preview

### 在线预览

[banViewer](https://nanogenji.github.io/)

### 部分页面

![Snipaste_2023-03-21_22-07-21](https://user-images.githubusercontent.com/81917638/226647930-8b634524-0ea9-4778-b278-b01efd861dfd.jpg)

![Snipaste_2023-03-21_22-07-40](https://user-images.githubusercontent.com/81917638/226648033-76ce4474-539d-4d20-90c3-9a72bcd80132.jpg)

![Snipaste_2023-03-21_22-09-23](https://user-images.githubusercontent.com/81917638/226648120-918deb23-e6a2-4966-9b4c-f172719919f6.jpg)

<!-- ![Snipaste_2023-03-21_22-08-14](https://user-images.githubusercontent.com/81917638/226648629-952ed41a-240e-471e-a696-a7094f31c550.jpg) -->
<img src="https://user-images.githubusercontent.com/81917638/226648629-952ed41a-240e-471e-a696-a7094f31c550.jpg" style="width:33%;" /><img src="https://user-images.githubusercontent.com/81917638/226648851-f82b65f8-af1b-40ca-8147-0fd054856661.jpg" style="width:33%;" /><img src="https://user-images.githubusercontent.com/81917638/226648940-f19b2d6d-7ee6-4085-9ed8-a8af224854ec.jpg" style="width:33%;" />

## Defect

已知bug：

- 部分冷门作品详情会重定向至相同系列的热门作 例id:162816
- 部分作品中出现配音演员数据丢失 id:407515
- 部分作品搜索结果出现评分或排名数据丢失 id:16165

经初步排查，原因均为api返回数据异常，暂无解决方法。

------

**本项目注册仅为实验功能，为了保证您的信息安全，请勿填入常用或重要信息**

## 免责声明

- 本项目所有数据信息来自各种网站，无法完全保证数据百分之百准确和完整。
- 本项目承诺不获取任何第三方用户信息。
- 本项目代码仅提供学习交流，不得用于商业用途，若侵权请联系。

## PowerBy

[Bangumi API](https://bangumi.github.io/api/)

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```
