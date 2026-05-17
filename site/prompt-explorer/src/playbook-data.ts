const modules = import.meta.glob("../../../playbooks/**/*.json", { eager: true });

export type InputVariable = {
  name: string;
  type: string;
  required: boolean;
  default?: string | number | boolean;
  description: string;
};

export type Playbook = {
  id: string;
  title: string;
  summary: string;
  description: string;
  when_to_use?: string[];
  domain: string;
  category: string;
  tools: string[];
  cloud: string[] | string;
  services: string[];
  difficulty: string;
  risk_level: string;
  execution_mode: string;
  status: string;
  owner: string;
  version: string;
  requires_permissions: string[];
  input_variables: InputVariable[];
  output_contract: {
    format: string;
    sections: string[];
  };
  expected_output: {
    style: string;
    sections: string[];
    quality_checks: string[];
  };
  evidence_policy: Record<string, boolean | string>;
  safety_rules: string[];
  prompt: string;
  adapters: Record<string, { format: string; notes: string }>;
  evaluation: {
    maturity_level: string;
    scorecard: Record<string, number>;
  };
  tags: string[];
  changelog: Array<{ version: string; date: string; changes: string[] }>;
};

function readModule(module: unknown) {
  return (module as { default?: Playbook }).default ?? (module as Playbook);
}

export function cloudValues(playbook: Playbook) {
  return Array.isArray(playbook.cloud) ? playbook.cloud : [playbook.cloud].filter(Boolean);
}

export const playbooks = Object.values(modules)
  .map(readModule)
  .sort((a, b) => a.title.localeCompare(b.title));

export const catalogStats = {
  totalPlaybooks: playbooks.length,
  categories: new Set(playbooks.map((playbook) => playbook.category)).size,
  agents: new Set(playbooks.flatMap((playbook) => playbook.tools)).size,
  validated: playbooks.filter((playbook) => playbook.status === "validated").length
};
