---
title: 部署
order: 10
toc: content
---

# 部署

部署前先确认目标环境，再执行对应构建命令。

| 目标环境 | 构建命令 | 发布内容 |
| --- | --- | --- |
| 内网开发环境 | `npm run build:dev` | `dist/` |
| SIT / 集成测试环境 | `npm run build:sit` | `dist/` |
| 生产环境 | `npm run build` | `dist/` |

<div className="gz-callout gz-callout-warning">
  <strong>新应用部署前必改</strong>
  <p>
    模板中的 <code>VITE_API_SERVER</code> 使用占位地址和端口。申请到正式部署信息后，必须将对应环境文件改为实际分配值，不能直接沿用模板配置，也不要自行猜测。
  </p>
</div>

## 配置申请端口

`VITE_API_SERVER` 表示当前**前端应用部署到 Nginx 后的完整访问地址**，不是后端接口地址。后端 API 的基础地址或统一前缀由 `VITE_API_BASE_URL` 配置。

新应用拿到申请分配的端口后，修改对应环境文件：

```dotenv
# .env.development
VITE_API_SERVER=http://<DEV_HOST>:<PORT>/

# .env.sit
VITE_API_SERVER=http://<SIT_HOST>:<PORT>/
```

- `DEV_HOST`、`SIT_HOST` 和 `PORT` 均以部署申请结果为准，公网文档不记录公司内网地址。
- 将模板中的占位主机和端口替换为实际分配值；如部署负责人另有说明，以实际部署信息为准。
- 开发环境和 SIT 环境可能使用相同端口，但仍应以申请结果为准。
- 必须在执行对应环境的构建命令**之前**完成修改。已经生成的 `dist/` 不会因环境文件后续变化而自动更新。

## 推荐流程

```text
申请并确认应用端口
  → 选择目标环境
  → 修改对应 .env.* 中的 VITE_API_SERVER
  → 执行构建命令
  → 发布完整 dist/
  → 验证首页、子路由和接口地址
```

## 部署检查

- 确认 `VITE_API_SERVER` 中的占位主机和端口已替换为申请分配值。
- 确认修改的是本次构建所读取的 `.env.*` 文件。
- 不要把 `npm run dev` 当作服务器部署方式。
- 确认流水线执行的命令与目标环境一致。
- 发布本次构建生成的完整 `dist/`，不要只覆盖部分文件。
- SPA 应配置路由回退，让刷新子路由时返回 `index.html`。
- 二级路径部署需要同时确认构建 base、路由 basename 和微应用激活路径。
- 发布后请求地址错误时，先检查构建命令和对应 `.env.*`，然后重新构建。

`main-app` 的环境脚本可能与 `micro-app` 不同，始终以项目当前 `package.json` 为准。
