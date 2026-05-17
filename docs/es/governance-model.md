# Modelo De Gobernanza

Cada playbook debe declarar:

- owner
- status
- version
- risk level
- execution mode
- permisos mínimos
- variables de entrada
- output contract
- evidence policy
- safety rules
- tags
- changelog

## Estados

- `draft`: propuesta o playbook inicial.
- `validated`: revisado y listo para uso comunitario.
- `deprecated`: obsoleto, inseguro o reemplazado.

## Niveles De Riesgo

- `low`: lectura o análisis de bajo impacto.
- `medium`: revisión operativa con impacto potencial en recomendaciones.
- `high`: seguridad, producción, identidad, pagos o infraestructura crítica.
- `critical`: alto impacto operativo o financiero.

## Modos De Ejecución

- `read-only`: no modifica sistemas.
- `write-proposal`: propone cambios sin ejecutarlos.
- `guarded-write`: permite cambios controlados con confirmación.
- `destructive-requires-approval`: acciones destructivas requieren aprobación explícita.

Las reglas de seguridad deben impedir mutaciones silenciosas en producción, acciones destructivas no aprobadas y evidencia inventada.

