# Primeros Pasos

Instala dependencias, levanta el explorador y valida el catálogo:

```bash
npm install
npm run dev
npm run validate:catalog
```

La aplicación web vive en `site/prompt-explorer` y carga los playbooks directamente desde `playbooks/**/*.json`.

## Build Local

```bash
npm run build
npm run preview
```

El build estático queda en `dist/site`.

## GitHub Pages

El proyecto incluye `.github/workflows/deploy-pages.yml`. En GitHub configura `Settings > Pages > Build and deployment` como `GitHub Actions`.

## Generación De Adapters

Usa los scripts `generate:*` con un `playbook id`:

```bash
npm run generate:agents -- --playbook aws-lambda-cost-security-review
npm run generate:claude -- --playbook aws-lambda-cost-security-review
```
