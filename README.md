# Jiayu Jiang — Personal Site

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

## Credits

The visual foundation began from [eurooooo/zephyrlin.me](https://github.com/eurooooo/zephyrlin.me), used under its included MIT License. This repository retains that license and has been simplified for static GitHub Pages hosting.
