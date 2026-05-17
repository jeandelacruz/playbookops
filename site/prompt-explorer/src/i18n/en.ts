export const en = {
  nav: {
    catalog: "Catalog",
    community: "Community",
    roadmap: "Roadmap"
  },
  theme: {
    label: "Theme selector",
    system: "Use system theme",
    light: "Use light theme",
    dark: "Use dark theme"
  },
  language: {
    label: "Language selector",
    en: "English",
    es: "Spanish"
  },
  loader: {
    label: "Loading PlaybookOps",
    text: "Preparing reusable team workflows"
  },
  hero: {
    eyebrow: "Reusable playbooks for teams that ship with evidence",
    title: "Make engineering work repeatable, reviewable, and ready to run.",
    body: "A practical workspace for finding, adapting, and exporting engineering playbooks across CloudOps, DevSecOps, SRE, backend, architecture, and platform work.",
    explore: "Explore playbooks",
    contribute: "Contribute",
    search: "Search Lambda, IAM, payments, AGENTS.md..."
  },
  stats: {
    playbooks: "Playbooks",
    categories: "Categories",
    agents: "Agents",
    validated: "Validated"
  },
  filters: {
    title: "Filters",
    active: "active",
    all: "All",
    search: "Search...",
    clear: "Clear filter",
    empty: "No options found",
    labels: {
      tool: "Tool",
      domain: "Domain",
      category: "Category",
      difficulty: "Difficulty",
      risk_level: "Risk",
      execution_mode: "Mode",
      cloud: "Cloud",
      status: "Status"
    }
  },
  catalog: {
    kicker: "Catalog",
    singular: "playbook",
    plural: "playbooks",
    helperDefault: "Browse by domain, tool, risk, and operating mode.",
    helperFiltered: "filters applied.",
    helperFilteredOne: "filter applied.",
    noFilters: "No filters applied",
    densityLabel: "Card density",
    comfortable: "Comfortable cards",
    compact: "Compact cards",
    resetFilters: "Reset filters",
    emptyTitle: "No playbooks found",
    emptyBody: "Try a broader search or clear the active filters to return to the full catalog.",
    resetCatalog: "Reset catalog"
  },
  card: {
    risk: "Risk",
    mode: "Mode",
    version: "Version",
    services: "Services",
    noServices: "No services declared"
  },
  detail: {
    summaryLabel: "Playbook summary",
    risk: "Risk",
    mode: "Mode",
    difficulty: "Difficulty",
    maturity: "Maturity",
    coverage: "Coverage",
    services: "services",
    tools: "tools",
    copyPrompt: "Copy prompt",
    copyAs: "Copy for agent",
    copyKinds: {
      agents: "AGENTS.md",
      claude: "CLAUDE.md",
      kiroSteering: "Kiro Steering",
      kiroSpec: "Kiro Spec",
      cursor: "Cursor Rule",
      windsurf: "Windsurf Rule",
      copilot: "Copilot"
    },
    tabsLabel: "Playbook detail sections",
    words: "words",
    tabs: {
      overview: "Overview",
      inputs: "Inputs",
      evidence: "Evidence",
      contract: "Contract",
      expected: "Expected output",
      prompt: "Prompt",
      scorecard: "Scorecard"
    },
    expected: {
      style: "Output style",
      sections: "Expected sections",
      quality: "Quality checks"
    },
    execution: {
      title: "Executable playbook",
      ready: "Prompt ready",
      structured: "Structured prompt for any agent",
      helper: "This playbook includes a structured prompt, expected output, safety rules, and agent-specific exports.",
      viewPrompt: "View prompt",
      viewExpected: "View expected output",
      words: "Prompt words",
      sections: "Output sections",
      quality: "Quality checks"
    },
    sections: {
      when: "When to use",
      tools: "Tools",
      inputVariables: "Input variables",
      permissions: "Required permissions",
      evidencePolicy: "Evidence policy",
      safetyRules: "Safety rules",
      outputContract: "Output contract",
      expectedOutput: "Expected output",
      prompt: "Prompt",
      scorecard: "Scorecard"
    }
  },
  copy: {
    copied: "copied to clipboard"
  },
  community: {
    title: "Community",
    first: "Add playbooks with original wording, clear scope, evidence rules, safety boundaries, and validation criteria.",
    second: "Improve existing playbooks by tightening permissions, adding examples, and making each workflow easier to run.",
    third: "Add adapters or translations without changing the core playbook contract."
  },
  roadmap: {
    title: "Roadmap",
    items: [
      "Dynamic playbook catalog",
      "Bilingual platform UI",
      "Original PlaybookOps content",
      "Multi-tool adapters",
      "Evaluation workflow",
      "Community contribution flow"
    ]
  },
  footer: {
    text: "PlaybookOps helps teams organize, review, and export reusable engineering playbooks.",
    credit: "Built by Jeancarlos De la cruz C.",
    linkedin: "Jeancarlos De la cruz C. on LinkedIn"
  }
} as const;
