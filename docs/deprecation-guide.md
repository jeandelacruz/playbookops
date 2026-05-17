# Deprecation Guide

Deprecate a playbook when it is unsafe, obsolete, duplicated, superseded, or tied to unsupported APIs.

Required changes:

- Set `status` to `deprecated`.
- Add a changelog entry with the date and reason.
- Link or name the replacement playbook when one exists.
- Keep the replacement path clear when one exists.
- Do not delete the playbook until a major version boundary unless it creates a safety risk.
