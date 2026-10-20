# WCAG 2.2 Level AAA (practical)

Meet A and AA as well. This list is what usually applies when changing Foodiesaurus UI.

## Perceivable

- **1.1.1** Informative images have short `alt`. Decorative images use empty `alt`.
- **1.3.1** Headings, lists, labels, and tables match the visual structure. Do not fake them with `<div>` + CSS.
- **1.4.1** Color is not the only signal (score, error, sort).
- **1.4.3 / 1.4.6** Contrast: **7:1** normal text, **4.5:1** large text (AAA). UI components and graphics **3:1** (1.4.11).
- **1.4.4 / 1.4.8** Text can zoom. Line height ~1.5, no full justify, readable measure.
- **1.4.9** Do not put essential text inside images.
- **1.4.12** Text spacing tweaks must not clip content.
- **1.4.13** Tooltips/overlays are hoverable, dismissible, persistent.

Brand colors to re-check on the actual background (white vs green band):

- `--color-foodiesaurus`: `#007979`
- `--color-foodiesaurus-secondary`: `#C1571A`

## Operable

- **2.1.1 / 2.1.3** Full keyboard access. No traps.
- **2.2.3 / 2.2.4** No essential time limits. Do not interrupt with extra popups while the user reads.
- **2.3.2** No content flashes more than three times per second.
- **2.4.1** Skip or start with a real `h1` and landmarks (`header`, `nav`, `main`).
- **2.4.3** Focus order follows reading order.
- **2.4.6** Headings and labels describe the purpose.
- **2.4.7 / 1.4.13 / 2.4.13** Visible focus.
- **2.4.8** The user knows where they are (page title, current step, back link with destination).
- **2.4.9** Link purpose from the link text alone.
- **2.4.10** Sections have headings.
- **2.5.5** Hit target at least **44×44 CSS px** (AAA). Current buttons that are shorter must grow when touched.
- **2.5.7 / 2.5.8** Drag is not the only way. Targets do not overlap.

## Understandable

- **3.1.1** `lang="es"` on the document.
- **3.1.3 / 3.1.4** Explain unusual words and abbreviations (`alérgeno`, `AAA`).
- **3.1.5** Reading level: use the weAAAre readability MCP. See SKILL.md.
- **3.2.1 / 3.2.2 / 3.2.5** Focus or change of a control does not change context unless the user asks (submit, explicit search).
- **3.3.1 / 3.3.2 / 3.3.3** Errors identified in text, fields labeled, suggestions when possible.
- **3.3.5** Help near complex inputs (what `Provincia` and `Nombre` do).
- **3.3.6** For irreversible actions (create/edit later), ask for confirmation.

## Robust

- **4.1.2** Every control has name, role, and value.
- **4.1.3** Status messages (`Buscando restaurantes...`, errors) use polite live regions when they appear without a full navigation.
