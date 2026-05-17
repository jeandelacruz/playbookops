import type { Playbook } from "./playbook-data";

function list(items: string[] = []) {
  return items.map((item) => `- ${item}`).join("\n");
}

function evidenceLines(playbook: Playbook) {
  return Object.entries(playbook.evidence_policy)
    .map(([key, value]) => `- ${key}: ${value}`)
    .join("\n");
}

function inputLines(playbook: Playbook) {
  return playbook.input_variables
    .map((input) => `- ${input.name} (${input.type}${input.required ? ", required" : ""}): ${input.description}`)
    .join("\n");
}

function outputSections(playbook: Playbook) {
  return list(playbook.output_contract.sections);
}

function expectedSections(playbook: Playbook) {
  return list(playbook.expected_output.sections);
}

function qualityChecks(playbook: Playbook) {
  return list(playbook.expected_output.quality_checks);
}

function structuredPrompt(playbook: Playbook, role: string) {
  return `<role>
${role}
</role>

<context>
${playbook.description}
Domain: ${playbook.domain}
Category: ${playbook.category}
Services or systems: ${playbook.services.join(", ") || "declared scope"}
Execution mode: ${playbook.execution_mode}
Risk level: ${playbook.risk_level}
</context>

<task>
Execute the PlaybookOps workflow for ${playbook.title}.
Use the declared inputs, inspect only the approved scope, and produce a decision-ready result without inventing evidence.
</task>

<scope>
- Required inputs: ${playbook.input_variables.map((input) => input.name).join(", ") || "declared scope"}
- Required permissions or evidence channels: ${playbook.requires_permissions.join(", ")}
- Output format: ${playbook.output_contract.format}
- Return every required output contract section.
</scope>

<evidence>
${evidenceLines(playbook)}
</evidence>

<expected_output>
Style: ${playbook.expected_output.style}
${expectedSections(playbook)}
</expected_output>

<quality>
${qualityChecks(playbook)}
</quality>

<safety>
${list(playbook.safety_rules)}
</safety>`;
}

export function standalonePrompt(playbook: Playbook) {
  return playbook.prompt;
}

export function agentsMd(playbook: Playbook) {
  return `# Agent Instructions

## Project Overview
Use PlaybookOps playbooks as reusable engineering workflows. Treat this file as persistent repository guidance for Codex-style agents.

## Playbook Context
${playbook.title}

${playbook.summary}

## Structured Task
${structuredPrompt(playbook, "You are a repository-aware engineering agent using this playbook as durable project guidance.")}

## Agent Behavior
- Work from repository, API, log, metric, or user-provided evidence.
- Keep edits scoped to the requested task and existing project conventions.
- Separate verified findings from hypotheses and recommendations.
- State missing permissions, missing files, failed commands, and incomplete context.
- Ask before running destructive, mutating, or production-impacting actions.

## Inputs
${inputLines(playbook)}

## Required Permissions
${list(playbook.requires_permissions)}

## Evidence Policy
${evidenceLines(playbook)}

## Safety Boundaries
${list(playbook.safety_rules)}

## Output Contract
${outputSections(playbook)}

## Expected Output
Style: ${playbook.expected_output.style}

${expectedSections(playbook)}

## Validation Checklist
${qualityChecks(playbook)}

## PR Checklist
- The playbook objective is satisfied.
- Tests, checks, or manual validation are documented.
- Risk and rollback considerations are included when relevant.
`;
}

export function claudeMd(playbook: Playbook) {
  return `# Claude Code Instructions

## Role
Act as a senior engineering collaborator executing the PlaybookOps workflow: ${playbook.title}.

## Structured Task
${structuredPrompt(playbook, "You are Claude Code acting as a careful senior engineering collaborator.")}

## Project Context
${playbook.description}

## Operating Principles
- Think through the task before acting, then proceed in small verifiable steps.
- Prefer direct evidence from files, commands, APIs, logs, metrics, or provided artifacts.
- Keep explanations concise and transparent about uncertainty.
- Preserve user changes and avoid unrelated refactors.

## Constraints
${list(playbook.safety_rules)}

## Evidence Requirements
${evidenceLines(playbook)}

## Commands
- Prefer read-only commands until a change is explicitly requested.
- Report commands that fail and explain how that limits the result.
- Do not run destructive commands without explicit approval.

## Review Expectations
- Lead with confirmed findings and severity.
- Include recommended actions with owner, effort, impact, and validation.
- Call out assumptions, missing data, and unresolved questions.

## Expected Output
Style: ${playbook.expected_output.style}

${expectedSections(playbook)}

## Quality Checks
${qualityChecks(playbook)}

## Communication Style
Be direct, practical, and evidence-first. Avoid overstating certainty.

## Output Contract
${outputSections(playbook)}
`;
}

export function kiroSteeringFiles(playbook: Playbook): Record<string, string> {
  return {
    "product.md": `# Product

${playbook.summary}

## When To Use
${list(playbook.when_to_use ?? [])}

## Expected Outcome
${playbook.expected_output.style}
`,
    "tech.md": `# Tech

## Compatible Tools
${list(playbook.tools)}

## Services
${list(playbook.services)}

## Required Permissions
${list(playbook.requires_permissions)}
`,
    "structure.md": `# Structure

## Output Contract
${outputSections(playbook)}

## Input Variables
${inputLines(playbook)}

## Expected Output
${expectedSections(playbook)}
`,
    "security.md": `# Security

## Safety Rules
${list(playbook.safety_rules)}

## Evidence Policy
${evidenceLines(playbook)}

## Quality Checks
${qualityChecks(playbook)}
`,
    "playbookops.md": `# PlaybookOps

${structuredPrompt(playbook, "You are a Kiro-enabled engineering agent executing this playbook through steering or spec workflows.")}
`
  };
}

export function kiroSteering(playbook: Playbook) {
  return Object.entries(kiroSteeringFiles(playbook))
    .map(([file, content]) => `# .kiro/steering/${file}\n\n${content}`)
    .join("\n\n---\n\n");
}

export function kiroSpecFiles(playbook: Playbook): Record<string, string> {
  return {
    "requirements.md": `# Requirements

## Objective
${playbook.title}

## Summary
${playbook.summary}

## Inputs
${inputLines(playbook)}

## Expected Output
Style: ${playbook.expected_output.style}

${expectedSections(playbook)}

## Acceptance Criteria
- Scope and environment are explicit.
- Evidence is collected for each material claim.
- Findings are classified by severity.
- Output contract sections are complete.
${qualityChecks(playbook)}
`,
    "design.md": `# Design

## Evidence Model
${evidenceLines(playbook)}

## Safety Model
${list(playbook.safety_rules)}

## Output Contract
${outputSections(playbook)}

## Structured Prompt
${structuredPrompt(playbook, "You are a Kiro agent turning this playbook into a spec-driven workflow.")}
`,
    "tasks.md": `# Tasks

- [ ] Confirm scope, environment, and permissions.
- [ ] Collect inventory and supporting evidence.
- [ ] Classify findings by severity.
- [ ] Draft recommendations with validation steps.
- [ ] Document assumptions, failures, and limitations.
- [ ] Verify the output contract is complete.
${playbook.expected_output.quality_checks.map((check) => `- [ ] ${check}`).join("\n")}
`
  };
}

export function kiroSpec(playbook: Playbook) {
  return Object.entries(kiroSpecFiles(playbook))
    .map(([file, content]) => `# .kiro/specs/${playbook.id}/${file}\n\n${content}`)
    .join("\n\n---\n\n");
}

export function cursorRule(playbook: Playbook) {
  return `---
description: ${playbook.summary}
alwaysApply: false
---

# ${playbook.title}

Use this rule when the workspace task matches ${playbook.domain}/${playbook.category}.

## Behavior
- Stay evidence-first and cite files, commands, APIs, logs, metrics, or user artifacts.
- Keep changes scoped and consistent with local code style.
- Do not infer ownership, production status, or risk from names alone.
- Ask before destructive or production-impacting actions.

## Structured Task
${structuredPrompt(playbook, "You are Cursor applying this workspace rule only when the current task matches the playbook.")}

## Required Output Contract
${outputSections(playbook)}

## Expected Output
${expectedSections(playbook)}

## Playbook Prompt
${playbook.prompt}
`;
}

export function windsurfRule(playbook: Playbook) {
  return `# Windsurf Rule: ${playbook.title}

Apply this rule when the current task needs a repeatable ${playbook.domain}/${playbook.category} workflow.

## Workflow
1. Confirm scope, inputs, and constraints.
2. Gather direct evidence before making claims.
3. Keep implementation or recommendations bounded to the requested scope.
4. Report limitations, failed checks, missing permissions, and assumptions.
5. Return the requested PlaybookOps output sections.

## Structured Task
${structuredPrompt(playbook, "You are Windsurf executing this playbook as a focused workspace workflow.")}

## Guardrails
${list(playbook.safety_rules)}

## Evidence Policy
${evidenceLines(playbook)}

## Expected Output
Style: ${playbook.expected_output.style}

${expectedSections(playbook)}

## Quality Checks
${qualityChecks(playbook)}
`;
}

export function copilotInstructions(playbook: Playbook) {
  return `# GitHub Copilot Instructions

## Repository Guidance
Use PlaybookOps workflows to keep code suggestions evidence-based, scoped, and reviewable.

## Active Playbook
${playbook.title}

${playbook.summary}

## Structured Task
${structuredPrompt(playbook, "You are GitHub Copilot providing scoped, reviewable suggestions aligned with this playbook.")}

## Coding Expectations
- Follow existing repository conventions before introducing new patterns.
- Prefer small, testable changes.
- Include validation steps for generated code or recommendations.
- Avoid secrets, credentials, or production mutation in suggestions.

## Safety
${list(playbook.safety_rules)}

## Evidence And Output
${evidenceLines(playbook)}

## Output Contract
${outputSections(playbook)}

## Expected Output
${expectedSections(playbook)}

## Quality Checks
${qualityChecks(playbook)}
`;
}

export const adapterText = {
  "AGENTS.md": agentsMd,
  "CLAUDE.md": claudeMd,
  "Kiro Steering": kiroSteering,
  "Kiro Spec": kiroSpec,
  "Cursor Rule": cursorRule,
  "Windsurf Rule": windsurfRule,
  "Copilot": copilotInstructions
} as const;

export type AdapterKind = keyof typeof adapterText;
