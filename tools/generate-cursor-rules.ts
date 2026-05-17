import { cursorRule } from "../site/prompt-explorer/src/playbook-adapters.js";
import { findPlaybook, parseArgs, writeOutput } from "./lib.js";
const args = parseArgs();
const playbook = findPlaybook(String(args.playbook ?? ""));
writeOutput(`adapters/cursor/${playbook.id}.mdc`, cursorRule(playbook));
