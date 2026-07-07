# SYMBOL Enterprise Website Delivery Notes

## Current Scope

This project is a Next.js + Payload CMS enterprise website prototype for SYMBOL.

- Frontend: responsive company website with homepage blocks, product range pages, product detail pages, contact page, and inquiry form.
- Backend: Payload admin panel with branded UI, username login, role-based access, content collections, product collections, inquiries, and drag-sort page blocks.
- Page builder: Pages can be assembled from reusable blocks. Article content remains editor-focused through Posts.

## Local Development

```bash
npm install
npm run dev
```

Open:

- Website: http://localhost:3000
- Admin: http://localhost:3000/admin

Default local admin:

- Username: `admin`
- Password: `suibao123`

Change this account before any external deployment.

## Validation

```bash
npm run generate:types
npm run generate:importmap
npm run lint
npm run build
```

`npm run build` is the main production gate because it checks the Next.js and TypeScript integration.

On Windows, run the combined local check script:

```powershell
.\scripts\local-check.ps1
```

For a faster check during active UI editing:

```powershell
.\scripts\local-check.ps1 -SkipBuild
```

## Local Debug To Server Build Workflow

Recommended daily workflow:

1. Debug locally at `http://localhost:3000`.
2. Run `.\scripts\local-check.ps1` before syncing.
3. Sync source files to the server, excluding `.deployignore` entries.
4. On the server, run `sh scripts/server-build.sh`.
5. Restart the server process after a successful build.

Create a source package from Windows:

```powershell
.\scripts\export-release.ps1
```

The package is written to:

```text
outputs\releases\
```

Example server commands after uploading and extracting the package:

```bash
cp .env.production .env
sh scripts/server-build.sh
npm run start
```

If using a process manager such as PM2:

```bash
pm2 restart company-site
```

If syncing with `rsync` from a Linux/macOS machine or WSL, use:

```bash
rsync -avz --delete --exclude-from=.deployignore ./ user@server:/var/www/company-site/
```

For native Windows servers, upload the generated zip package, extract it into the target release directory, then run the server build script in that directory.

## Environment

Copy `.env.example` to `.env` and replace every secret.

Important variables:

- `DATABASE_URL`: local prototype uses `file:./company-site.db`.
- `PAYLOAD_SECRET`: JWT encryption secret.
- `NEXT_PUBLIC_SERVER_URL`: canonical public URL without a trailing slash.
- `CRON_SECRET`: scheduled task secret.
- `PREVIEW_SECRET`: draft preview secret.

## Production Checklist

Before launch:

1. Switch from local SQLite to PostgreSQL or another managed production database.
2. Set `push: false` in `src/payload.config.ts` and manage schema changes through migrations.
3. Replace all secrets in `.env`.
4. Reset the administrator password and create named accounts for real editors.
5. Configure email sending for operational notifications and password recovery.
6. Decide where media files should live: local disk is fine for prototype, object storage/CDN is better for production.
7. Put the site behind HTTPS and set `NEXT_PUBLIC_SERVER_URL` to the real domain.
8. Review form spam protection before opening inquiry forms publicly.

## Content Operations

- Pages: use `页面组件` to add, drag, sort, collapse, and reuse homepage/product/story/form sections.
- Posts: use for articles and news publishing.
- Product Ranges: manage top-level product families like SYMBOL and BellaRest.
- Products: manage individual mattresses and bind them to a product range.
- Inquiries: contact form submissions are read from the admin panel.
- Header/Footer: edit navigation and footer links through globals.

## Known Prototype Notes

- SQLite schema sync uses Payload `push: true` for fast iteration. This should not remain enabled for production.
- The ESLint config is intentionally lightweight to avoid a current ESLint 9 / Next flat-config compatibility issue in the template. Keep `npm run build` as the strict release check.
- The current visual design follows the provided reference image and is ready for content replacement with real brand assets.
