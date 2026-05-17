# PlaybookOps

Playbooks reutilizables para equipos que entregan con evidencia.

PlaybookOps convierte conocimiento de ingenieria en playbooks reutilizables para Codex, Claude Code, Kiro, Cursor, Windsurf, GitHub Copilot, Gemini CLI, Aider y futuras herramientas.

## Por Que Existe

Muchas librerias de prompts son utiles, pero los equipos necesitan algo mas que snippets sueltos. Un buen playbook debe definir alcance, permisos requeridos, evidencia, secciones de salida, salida esperada, limites de seguridad, adapters y criterios de revision.

## Que Incluye

- Catalogo de playbooks para CloudOps, DevSecOps, Backend, Arquitectura, Agent Context, Payments y FinOps.
- Carga dinamica desde `playbooks/**/*.json`.
- JSON Schema para playbooks, adapters y scorecards.
- Explorador web con React + Vite.
- Herramientas TypeScript para validacion y generacion de adapters.
- Documentacion de comunidad, seguridad, contribucion y evaluacion.

## Ejecucion Local

```bash
npm install
npm run dev
npm run validate:catalog
```

## Build

```bash
npm run build
npm run preview
```

El sitio estatico se genera en `dist/site`.

## Generar Adapters

Los adapters convierten un playbook en archivos de instrucciones especificos para cada herramienta. Sirven cuando quieres llevar un playbook a un repositorio o workspace como `AGENTS.md`, `CLAUDE.md`, archivos steering/spec de Kiro, reglas de Cursor, reglas de Windsurf o instrucciones de GitHub Copilot.

No modifican recursos cloud ni ejecutan el playbook. Solo crean archivos de instrucciones a partir del playbook seleccionado. Cada adapter tiene estructura y buenas practicas propias para su herramienta.

```bash
npm run generate:agents -- --playbook aws-lambda-cost-security-review
npm run generate:claude -- --playbook aws-lambda-cost-security-review
npm run generate:kiro-steering -- --playbook aws-lambda-cost-security-review
npm run generate:kiro-spec -- --playbook aws-lambda-cost-security-review
npm run generate:cursor -- --playbook aws-lambda-cost-security-review
npm run generate:windsurf -- --playbook aws-lambda-cost-security-review
npm run generate:copilot -- --playbook aws-lambda-cost-security-review
```

## Documentacion

- Ingles: [docs/README.md](docs/README.md)
- Espanol: [docs/es/README.md](docs/es/README.md)

## Traducciones De La UI

La plataforma soporta ingles y espanol. Cualquier texto nuevo de la interfaz debe agregarse en `site/prompt-explorer/src/i18n/en.ts` y `site/prompt-explorer/src/i18n/es.ts`.

## Originalidad Del Contenido

Los playbooks deben tener titulos, resumenes, descripciones, salida esperada y prompts con redaccion original. Se puede conservar la intencion operativa de un workflow, pero se debe mejorar la estructura, evidencia, seguridad y valor de decision.

## Licencia

MIT.

## Creditos

Hecho por [Jeancarlos De la cruz C.](https://www.linkedin.com/in/jeancarlosdelacruz/).
