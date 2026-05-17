import fs from "node:fs";
import Ajv2020 from "ajv/dist/2020.js";
import { loadPlaybooks } from "./lib.js";

const playbooks = loadPlaybooks();
const schema = JSON.parse(fs.readFileSync("schemas/playbook.schema.json", "utf8"));
const ajv = new Ajv2020({ allErrors: true });
const validate = ajv.compile(schema);
const ids = new Set<string>();
let failures = 0;
for (const playbook of playbooks) {
  if (ids.has(playbook.id)) {
    console.error(`Duplicate id: ${playbook.id}`);
    failures++;
  }
  ids.add(playbook.id);
  if (!validate(playbook)) {
    console.error(`Invalid playbook: ${playbook.id}`);
    console.error(validate.errors);
    failures++;
  }
}
if (failures) process.exit(1);
console.log(`Validated ${playbooks.length} playbooks.`);
