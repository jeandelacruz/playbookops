# Playbook Authoring Guide

Write playbooks as clear engineering workflows. Start with the job to be done, define inputs and permissions, require evidence, specify the expected output and formal output sections, and include safety boundaries. Recommendations must include validation steps and limitations.

## File Location

Create one JSON file under `playbooks/{domain}/{playbook-id}.json`. PlaybookOps loads the catalog directly from those files.

## Originality

Do not copy titles, descriptions, or prompt bodies from other published collections. Preserve useful operational intent only when the workflow is rewritten in PlaybookOps language: evidence-first execution, explicit limits, decision-ready recommendations, validation checks, and clear safety boundaries.

## UI Translations

If a contribution changes platform UI text, update both translation dictionaries:

- `site/prompt-explorer/src/i18n/en.ts`
- `site/prompt-explorer/src/i18n/es.ts`

Playbook bodies remain English by default until translated playbook variants are introduced.
