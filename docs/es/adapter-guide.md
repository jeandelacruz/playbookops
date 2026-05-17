# Guia De Adapters

Los adapters convierten un playbook en formatos especificos para cada herramienta.

## Formatos Soportados

- `AGENTS.md` para Codex y asistentes de codigo.
- `CLAUDE.md` para Claude Code.
- Steering files y specs para Kiro.
- Reglas de workspace para Cursor.
- Reglas de workspace para Windsurf.
- Instrucciones para GitHub Copilot.

## Principio

El playbook es la fuente principal. Cada adapter debe preservar:

- objetivo
- contexto
- permisos
- evidencia requerida
- safety rules
- salida esperada
- output contract
- checklist de validacion

Los adapters son utiles cuando un equipo quiere colocar un playbook directamente dentro de un repositorio o workspace. Crean archivos de instrucciones; no ejecutan acciones operativas.

## Ejemplo

```bash
npm run generate:agents -- --playbook aws-lambda-cost-security-review
npm run generate:kiro-spec -- --playbook aws-lambda-cost-security-review
```
