# kb — the support knowledge base

## S01E03 review and delivery

Public repository: https://github.com/raphoq/ai-course. Sources, evidence and the complete
static render are published. The course accepted the two tickets at its first review;
final acceptance is pending resubmission after the engineering update and ticket closure.

- [Issue #1: shared parser — 379 reports](https://github.com/raphoq/ai-course/issues/1): completed;
  engineering reports a day-first parser fix.
- [Issue #2: booking-v3 date hint — 33 reports](https://github.com/raphoq/ai-course/issues/2): not planned;
  engineering retired booking-v3 rather than correcting its hint.

The course reports #4471 closed on 5 October 2026. The update was read on 28 October;
see `evidence/engineering-update.md` and its screenshot. These are engineering-reported
outcomes, not production fixes tested by this review. Historical report counts are unchanged.

The reviewed issue drafts are retained in `issues/parser.md` and `issues/hint.md`.
No public hosting is required to inspect the included static site.

- Review source: `src/routes/kb/incidents/4471-review/+page.svx`.
- Replacement decision proposal: `src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx`.
- Rendered pages: `rendered/kb/incidents/4471-review/index.html` and
  `rendered/kb/decisions/0002-dedupe-by-cause/index.html`, with all CSS/JS in `rendered/`.
- Evidence: `evidence/analysis.json`; audit record: `evidence/audit-summary.md`.
- Both added pages derive desk ref `DR-KWRK-7XCH` from the frontmatter signature.

The export contains 427 rows / 412 unique reports / 15 repeated rows. The exported
tenant/form/channel classifier assigns 379 to parser and 33 to hint. A body audit found
explicit swaps in 370 parser-assigned reports and all 33 hint-assigned reports; five
unusual bodies and four incomplete date comparisons remain visible. These assignments
do not individually prove production causes. No third common cause is established.

### View the delivered site

From this repository root, run:

```bash
python3 -m http.server 4173 --bind 127.0.0.1 --directory rendered
```

Open http://localhost:4173/kb/incidents/4471-review/ and
http://localhost:4173/kb/decisions/0002-dedupe-by-cause/.
Serve `rendered/` as the HTTP root because original navigation uses `/kb/` URLs.
Opening the HTML through `file://` or GitHub's source viewer is not an equivalent preview.
Screenshots in `evidence/` provide a static view; the complete site preserves interactivity.

### Reproduce analysis and rendering

Use Node.js 22.13+ and npm. Dependencies are pinned by `package-lock.json`.

```bash
npm ci
npm run analyze
npm run build
npm run package:render
```

`analyze` regenerates the report ID lists, counts and evidence annotations.
`package:render` refreshes only the generated `rendered/` directory.
The original source pages, components, data and accepted decision 0001 remain unchanged;
this delivery README extends the original documentation. Added decisions
are proposals for support review, not claims of an accepted policy change or deployed fix.

---

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.
