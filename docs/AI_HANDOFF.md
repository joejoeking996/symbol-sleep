# SYMBOL 企业官网项目交接总览

更新时间：2026-07-02

本文给后续 AI / 开发者快速接手使用。当前项目是一个带后台运营能力的企业官网，前台服务品牌展示、产品展示、门店查询、询盘收集；后台用于运营人员通过拖拽式页面组件维护官网内容。

## 1. 项目定位

项目名称：`company-site`

品牌方向：SYMBOL / Symbol Bedding，偏海外企业官网视觉。设计参考是高端床垫品牌站，主要风格为：

- 白色 / 米白内容区
- Georgia 风格大标题
- 金色品牌点缀 `#C9A870`
- 深色科技或图片背景
- 图片蒙层在 Contact / Where to buy 中指定为 `#230D05`
- 页面要像运营官网，不像开发模板

核心要求：

- 首页、产品页、技术页、关于页、联系页、门店页都需要具备较高视觉质量。
- 除文章内容外，其它页面尽量通过后台拖拽组件搭建。
- 后台 UI 和组件缩略图要方便运营识别，不要出现模板化英文说明。
- 本地可调试，调试完成后再同步服务器。

## 2. 技术栈

前端：

- Next.js `16.2.6`
- React `19.2.6`
- TypeScript `5.7.3`
- Tailwind CSS 4 / 全局 CSS 混合使用
- lucide-react 图标
- Three.js 已安装，但当前真实产品爆炸图路线优先使用后台上传图片，不再强行生成假 3D

后端 / CMS：

- Payload CMS `3.85.1`
- `@payloadcms/next`
- `@payloadcms/db-sqlite`
- SQLite / libSQL，本地数据库文件：`company-site.db`
- GraphQL 和 REST API 由 Payload 提供

主要插件：

- SEO plugin
- Form Builder plugin
- Nested Docs plugin
- Redirects plugin
- Search plugin

构建与验证：

- ESLint
- Next build
- Playwright 配置存在，但目前主要用浏览器人工/自动截图验证

## 3. 关键路径

项目根目录：

```text
C:\Users\PINXIAO\Documents\Codex\2026-06-30\960\work\company-site
```

核心代码：

```text
src/payload.config.ts                         Payload 配置入口
src/collections/Pages/index.ts                页面集合，配置后台页面搭建 blocks
src/blocks/RenderBlocks.tsx                   前台根据 blockType 渲染组件
src/app/(frontend)/[slug]/page.tsx            普通页面路由
src/app/(frontend)/globals.css                多个定制页面模块样式
src/collections/Products.ts                   产品资料集合
src/collections/ProductRanges.ts              产品系列集合
src/collections/Inquiries.ts                  询盘集合
src/Header/Nav/index.tsx                      前台导航默认项
src/Footer/Component.tsx                      页脚默认项
scripts/seed-enterprise.ts                    企业站初始化/重置数据脚本
public/admin-blocks/                          后台 Add layout 组件缩略图
```

产品详情页：

```text
src/app/(frontend)/product/[slug]/page.tsx
src/app/(frontend)/product/[slug]/ProductDetailExperience.tsx
src/app/(frontend)/product/[slug]/page.scss
```

## 4. 已完成页面与模块

所有下列页面都已尽量同步为后台可维护组件。

### 首页

已有模块包括：

- `HomepageHero`
- `ProductRangeShowcase`
- `TechnologyPanel`
- `StoryVideoPanel`
- `InquiryForm`

首页数据主要在 `scripts/seed-enterprise.ts` 中维护。

### Product Range

产品分类/系列展示页已按参考图做过适配，需注意一行三个产品变两个产品时的响应式布局。

相关前台：

```text
src/app/(frontend)/product-range/[slug]/page.tsx
```

### 产品详情页 `/product/[slug]`

当前结构：

- 顶部产品大图，可 Zoom
- 下方左侧：真实产品爆炸结构图展示位
- 下方右侧：产品标题、正文、辅助说明、参数
- 爆炸图不再使用生成式假 3D，后台字段 `explodedImage` 用于上传真实平面爆炸图

后台产品字段重点：

- `detailHeroImage`
- `detailLead`
- `detailNoteTitle`
- `detailNote`
- `explodedImage`
- `specifications`

### About Us

新增后台模块：

```text
src/blocks/AboutStory
```

用途：

- 顶部大图
- 英雄标题/说明
- 双栏品牌故事正文
- 认证/背书/奖项内容区
- 每个内容区可选图片，并设置图片左/右/无图

已更新本地数据库 `/about-us` 页面。

### Technology

新增后台模块：

```text
src/blocks/TechnologyMaterials
```

结构：

- 顶部深色科技大图
- 中间大标题 + 描述
- 材料介绍区
- 顶部材料大分类 tabs
- 左侧材料列表
- 右侧材料描述 + 大图
- 材料区背景图，可自动叠白色蒙层

已更新本地数据库 `/technology` 页面。

### Contact Us

新增后台模块：

```text
src/blocks/ContactPage
```

结构：

- 全屏背景图
- 蒙层颜色：`#230D05`
- 左侧联系分组
- 右侧白色表单卡片
- 表单提交到现有 `/api/inquiries`

已更新本地数据库 `/contact-us` 页面。

### Where to buy

新增后台模块：

```text
src/blocks/WhereToBuy
```

结构：

- 顶部背景图
- 蒙层颜色：`#230D05`
- 搜索框
- 区域筛选
- 门店列表
- Google Maps iframe
- `View on Google Maps` 外链

地图实现：

- 不需要 Google Maps API Key
- 根据门店 `googleMapQuery` 或 `name + address` 生成：
  - embed URL：`https://www.google.com/maps?q=...&output=embed`
  - 外链：`https://www.google.com/maps/search/?api=1&query=...`

已创建本地数据库 `/where-to-buy` 页面，并已加入导航。

## 5. 后台运营方式

后台入口：

```text
http://localhost:3000/admin
```

当前曾重置过管理员账号：

```text
账号：admin
密码：suibao123
```

注意：该账号密码只适合本地/阶段性调试，生产上线前必须更换。

运营主要入口：

- 官网搭建 / 页面搭建：维护 Pages
- 产品管理：维护 Product Ranges、Products
- 内容运营：维护 Posts、Categories
- 客户线索：查看 Inquiries
- 站点内容：Media
- 系统设置：Users、Header、Footer

后台页面搭建：

- `Pages` 集合中的 `layout` 字段是 blocks 类型
- 新增页面模块时必须：
  1. 在 `src/blocks/<BlockName>/config.ts` 定义 Payload block
  2. 在 `src/blocks/<BlockName>/Component.tsx` 实现前台组件
  3. 在 `src/collections/Pages/index.ts` 引入并加入 `blocks` 列表
  4. 在 `src/blocks/RenderBlocks.tsx` 注册 blockType 到组件
  5. 在 `public/admin-blocks/` 补 SVG 缩略图
  6. 执行 `npm run generate:types`
  7. 执行 `npm run generate:importmap`
  8. 跑 `npm run lint` 和 `npm run build`

## 6. 近期重要决策

产品爆炸图：

- 用户有真实的平面爆炸图素材。
- 不要再用生成式假 3D 结构替代真实产品图。
- 未来如果要做更强交互，可基于真实图做热点/标注/缩放，而不是凭空生成层级说明。

页面设计：

- 不要用模板感强的通用卡片。
- 参考图优先，布局要贴近品牌官网。
- 后台配置项不能出现明显混乱的中英文混用。
- Add layout 需要缩略图，方便运营理解模块用途。

地图：

- Where to buy 使用 Google Maps 地址查询。
- 当前不用 API Key，避免上线前额外配置。
- 如未来需要真正门店定位、距离排序、地理编码，可再接入 Google Maps Places/Geocoding API。

## 7. 当前验证状态

最近完成后已跑过：

```bash
npm run generate:types
npm run generate:importmap
npm run lint
npm run build
```

`/contact-us`、`/where-to-buy`、`/technology`、`/about-us` 均经过本地浏览器验证。

当前媒体库基本为空，所以很多页面显示 fallback 背景。后台上传真实图片后会自动替换。

## 8. 后续建议

优先级建议：

1. 上传真实素材：首页、About、Technology、Contact、Where to buy、产品详情爆炸图。
2. 继续检查后台中文 labels，清除遗留乱码/中英文混用。
3. 完成 Product Range 与产品详情内容录入。
4. 给 Where to buy 增加真实门店数据。
5. 做移动端全站截图验收。
6. 准备生产部署配置，将 SQLite 方案评估为继续使用还是迁移 PostgreSQL。
7. 上线前替换管理员密码、Payload secret、Cron secret、Preview secret。

