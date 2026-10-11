# DeepFocus 品牌报告 v2.0 · Site

静态报告站点，六章内容、五项待核验案例、十三条 FAQ。

- 原稿：`source-report.md`（保留版本与案例数值）
- 网页审校稿：`site-content.md`（由生成器产生）
- 页面生成：`node build.mjs`，使用附带的 marked 17.0.5（MIT）
- 本地预览：`python3 -m http.server 8766 --directory dist`
- 可编辑样式和交互：`dist/assets/report.css`、`dist/assets/report.js`
- 当前交付目标：GitHub 私有仓库；页面文件位于 `dist/`
- 本地 Sites 项目标识保留在 `.openai/hosting.json`，不提交到 GitHub
- 未开启 GitHub Pages，也未替换 DeepFocus 官网

样式遵循《DeepFocus 品牌 UI 规范 v1.0》（2026-10-11）的当前紫色版本：品牌紫 #4F39F6、近白画布 #FBFBFB、圆角按钮及卡片。字体为本地 Space Grotesk、MiSans、Geist Mono，无外部字体请求。Logo 继承当前线条图形路径，图文净间距为可见图形宽度的 0.16。标识源文件注明为近似矢量；印刷及注册应另行复核。

案例资料保留待核验状态，不展示为已验证成绩。正文未使用韩国 App 月活数据推断网页曝光。网站中的时间段是源报告参考预期，不代表保证。

头图按指定 CLI 流程调用失败（本机 ChatGPT 账户不支持配置的 gpt-6.1-sol），按规范的失败例外交付无头图版本；未更改个人模型配置。
