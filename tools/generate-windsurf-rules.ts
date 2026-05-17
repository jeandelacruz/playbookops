import { windsurfRule } from "../site/prompt-explorer/src/playbook-adapters.js";
import { findPlaybook, parseArgs, writeOutput } from "./lib.js";
const args = parseArgs();
const playbook = findPlaybook(String(args.playbook ?? ""));
writeOutput(`adapters/windsurf/${playbook.id}.md`, windsurfRule(playbook));
