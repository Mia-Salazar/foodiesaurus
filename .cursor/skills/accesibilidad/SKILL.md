---
name: accesibilidad
description: Applies WCAG 2.2 Level AAA and Spanish lectura fácil to UI, copy, and components in Foodiesaurus. Use when creating or changing pages, forms, labels, errors, headings, buttons, color, images, or any user-facing text. Requires weAAAre MCP @weaaare/mcp-a11y-readability (analyze-readability, suggest-readability-improvements, compare-texts) for SC 3.1.5 Reading Level.
---

# Accesibilidad (WCAG AAA + lectura fácil)

Apply this skill whenever user-visible UI or copy changes. AAA includes A and AA. Lectura fácil is extra: simpler language and layout, not only a readability score.

This skill does not replace a human accessibility audit or tests with assistive-technology users.

## Workflow

1. Write or edit the UI following [wcag-aaa.md](wcag-aaa.md) and [lectura-facil.md](lectura-facil.md).
2. Measure Spanish copy with the weAAAre readability MCP (below). Do not guess scores.
3. If the text is too hard, simplify (technique G153) or add a short easy summary (G86). Measure again with `compare-texts`.
4. For UI changes, check the accessibility tree (names, roles, headings, order) with `cursor-ide-browser` `browser_snapshot` when the flow is visible in the browser.
5. Do not finish while copy fails the reading-level target or while interactive controls lack an accessible name.

## weAAAre readability MCP (required)

Server: `@weaaare/mcp-a11y-readability` (Cursor MCP name `a11y-readability`).

1. Discover the namespace/tools (`GetDynamicTools`) before calling.
2. Inspect the tool schema, then call with the **visible Spanish text** (not CSS class names).
3. If the namespace is missing or `needsAuth`, stop guessing: tell the user to enable `a11y-readability` in Cursor MCP (project `.cursor/mcp.json`).

| Tool | When |
| --- | --- |
| `analyze-readability` | First pass on the copy (`language`: Spanish) |
| `suggest-readability-improvements` | Score is above the target |
| `compare-texts` | After a rewrite (before vs after) |
| `analyze-readability-formula` | Prefer **INFLESZ** for allergy/health-related copy |
| `get-text-stats` | Diagnose long sentences or long words |
| `list-formulas` | Confirm Spanish formula names |

**Target for Foodiesaurus copy:** lower secondary or easier (WCAG 3.1.5). Prefer INFLESZ **bastante fácil** or **fácil** (≥ 65). Reject **muy difícil** / **algo difícil**. Proper names (`Rita`, `Friki Pizza`, provinces) may stay.

Pass the real user-facing sentences: headings, help, empty states, errors, buttons, labels.

## Do not

- Put meaning in color, font, or position alone.
- Use `alt=""` on informative images (decorative only).
- Use placeholder as the only label.
- Justify text, lock zoom, or auto-play motion.
- Invent MCP scores if the server is unavailable.
