# Guia De Autoria De Playbooks

Un playbook debe ser un flujo de ingenieria claro, no solo un prompt.

## Estructura Recomendada

- Define el objetivo.
- Explica cuando usarlo.
- Declara variables de entrada.
- Declara permisos minimos.
- Define una politica de evidencia.
- Define limites de seguridad.
- Describe la salida esperada.
- Especifica el contrato de salida.
- Agrega criterios de validacion.
- Agrega scorecard y changelog.

## Reglas

- Crear un JSON bajo `playbooks/{domain}/{playbook-id}.json`.
- El catalogo se carga desde `playbooks/**/*.json`.
- Usar titulos, resumenes, descripciones y prompts con redaccion original.
- No copiar contenido desde colecciones externas; preservar la intencion operativa solo si se mejora la estructura, evidencia, seguridad y valor de decision.
- No inventar evidencia.
- No inferir produccion por nombres.
- No ejecutar cambios destructivos sin confirmacion explicita.
- Reportar limitaciones, APIs fallidas y datos incompletos.
- Separar hallazgos verificados de hipotesis y recomendaciones.

## Traducciones De UI

Si agregas o cambias texto visible en la plataforma, actualiza ambos archivos:

- `site/prompt-explorer/src/i18n/en.ts`
- `site/prompt-explorer/src/i18n/es.ts`

Los playbooks permanecen en ingles por defecto hasta que se agregue soporte para variantes traducidas.
