export const es = {
  nav: {
    catalog: "Catalogo",
    community: "Comunidad",
    roadmap: "Ruta"
  },
  theme: {
    label: "Selector de tema",
    system: "Usar tema del sistema",
    light: "Usar tema claro",
    dark: "Usar tema oscuro"
  },
  language: {
    label: "Selector de idioma",
    en: "Ingles",
    es: "Espanol"
  },
  loader: {
    label: "Cargando PlaybookOps",
    text: "Preparando workflows reutilizables"
  },
  hero: {
    eyebrow: "Playbooks reutilizables para equipos que entregan con evidencia",
    title: "Haz que el trabajo de ingenieria sea repetible, revisable y listo para ejecutar.",
    body: "Un workspace practico para encontrar, adaptar y exportar playbooks de ingenieria para CloudOps, DevSecOps, SRE, backend, arquitectura y plataforma.",
    explore: "Explorar playbooks",
    contribute: "Contribuir",
    search: "Buscar Lambda, IAM, pagos, AGENTS.md..."
  },
  stats: {
    playbooks: "Playbooks",
    categories: "Categorias",
    agents: "Herramientas",
    validated: "Validados"
  },
  filters: {
    title: "Filtros",
    active: "activos",
    all: "Todos",
    search: "Buscar...",
    clear: "Limpiar filtro",
    empty: "No hay opciones",
    labels: {
      tool: "Herramienta",
      domain: "Dominio",
      category: "Categoria",
      difficulty: "Dificultad",
      risk_level: "Riesgo",
      execution_mode: "Modo",
      cloud: "Cloud",
      status: "Estado"
    }
  },
  catalog: {
    kicker: "Catalogo",
    singular: "playbook",
    plural: "playbooks",
    helperDefault: "Explora por dominio, herramienta, riesgo y modo operativo.",
    helperFiltered: "filtros aplicados.",
    helperFilteredOne: "filtro aplicado.",
    noFilters: "Sin filtros aplicados",
    densityLabel: "Densidad de tarjetas",
    comfortable: "Tarjetas comodas",
    compact: "Tarjetas compactas",
    resetFilters: "Limpiar filtros",
    emptyTitle: "No encontramos playbooks",
    emptyBody: "Prueba una busqueda mas amplia o limpia los filtros para volver al catalogo completo.",
    resetCatalog: "Reiniciar catalogo"
  },
  card: {
    risk: "Riesgo",
    mode: "Modo",
    version: "Version",
    services: "Servicios",
    noServices: "Sin servicios declarados"
  },
  detail: {
    summaryLabel: "Resumen del playbook",
    risk: "Riesgo",
    mode: "Modo",
    difficulty: "Dificultad",
    maturity: "Madurez",
    coverage: "Cobertura",
    services: "servicios",
    tools: "herramientas",
    copyPrompt: "Copiar prompt",
    copyAs: "Copiar para agente",
    copyKinds: {
      agents: "AGENTS.md",
      claude: "CLAUDE.md",
      kiroSteering: "Kiro Steering",
      kiroSpec: "Kiro Spec",
      cursor: "Regla Cursor",
      windsurf: "Regla Windsurf",
      copilot: "Copilot"
    },
    tabsLabel: "Secciones del detalle del playbook",
    words: "palabras",
    tabs: {
      overview: "Resumen",
      inputs: "Inputs",
      evidence: "Evidencia",
      contract: "Contrato",
      expected: "Salida esperada",
      prompt: "Prompt",
      scorecard: "Scorecard"
    },
    expected: {
      style: "Estilo de salida",
      sections: "Secciones esperadas",
      quality: "Chequeos de calidad"
    },
    execution: {
      title: "Playbook ejecutable",
      ready: "Prompt listo",
      structured: "Prompt estructurado para cualquier agente",
      helper: "Este playbook incluye un prompt estructurado, salida esperada, reglas de seguridad y exports especificos por agente.",
      viewPrompt: "Ver prompt",
      viewExpected: "Ver salida esperada",
      words: "Palabras del prompt",
      sections: "Secciones de salida",
      quality: "Chequeos de calidad"
    },
    sections: {
      when: "Cuando usarlo",
      tools: "Herramientas",
      inputVariables: "Variables de entrada",
      permissions: "Permisos requeridos",
      evidencePolicy: "Politica de evidencia",
      safetyRules: "Reglas de seguridad",
      outputContract: "Contrato de salida",
      expectedOutput: "Salida esperada",
      prompt: "Prompt",
      scorecard: "Scorecard"
    }
  },
  copy: {
    copied: "copiado al portapapeles"
  },
  community: {
    title: "Comunidad",
    first: "Agrega playbooks con redaccion original, alcance claro, reglas de evidencia, limites de seguridad y criterios de validacion.",
    second: "Mejora playbooks existentes ajustando permisos, agregando ejemplos y haciendo cada workflow mas facil de ejecutar.",
    third: "Agrega adapters o traducciones sin cambiar el contrato base del playbook."
  },
  roadmap: {
    title: "Ruta",
    items: [
      "Catalogo dinamico de playbooks",
      "UI bilingue",
      "Contenido original de PlaybookOps",
      "Adapters multi-herramienta",
      "Workflow de evaluacion",
      "Flujo de contribucion comunitaria"
    ]
  },
  footer: {
    text: "PlaybookOps ayuda a los equipos a organizar, revisar y exportar playbooks de ingenieria reutilizables.",
    credit: "Creado por Jeancarlos De la cruz C.",
    linkedin: "Jeancarlos De la cruz C. en LinkedIn"
  }
} as const;
