# gz-cli 文档站

`gz-cli` 的安装、命令、项目模板与配套工具使用文档。

## 本地开发

环境要求：Node.js 22.19.0 或更高版本。

```bash
npm install
npm run dev
```

## 内外网构建

| 环境 | 命令 | 产物目录 |
| --- | --- | --- |
| 公网 | `npm run build` | `dist/` |
| 内网 | `npm run build:internal` | `dist-internal/` |

内外网的差异集中在 `config/environments.json`。当前 `externalLinks.gzUiWeb` 分别指向公网与内网组件文档，导航和正文链接共用该配置。后续其他差异链接也加入 `externalLinks`，正文通过 `<ExternalDocLink name="链接配置名" />` 引用。

构建时只将当前环境的链接写入产物；部署时选择对应目录。

### 路径前缀和站点 Origin

`DOCS_BASE`、`DOCS_ORIGIN` 对两种构建都有效。部署在二级路径时，例如：

```powershell
$env:DOCS_BASE='/frontend-docs/'
npm run build:internal
```

Linux/macOS：

```bash
DOCS_BASE=/frontend-docs/ npm run build:internal
```

需要完整分享预览图地址时设置 `DOCS_ORIGIN`：

```powershell
$env:DOCS_ORIGIN='https://your-docs-domain.example'
npm run build
```

### 本地预览

```bash
npm run preview
npm run preview:internal
```

分别预览 `dist/` 和 `dist-internal/`；默认端口为 `8000`，可通过 `PORT` 指定。

## 内容更新策略

本站不自动同步各工具仓库。发生重要功能或大版本变化后，维护者根据源代码和发行说明手动更新并重新发布。

gz-pc 更新并完成 micro-app 适配后，按 [文档维护流程](docs/maintenance.md) 核对版本、同步示例并构建发布，同时在 [更新日志](docs/changelog.md) 简要记录功能变化和接入说明。
