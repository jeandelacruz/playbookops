# Guía De Deprecación

Depreca un playbook cuando sea inseguro, obsoleto, duplicado, reemplazado o dependa de APIs no soportadas.

Cambios requeridos:

- Cambiar `status` a `deprecated`.
- Añadir entrada en `changelog`.
- Explicar razón y reemplazo si existe.
- Mantener el playbook hasta un corte mayor salvo que represente un riesgo de seguridad.

