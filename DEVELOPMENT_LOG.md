# Development Log / 开发记录

## 2026-08-27 — Static blog recovery and first release / 静态博客恢复与首次发布

### Goal / 目标

Restore the retired personal blog as a serverless, GitHub-hosted technical blog
and portfolio. The first release should focus on writing and project notes, with
no database, login system, paid server, or custom domain required.

将已下线的个人博客恢复为部署在 GitHub 上、无需服务器的技术博客和作品集。首个版本聚焦文章与项目笔记，不需要数据库、登录系统、付费服务器或自定义域名。

### Discovery and direction / 现状与方向

- The legacy `blog/vue_blog` project was a Vue 2 SPA, not a Hexo site.
  旧项目 `blog/vue_blog` 是 Vue 2 单页应用，而不是 Hexo 博客。
- Its article bodies were not present in the repository. Recovering them would
  require an old database, backup, cache, or web archive.
  仓库中没有旧文章正文；如需恢复，需要寻找旧数据库、备份、缓存或网页存档。
- The visual direction takes inspiration from `zephyrlin.me`: a dark,
  developer-focused homepage with subtle gradients, rounded cards, and writing
  as the centre of the site.
  视觉方向参考 `zephyrlin.me`：深色调、偏开发者风格，以克制的渐变、圆角卡片和文章内容为核心。
- AstroPaper was considered but rejected because its visual style was not a fit.
  曾考虑 AstroPaper，但其视觉风格不符合预期，因此未采用。

### Implementation / 实现内容

- Initialized `personal-site` from a visual starter and converted it to a
  static Next.js export.
  基于视觉模板初始化 `personal-site`，并改造为 Next.js 静态导出项目。
- Removed dynamic and third-party product features, including authentication,
  database/CMS integration, Spotify, analytics, and server actions.
  移除了登录、数据库/CMS 集成、Spotify、分析服务与服务端操作等动态及第三方功能。
- Added local MDX content under `content/blog/` and static pages for Home,
  Blog, Projects, and About.
  在 `content/blog/` 下加入本地 MDX 内容，并提供首页、博客、项目和关于页面。
- Added `.github/workflows/deploy.yml` to build `out/` and deploy it with
  GitHub Pages on every push to `main`.
  新增 `.github/workflows/deploy.yml`：每次推送到 `main` 时，构建 `out/` 并自动发布至 GitHub Pages。
- Created the public repository `bibi45c/bibi45c.github.io` and enabled
  GitHub Actions as its Pages deployment source.
  创建公开仓库 `bibi45c/bibi45c.github.io`，并将 GitHub Actions 设为 Pages 发布来源。

### Public identity and assets / 公开身份与资源

- Replaced public uses of the real name with `bibi45` in site metadata,
  navigation, page copy, footer, and article front matter.
  将站点元信息、导航、页面文案、页脚和文章 front matter 中的公开姓名统一替换为 `bibi45`。
- Added the selected public profile asset:
  `public/avatar-black-shirt-wide-shoulders-v1.png`.
  加入选定的公开头像资源：`public/avatar-black-shirt-wide-shoulders-v1.png`。
- Updated the navigation avatar to use that image with circular cropping and
  the existing homepage scale animation.
  导航栏头像已使用该图片，以圆形裁切展示，并保留首页的放大动效。

### Verification / 验证结果

- `npm run build` completed successfully after the static conversion and after
  the avatar update.
  静态化改造及头像更新后，`npm run build` 均成功完成。
- GitHub Actions successfully built and deployed the site.
  GitHub Actions 已成功构建并发布网站。
- The published site responded with HTTP 200 at `https://bibi45c.github.io/`.
  已发布的网站 `https://bibi45c.github.io/` 返回 HTTP 200。

### Next work / 后续工作

- Replace placeholder Home, About, and Projects copy with public-ready content.
  将首页、About 和 Projects 中的占位文案替换为可公开展示的内容。
- Add technical notes as MDX files in `content/blog/`.
  持续在 `content/blog/` 下新增 MDX 技术笔记。
- Recover legacy articles only if an old data source or archive becomes
  available.
  仅在找到旧数据源或网页存档后，再恢复历史文章。
- Decide later whether to attach a custom domain; GitHub Pages is sufficient
  until then.
  之后再决定是否绑定自定义域名；当前 GitHub Pages 已足够使用。
