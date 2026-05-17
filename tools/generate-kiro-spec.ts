import fs from "node:fs";
import { kiroSpecFiles } from "../site/prompt-explorer/src/playbook-adapters.js";
import { findPlaybook, parseArgs } from "./lib.js";
const args = parseArgs();
const playbook = findPlaybook(String(args.playbook ?? ""));
const base = `adapters/kiro/${playbook.id}/.kiro/specs/${playbook.id}`;
fs.mkdirSync(base, { recursive: true });
for (const [name, content] of Object.entries(kiroSpecFiles(playbook))) fs.writeFileSync(`${base}/${name}`, content);
console.log(`Wrote ${base}`);
