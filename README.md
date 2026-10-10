# bibi45 — Personal Site

A static personal website for technical writing, project case studies, and CV material.

## Hosting model

- Content lives in local MDX files under `content/blog`.
- `next build` creates static files in `out/`.
- GitHub Actions publishes `out/` to GitHub Pages on every push to `main`.
- No database, login system, API server, or CMS is required.

## Local development

```bash
npm install
npm run dev
```

## Deployment

1. Create a GitHub repository and push this project to its `main` branch.
2. In the repository's Pages settings, select **GitHub Actions** as the publishing source.
3. Push to `main`; the workflow at `.github/workflows/deploy.yml` will publish the generated `out/` folder.
4. Add a custom domain later in GitHub Pages settings when the domain is ready.

## Visit counts

The site uses GoatCounter for per-post counts and the site total. Create a GoatCounter
site, then add its site code (the part before `.goatcounter.com`) as the GitHub
Actions repository variable `GOATCOUNTER_CODE` under **Settings → Secrets and
variables → Actions → Variables**. Redeploy the site after setting the variable.

In GoatCounter, enable **Allow adding visitor counts on your website** in site
settings. This integration counts each page load or client-side navigation as a
pageview, including reloads. The site total sums views across pages.
Public counters may lag behind new visits by up to four hours. When the code is
not configured or a count is unavailable, the site leaves the number hidden.

For local testing, set `NEXT_PUBLIC_GOATCOUNTER_CODE` in `.env.local` and run
`npm run dev`. GoatCounter ignores localhost visits by default.

## Credits

The visual foundation began from [eurooooo/zephyrlin.me](https://github.com/eurooooo/zephyrlin.me), used under its included MIT License. This repository retains that license and has been simplified for static GitHub Pages hosting.
