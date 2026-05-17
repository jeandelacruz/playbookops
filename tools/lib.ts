import fs from "node:fs";
import path from "node:path";

export type Playbook = any;

export function rootPath(...parts: string[]) {
  return path.resolve(process.cwd(), ...parts);
}

export function listPlaybookFiles(dir = rootPath("playbooks")): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return listPlaybookFiles(fullPath);
    return entry.isFile() && entry.name.endsWith(".json") ? [fullPath] : [];
  });
}

export function loadPlaybooks(): Playbook[] {
  return listPlaybookFiles()
    .map((file) => JSON.parse(fs.readFileSync(file, "utf8")))
    .sort((a, b) => String(a.title).localeCompare(String(b.title)));
}

export function loadCatalog() {
  const playbooks = loadPlaybooks();
  return {
    version: "0.1.0",
    name: "PlaybookOps",
    tagline: "Reusable playbooks for teams that ship with evidence.",
    stats: {
      total_playbooks: playbooks.length,
      categories: new Set(playbooks.map((item: Playbook) => item.category)).size,
      supported_agents: new Set(playbooks.flatMap((item: Playbook) => item.tools ?? [])).size,
      validated_playbooks: playbooks.filter((item: Playbook) => item.status === "validated").length
    },
    playbooks
  };
}

export function findPlaybook(id: string): Playbook {
  const playbook = loadPlaybooks().find((item: Playbook) => item.id === id);
  if (!playbook) throw new Error(`Playbook not found: ${id}`);
  return playbook;
}

export function parseArgs() {
  const args = process.argv.slice(2);
  const values: Record<string, string | boolean> = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    const next = args[i + 1];
    if (!next || next.startsWith("--")) values[key] = true;
    else values[key] = next, i++;
  }
  return values;
}

export function writeOutput(defaultPath: string, content: string) {
  const args = parseArgs();
  const out = typeof args.out === "string" ? args.out : defaultPath;
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, content);
  console.log(`Wrote ${out}`);
}

export function list(items: string[] = []) {
  return items.map((item) => `- ${item}`).join("\n");
}

export function playbookMarkdown(playbook: Playbook) {
  return `# ${playbook.title}

${playbook.summary}

## Scope
${playbook.description}

## Inputs
${playbook.input_variables.map((input: any) => `- ${input.name} (${input.type}${input.required ? ", required" : ""}): ${input.description}`).join("\n")}

## Required Permissions
${list(playbook.requires_permissions)}

## Evidence Policy
${Object.entries(playbook.evidence_policy).map(([key, value]) => `- ${key}: ${value}`).join("\n")}

## Safety Rules
${list(playbook.safety_rules)}

## Output Contract
${list(playbook.output_contract.sections)}

## Expected Output
Style: ${playbook.expected_output.style}

${list(playbook.expected_output.sections)}

## Quality Checks
${list(playbook.expected_output.quality_checks)}

## Prompt
${playbook.prompt}
`;
}
