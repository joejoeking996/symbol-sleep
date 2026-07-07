# 本地开发、验证与部署说明

## 1. 本地开发

项目根目录：

```powershell
cd C:\Users\PINXIAO\Documents\Codex\2026-06-30\960\work\company-site
```

安装依赖通常已完成。启动开发服务：

```powershell
npm run dev
```

本地访问：

```text
前台：http://localhost:3000
后台：http://localhost:3000/admin
```

如果端口被旧进程占用，可清理本项目相关 Node 进程后重启：

```powershell
$workspace = "C:\Users\PINXIAO\Documents\Codex\2026-06-30\960\work\company-site"
$procs = Get-CimInstance Win32_Process | Where-Object { ($_.Name -match 'node|npm|npx') -and ($_.CommandLine -like '*company-site*') }
foreach ($p in $procs) { Stop-Process -Id $p.ProcessId -Force -ErrorAction SilentlyContinue }
Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm run dev > dev-server.log 2>&1" -WorkingDirectory $workspace -WindowStyle Hidden
```

## 2. 常用命令

生成 Payload 类型：

```powershell
npm run generate:types
```

生成 Payload import map：

```powershell
npm run generate:importmap
```

代码检查：

```powershell
npm run lint
```

生产构建：

```powershell
npm run build
```

启动生产服务：

```powershell
npm run start
```

## 3. 环境变量

本地 `.env` 当前使用 SQLite：

```text
DATABASE_URL=file:./company-site.db
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

上线前需要重点检查：

- `PAYLOAD_SECRET`
- `CRON_SECRET`
- `PREVIEW_SECRET`
- `NEXT_PUBLIC_SERVER_URL`
- 数据库连接

不要把生产密钥写入公开仓库。

## 4. 数据库

本地数据库：

```text
company-site.db
```

备份目录：

```text
db-backups/
```

当前使用 Payload SQLite adapter。若服务器规模较小，可以继续使用 SQLite；若需要多人频繁运营、更多数据量或更稳定部署，建议迁移 PostgreSQL。

## 5. 新增后台页面模块流程

新增模块示例：`src/blocks/ExampleBlock`

步骤：

1. 新增 `config.ts`
2. 新增 `Component.tsx`
3. 如果有交互，新增 `Component.client.tsx`
4. 新增后台缩略图 `public/admin-blocks/example.svg`
5. 在 `src/collections/Pages/index.ts` 注册 block config
6. 在 `src/blocks/RenderBlocks.tsx` 注册 React 组件
7. 如需种子数据，同步 `scripts/seed-enterprise.ts`
8. 执行：

```powershell
npm run generate:types
npm run generate:importmap
npm run lint
npm run build
```

## 6. 本地页面数据同步方式

多数页面内容可通过后台维护。

本项目曾多次直接用 SQLite 更新当前本地页面数据，目的是让用户马上刷新验收。长期建议以后台操作或 seed 脚本为准。

重要：如果改了 `scripts/seed-enterprise.ts`，只是更新了初始化脚本，不会自动更新当前数据库。当前数据库需要通过后台保存、seed 重跑或数据库脚本同步。

## 7. 部署思路

当前项目已包含：

- `Dockerfile`
- `docker-compose.yml`
- `DEPLOYMENT.md`
- `.env.production.example`
- `.deployignore`

推荐流程：

1. 本地开发并验证
2. `npm run lint`
3. `npm run build`
4. 整理 `.env.production`
5. 同步代码到服务器
6. 服务器安装依赖/构建
7. 启动 Next/Payload 服务
8. 配置反向代理和域名
9. 上传或迁移媒体文件
10. 备份数据库

如果部署到长期生产环境，建议优先确认：

- 数据库方案
- 媒体文件存储
- 后台账号安全
- 服务器自动重启方式
- 日志与备份策略

