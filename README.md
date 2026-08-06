# gg-cli 文档站

`gg-cli` 的安装、命令、项目模板与配套工具使用文档。

## 本地开发

环境要求：Node.js 22.19.0 或更高版本。

```bash
pnpm install
pnpm dev
```

## 构建

部署在域名根路径：

```bash
pnpm build
```

部署在 `/frontend-docs/` 等二级路径时，构建前设置 `DOCS_BASE`：

```powershell
$env:DOCS_BASE='/frontend-docs/'
pnpm build
```

Linux/macOS：

```bash
DOCS_BASE=/frontend-docs/ pnpm build
```

正式公网构建建议同时提供站点 Origin，以生成完整的分享预览图地址：

```bash
DOCS_ORIGIN=https://your-docs-domain.example pnpm build
```

构建产物位于 `dist`，同一代码库可以分别部署到公网和内网。

## 内容更新策略

本站不自动同步各工具仓库。发生重要功能或大版本变化后，维护者根据源代码和发行说明手动更新并重新发布。
