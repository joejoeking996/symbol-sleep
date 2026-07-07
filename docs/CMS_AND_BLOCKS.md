# 后台 CMS 与页面模块说明

## 1. CMS 总体结构

后台基于 Payload CMS。

主要集合：

- `pages`：官网页面，使用拖拽 blocks 搭建
- `posts`：文章内容
- `categories`：文章分类
- `product-ranges`：产品系列
- `products`：产品资料
- `inquiries`：询盘线索
- `media`：媒体库
- `users`：后台用户

全局配置：

- `header`
- `footer`

## 2. 页面搭建 Blocks

注册位置：

```text
src/collections/Pages/index.ts
src/blocks/RenderBlocks.tsx
```

现有重点 blocks：

```text
AboutStory              关于我们故事页
ContactPage             联系我们页
HomepageHero            首页首屏
ProductRangeShowcase    首页产品系列展示
TechnologyMaterials     技术材料页
TechnologyPanel         首页/通用技术展示区
StoryVideoPanel         故事视频/关于入口
ImageTextPanel          通用图文区
InquiryForm             通用询盘表单
FeatureGrid             特点网格
FAQSection              FAQ
CallToAction            CTA
Content                 富文本内容
MediaBlock              媒体块
Archive                 文章归档
FormBlock               Payload 表单块
WhereToBuy              购买门店页
```

每个运营型 block 都应在 `public/admin-blocks/` 有缩略图。

## 3. 重点定制模块字段

### AboutStory

路径：

```text
src/blocks/AboutStory
```

字段：

- `heroImage`
- `heroHeading`
- `heroSubheading`
- `introLeft`
- `introRight`
- `sections`
  - `title`
  - `body`
  - `image`
  - `imagePosition`

用途：About Us 页面。

### TechnologyMaterials

路径：

```text
src/blocks/TechnologyMaterials
```

字段：

- `heroImage`
- `heroTitle`
- `heroSubtitle`
- `introHeading`
- `introBody`
- `materialBackgroundImage`
- `categories`
  - `title`
  - `materials`
    - `name`
    - `eyebrow`
    - `title`
    - `description`
    - `image`

用途：Technology 页面材料介绍。

### ContactPage

路径：

```text
src/blocks/ContactPage
```

字段：

- `backgroundImage`
- `heading`
- `submitLabel`
- `successMessage`
- `contacts`
  - `title`
  - `description`
  - `email`
  - `phone`

表单提交：

```text
POST /api/inquiries
```

用途：Contact Us 页面。

### WhereToBuy

路径：

```text
src/blocks/WhereToBuy
```

字段：

- `heroImage`
- `heading`
- `subheading`
- `searchPlaceholder`
- `note`
- `stores`
  - `name`
  - `address`
  - `phone`
  - `region`
  - `googleMapQuery`

地图：

- iframe embed 使用 Google Maps query
- 外链打开 Google Maps 搜索
- `googleMapQuery` 为空时自动使用 `name + address`

用途：Where to buy 页面。

## 4. 产品资料

路径：

```text
src/collections/Products.ts
```

重点字段：

- `name`
- `range`
- `comfortLevel`
- `mainImage`
- `detailHeroImage`
- `gallery`
- `shortDescription`
- `detailLead`
- `detailNoteTitle`
- `detailNote`
- `explodedImage`
- `explodedLayers` 旧字段仍存在，但当前路线优先使用真实 `explodedImage`
- `specifications`
- `description`
- `slug`

注意：

- 产品详情页不要自动生成假的爆炸图说明。
- 用户希望用真实爆炸图素材呈现。

## 5. 样式位置

目前一些大页面模块样式集中在：

```text
src/app/(frontend)/globals.css
```

产品详情页样式在：

```text
src/app/(frontend)/product/[slug]/page.scss
```

后续建议：

- 若模块继续增多，可将全局 CSS 里的模块样式拆分为更清晰的 CSS 文件。
- 但改动时要注意 Next/Tailwind 的引入方式，避免样式失效。

## 6. 后台中文与乱码问题

历史上有部分 label 在终端显示过乱码，但源文件内多数中文实际正常。后续若看到乱码，需要区分：

- 终端编码显示问题
- 源文件真实乱码
- Payload 后台 UI 中实际混用/错位

用户非常在意后台运营体验，后续继续优化后台时要优先检查：

- 左侧菜单是否清晰
- 当前选中项是否高亮明显
- 中英文是否统一
- Add layout 是否有缩略图
- 字段 label 是否面向运营，而不是开发术语

