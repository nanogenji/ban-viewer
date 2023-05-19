## Introduction

本项目是基于Vue 开发的 Bangumi 第三方SPA

大部分功能已开发完成

Bangumi是一个提供书影音信息的站点（类似于豆瓣）

该项目用于练手，希望通过实践学习更多开发知识

感谢Bangumi的开源API项目



## Features

### 基本功能

- 每日剧集信息，条目、角色等详情

- 不限于关键词、标签、类别、日期搜索

- 夜间模式、移动端适配

- 查找播放源、内容翻译

- 用户登录、注册

- 排行榜、近期新作、热门标签、用户空间等

  

## Preview

### 在线预览

[banViewer](https://nanogenji.github.io/)

### 部分页面

![Snipaste_2023-05-12_20-00-13](https://github.com/nanogenji/ban-viewer/assets/81917638/08f62cbd-d534-4b69-b110-40e278501dbf)
![Snipaste_2023-05-12_20-03-12](https://github.com/nanogenji/ban-viewer/assets/81917638/249ef6f4-6e57-4e7d-a6b1-f912dd48a553)
![Snipaste_2023-05-12_20-00-37](https://github.com/nanogenji/ban-viewer/assets/81917638/964872c0-06f6-4100-82e6-ab4498a748cc)
![Snipaste_2023-05-12_20-02-53](https://github.com/nanogenji/ban-viewer/assets/81917638/014f716a-7277-4bbe-b81e-46096780b301)
![Snipaste_2023-05-12_22-52-27](https://github.com/nanogenji/ban-viewer/assets/81917638/93acd5e1-5368-4e9a-9502-9dd6284d7a5c)
![Snipaste_2023-05-12_20-01-31](https://github.com/nanogenji/ban-viewer/assets/81917638/dc7d65fe-5560-443d-af20-c174388b6068)
<img src='https://github.com/nanogenji/ban-viewer/assets/81917638/0bc191b1-0630-400e-8ea5-e3d74f256991' style="width:33%;"/><img src='https://github.com/nanogenji/ban-viewer/assets/81917638/d5b1e69c-4d14-4a2b-a614-39a529087251' style="width:33%;"/><img src='https://github.com/nanogenji/ban-viewer/assets/81917638/83b6f739-4e23-4451-b9d0-d53ed7e19d01' style="width:33%;"/>
![splice1](https://github.com/nanogenji/ban-viewer/assets/81917638/94e197c5-810a-4ce7-a62c-ea9a84972db1)
![splice3](https://github.com/nanogenji/ban-viewer/assets/81917638/ac673f1c-ecb9-4d91-b045-75c165bf41b6)
![splice2](https://github.com/nanogenji/ban-viewer/assets/81917638/7f1d5cf7-6df0-4722-8694-706ad82093af)

## Defect

已知bug：

- 部分冷门作品详情会重定向至相同系列的热门作 例id:162816
- 部分作品中出现配音演员数据丢失 id:407515
- 部分作品搜索结果出现评分或排名数据丢失 id:16165

经初步排查，均为api返回数据异常，暂无解决方法。

------

## Update

### v0.2

- 修复少数作品预览无图片导致的加载失败问题
- 新增加载中过场动画
- 新增追番人数 / 评分人数
- 新增查找版权播放源
- 改进 tag 等部分元素样式

### v0.3

- 新增夜间模式
- 重新设计ui，更统一和谐的视觉效果

### v0.4

- 自适应优化，适应更多不同尺寸设备显示
- 移动端适配，现在移动端也能正常浏览了

### v0.5

- 详情新增相关条目
- 优化ui：折叠、图片拉伸、元素对齐、失败处理等

## 免责声明

- 本项目所有数据信息来自各种网站，无法完全保证数据百分之百准确和完整。
- 本项目承诺不获取任何第三方用户信息。
- 本项目代码仅提供学习交流，不得用于商业用途，若侵权请联系。

## PowerBy

[Bangumi API](https://bangumi.github.io/api/)

[bangumi-onair](https://github.com/ekibot/bangumi-onair)

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
