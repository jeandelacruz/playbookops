# Modelo De Validación

La validación ocurre en tres niveles:

- Schema: campos requeridos, enums y estructura.
- Gobernanza: permisos, evidencia, safety rules, owner, status, version y tags.
- Comportamiento: ejecución de ejemplo o comparación contra golden output.

Antes de abrir un PR:

```bash
npm run validate:catalog
```

