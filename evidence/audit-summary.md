# Independent audit record — 28 October 2026

Two subagents reviewed the materials in parallel, with no file edits or publication:

- Data audit: `gpt-6.1-sol`, reasoning `high`.
- KB and requirements audit: `gpt-6.1-terra`, reasoning `medium`.

The main agent compared their findings and prepared the corrections below with the
human's approval. This records actual work performed; it does not imply course acceptance.

## Findings and treatment

- Both audit and analysis agree on 427 rows, 412 unique report IDs and 15 identical copies.
  The directory-based model assigns 379 parser / 33 hint; all IDs match the analysis.
- The body audit found 370 explicit swaps in parser and 33 in hint. Five unusual bodies
  plus four incomplete comparisons limit what can be inferred. Counts remain assignments;
  no third common production defect is established. The evidence and parser draft state this.
- Decision 0002 remains proposed. The review now asks the desk to review it before adoption.
- Both added pages explain that the original explorer's merge verdict is preliminary and
  cannot replace reading bodies or resolving contradictory evidence.
- Issue links are pending actual publication; the review and README no longer claim they exist.
- Deliver the complete static HTML/CSS/JS under rendered/, with local HTTP instructions.
  GitHub source viewing alone is not a running site. Include screenshots as static evidence.

## Main-agent verification after corrections

- `npm run analyze`, `npm run build`, and `npm run package:render` passed.
- All original files under src/ match the archive byte for byte; the original README is
  extended with delivery instructions. New sources are additions.
- All 44 generated files match the copy in rendered/. All 146 local references in the
  generated HTML resolve to existing files. Both new pages contain DR-CTMA-WVHJ.
- Browser navigation from the review to decision 0002 and back passed; CSS renders.
- On the review, changing report A (Alder Physio) from form to app changes hint to parser
  and the verdict to same cause. Returning to form restores hint and different causes.
- Screenshots: review-full.png, decision-full.png, review-overview.png and interaction.png.

The browser used build/ served at port 4173; byte comparison confirms rendered/ contains
the identical complete site. Production fixes were not tested and course acceptance is pending.
