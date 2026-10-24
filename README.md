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

## Languages

English is the default at `/`. Chinese pages use `/zh/`, including `/zh/blog/`,
`/zh/project/` and `/zh/about/`. The header language button opens the matching
page in the other language and preserves the article slug, query string and hash.
Navigation stays in the selected language. There is no browser-language redirect.

Both editions are exported as static HTML with their own document language,
canonical URL and language alternatives. English routes live in `app/(en)/`;
Chinese routes live in `app/zh/`. Shared page components are in `components/pages/`
and interface copy is in `lib/i18n.js`.

Original articles stay in `content/blog/`. Add a translated title, summary and
body in `content/translations/en/<slug>.mdx` or `content/translations/zh/<slug>.mdx`.
The original supplies author, date and category. A missing translation displays
the original with its language badge and an explanatory notice; it is not marked
as a translated edition. Original article language can be set with `language: en`
or `language: zh` in frontmatter; older posts infer it from their title and body.

Validate locale routes and article fallback with `node scripts/check-bilingual.mjs`;
after building, use `node scripts/check-bilingual.mjs --export` to check all static
pages, language links and translated article bodies.

## Deployment

1. Create a GitHub repository and push this project to its `main` branch.
2. In the repository's Pages settings, select **GitHub Actions** as the publishing source.
3. Push to `main`; the workflow at `.github/workflows/deploy.yml` will publish the generated `out/` folder.
4. The production custom domain is `juiceless.cn`, configured in GitHub Pages settings with HTTPS enforced. Cloudflare provides DNS and proxies web traffic on the Free plan with Full (strict) TLS.

## Interactive architecture

The Projects page links to the Hex Tactics Archify viewers:

- Chinese: https://juiceless.cn/architecture/hex-tactics/
- English: https://juiceless.cn/architecture/hex-tactics/en.html

These self-contained HTML files are published from `public/architecture/hex-tactics/` without modifying their accepted upstream bytes. Editable JSON and source evidence remain in [the game repository](https://github.com/bibi45c/UEA-CMP-SEM2-GAME-Turn_Based_Strategy); `provenance.json` records the delivery commit, architecture evidence commit and file hashes. Do not hand-edit the generated viewers. To refresh them, validate and deliver in the game repository, copy the accepted HTML/preview files here and update the provenance hashes. Run `node scripts/check-architecture-bundle.mjs`, build, then run it again with `--export` before publishing.

The older `/UEA-CMP-SEM2-GAME-Turn_Based_Strategy/` and `/UEA-CMP-SEM2-GAME-Turn_Based_Strategy/en.html` paths redirect to these blog-hosted viewers, keeping existing game README links usable. No separate game-repository Pages site or DNS change is needed. If a separate game Pages site is enabled later, it may take precedence over those compatibility paths; use the canonical architecture URLs above.

## Visit counts

The homepage's **Read next / 接着读** card sits beside the introduction on desktop
and below it on smaller screens. It recommends the two most-read articles and
one random article from the remaining catalog. **Another one / 换一篇** changes
only the random article and avoids immediately repeating it when another is
available. The current random pick survives language changes within the same
browser tab.

`npm run build` refreshes `data/article-popularity.json` from the public
GoatCounter counters before exporting. Counts from `/blog/<slug>` and
`/zh/blog/<slug>` are added together, without trailing slashes. Requests are
throttled and no API key or browser-side catalog-wide polling is needed.
The published ranking updates on each build; GoatCounter's counters can
themselves lag visits by up to four hours. Equal counts are ordered by newest
article, then slug.

An incomplete refresh retains the last complete snapshot. Unknown values are
never replaced with zero. If the snapshot does not cover the current catalog,
or belongs to a different configured site, the card labels its first two entries
as **Recent posts / 近期文章** until a complete refresh is available.
Run `node scripts/check-recommendations.mjs`, and after building add `--export`,
to verify the ranking, fallback, random exclusions and exported card.

The site uses GoatCounter for per-post counts and the site total. Create a GoatCounter
site, then add its site code (the part before `.goatcounter.com`) as the GitHub
Actions repository variable `GOATCOUNTER_CODE` under **Settings → Secrets and
variables → Actions → Variables**. Redeploy the site after setting the variable.

In GoatCounter, enable **Allow adding visitor counts on your website** and disable
**Sessions** in site settings. This integration counts each page load or client-side navigation as a
pageview, including reloads. The site total sums views across pages.
Article tracking and counter lookups both use paths without a trailing slash,
matching the paths stored by GoatCounter.
Public counters may lag behind new visits by up to four hours, including cached
zero counts during initial setup. Unvisited posts show zero; when the code is not
configured or the service response is unavailable, the site leaves the number hidden.

The tracker is served locally as `public/goatcounter.js` to avoid relying on
the external script CDN. It is an unmodified copy from GoatCounter v2.7.0
([official source](https://github.com/arp242/goatcounter/blob/v2.7.0/public/count.js),
Git blob `b40052dc29f58fba1dd4b90efedf2934c65e7bf0`), with its ISC license header retained.
Update this file explicitly when upgrading the tracker.

For local testing, set `NEXT_PUBLIC_GOATCOUNTER_CODE` in `.env.local` and run
`npm run dev`. GoatCounter ignores localhost visits by default.

## Credits

The visual foundation began from [eurooooo/zephyrlin.me](https://github.com/eurooooo/zephyrlin.me), used under its included MIT License. This repository retains that license and has been simplified for static GitHub Pages hosting.
