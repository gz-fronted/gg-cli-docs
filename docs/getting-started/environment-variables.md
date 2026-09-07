---
title: 环境变量
order: 9
toc: content
---

# 环境变量

不同命令通过 Vite mode 读取对应的 `.env.*` 文件。

| 目标环境 | 命令 | 环境文件 |
| --- | --- | --- |
| 本地开发 / 内网开发环境 | `npm run dev` / `npm run build:dev` | `.env.development` |
| SIT / 集成测试环境 | `npm run build:sit` | `.env.sit` |
| 生产环境 | `npm run build` | `.env.production` |

## 常用变量

- `VITE_API_BASE_URL`：后端 API 的基础地址或统一前缀。
- `VITE_API_SERVER`：前端应用部署完成后的完整访问地址，可能供主应用加载或运行配置使用。

<div className="gz-callout gz-callout-warning">
  <strong>注意端口</strong>
  <p>
    新应用必须把 <code>VITE_API_SERVER</code> 中的占位主机和端口替换为申请分配值，具体操作见<a href="/getting-started/deployment">部署</a>。
  </p>
</div>

## 注意事项

- 只有以 `VITE_` 开头的变量会暴露给客户端代码。
- 前端环境变量会进入构建产物，不能保存密码、Token 或其他密钥。
- 修改 `.env.*` 后需要重启开发服务，或重新构建并发布 `dist/`。
- 变量属于哪个环境由构建命令决定，不要在业务代码里手动判断域名。
