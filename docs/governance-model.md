# Governance Model

Owners maintain playbooks. Status may be `draft`, `validated`, or `deprecated`. Risk levels are `low`, `medium`, `high`, and `critical`. Execution modes are `read-only`, `write-proposal`, `guarded-write`, and `destructive-requires-approval`.

Operational playbooks must declare minimum permissions and evidence policy. Safety rules must block silent production mutation, destructive actions, and invented evidence.
