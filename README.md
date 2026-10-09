# Wentao Tang — Portfolio

静态网站，没有构建步骤。页面：`index.html`（Home）、`work.html`、`about.html`；共用 `styles.css`、`main.js`，首页脚本 `home.js`，图片在 `assets/`。

## 上线前要替换的占位
在 `index.html` 里搜索这些词：
- `[YOUR EMAIL]`、LinkedIn、`Resume (PDF)` / `View Resume` 的链接（目前是 `#`）
- `[ROLE · YEARS]`（Tencent / TikTok / Kuaishou）
- `View Case Study` 目前跳回 `#work`，案例页做好后改成对应页面地址

## 免费上线
**GitHub Pages**：新建公开仓库 → 上传这个文件夹里的全部文件（`.nojekyll` 也要）→ Settings → Pages → Branch 选 main / root → 保存。几分钟后访问 `https://用户名.github.io/仓库名/`。

**Cloudflare Pages / Netlify**：登录后把整个文件夹拖进去即可，也可以连接 GitHub 仓库自动更新。

网页字体（Bebas Neue / Outfit / Architects Daughter）从 Google Fonts 加载，需要联网。
