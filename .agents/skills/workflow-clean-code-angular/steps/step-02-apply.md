---
name: step-02-apply
description: Load documentation, apply fixes with parallel agents, team lead coherence check
prev_step: steps/step-01-scan.md
next_step: steps/step-03-verify.md
---

# Step 2: APPLY

Apply fixes from the consolidated issue list. Each issue already includes a proposed fix from the scanning specialists — validated by the team lead. This step reviews those proposals, loads references for verification, and applies them.

Don't invent patterns — follow the loaded references. If a proposed fix looks wrong or incomplete, verify against the reference before applying. If no reference covers an issue, flag it rather than improvising.

---

## 1. Load Reference Files

Based on issue categories found in step-01:

| Condition | Load |
|-----------|------|
| Always | `references/angular-clean-code.md` |
| Always | `references/angular-anti-patterns.md` |
| Always | `references/angular-style-guide.md` |
| Architecture issues | `references/angular-architecture.md` |
| AI Slop issues | `references/ai-slop-detection.md` |
| ViewModel issues | `references/viewmodel-patterns.md` |
| Store issues | `references/angular-clean-code.md` section 2 |

Read each relevant file with the Read tool.

## 2. Optional: Query Angular Documentation

If documentation MCP tools are available (e.g., Context7), query for relevant Angular patterns. This is supplementary — the reference files contain enough context.

## 3. Review Fix Plan

The consolidated issue list from step-01 already contains proposed fixes (code snippets from specialists, validated by the team lead). Review them against the loaded references:

1. **Verify each fix** — does the proposed code match the reference pattern? If not, adjust.
2. **Group by file** — cluster fixes that touch the same file for atomic application.
3. **Check for conflicts** — if two fixes touch adjacent lines, plan the merge order.

Present the plan grouped by file:

```markdown
### {filename} ({N} fixes)

#### #{N} — {Issue Title}
**Line**: {line} | **Severity**: {level}
**Current**: {problematic code snippet}
**Proposed Fix**: {replacement code from specialist}
**Verified against**: {reference file}
```

## 4. Confirm

**If `{auto_mode}`:** proceed to apply.

**Otherwise:** display the fix plan and ask:
- **Apply All** — apply everything
- **Critical Only** — skip Minor severity items
- **Review Before/After** — show the planned diff for each fix before applying

## 5. Apply Changes

### Economy Mode (`-e`)

Apply sequentially with the Edit tool. One file at a time.

### Standard / Deep Mode (4+ files to change)

Launch parallel `Snipper` agents — one per file or group of related files.

Each agent gets:
- The file(s) to modify
- The specific fixes to apply (from the plan, with exact line numbers)
- The reference patterns to follow
- This constraint: **"Apply ONLY the listed fixes. Don't improve adjacent code, add comments, or refactor anything not in the plan."**
- After applying fixes, run `npx tsc --noEmit --pretty {file}` on the modified file(s) to catch type errors early. If it fails, fix immediately before returning — don't pass broken code to the coherence check.

Group related fixes: if multiple issues affect the same file, one agent handles all of them.

### Fix Application Rules

Follow the patterns from loaded references exactly:

- **Angular patterns**: `references/angular-clean-code.md` — `input()`, `output()`, `@if`/`@for`, `inject()`, `OnPush`, `host: {}`
- **Style guide**: `references/angular-style-guide.md` — `protected` template members, `readonly` signals, handler naming, member order, lifecycle interfaces
- **Architecture**: `references/angular-architecture.md` — move shared code to correct layer, fix import direction
- **Store anatomy**: `references/angular-clean-code.md` section 2 — 6-section structure, cache-first, resource usage
- **AI Slop removal**: `references/ai-slop-detection.md` — delete unnecessary comments, inline single-use helpers, remove defensive theater
- **ViewModel fixes**: `references/viewmodel-patterns.md` — move transformations to store `computed()`, remove template expressions

Every change must trace to a documented pattern and cite its source.

## 6. Team Lead Coherence Check

After all fixes are applied, launch the team lead agent (`code-reviewer` type):

> You are a senior Angular architect reviewing changes just applied across multiple files.
> Read every modified file.
>
> Check for:
> 1. **Cross-file consistency** — do all modified files follow the same patterns? Same DI style, same signal patterns, same naming conventions?
> 2. **Broken imports** — did any refactoring break import paths? Did moving code to `pattern/` update all consumers?
> 3. **Incomplete migrations** — if `@Input()` → `input()` in a component, did callers update their templates too?
> 4. **ViewModel coherence** — if store selectors changed, do component template bindings still match?
> 5. **Side effects** — did any fix break a different concern? Did removing a "defensive" null check actually remove a needed guard?
> 6. **Remaining slop** — after fixes, is there any leftover AI slop the specialists missed?
>
> If issues found: list them with `file:line` for immediate fix.
> If everything is coherent: confirm "Changes are coherent."

Fix any issues the team lead identifies, then re-check if the fix was non-trivial.

## 7. Track Progress

```markdown
## Changes Applied

| # | File:Line | Change | Category | Source |
|---|-----------|--------|----------|--------|
| 1 | ... | ... | ... | ... |

### Summary
- **Files modified**: {N}
- **Critical fixes**: {N}
- **Important fixes**: {N}
- **Minor fixes**: {N}
- **Coherence check**: Passed / {issues fixed}
```

**If `{save_mode}`:** write to `02-apply.md`.

---

## Next Step

After changes applied and coherence verified → load `steps/step-03-verify.md`
