booking-v3 shows MM/DD/YYYY while interpreting dates day first — 33 reports

## Scope and count

33 unique report IDs currently merged into #4471 in the 2026-10-04 export.
All are form-channel reports from Alder Physio (de-DE), Copper Studio (es-ES),
or Pale Harbour (pt-PT), which run booking-v3. First received 2026-04-17;
last received 2026-09-22. Intake labelled 18 `hint` and 15 `parser`.
The tenant directory and form version determine this classification, not browser locale.
All report IDs are in `evidence/analysis.json`.

## Expected and observed

booking-v3 displays MM/DD/YYYY, but reads submitted dates in the tenant's day-first
order. Users following the hint get a date different from what they intended.
R-41230 (Copper Studio, form): client came on 1 June instead of 6 January.
R-41241 (Alder Physio, form): people showed up on 8 June, booked for 6 August.
This is a separate cause from the shared parser: a parser fix does not repair the hint.

## Reproduction to verify

Open booking-v3 for a day-first tenant and inspect the date-field hint. Following
MM/DD/YYYY, enter 08/06/2026 intending 6 August. A day-first reader interprets this
as 8 June. Expected: the displayed format and the reader agree and preserve intent.
This reproduction is derived from source and reports; production was not tested.

## Acceptance

- Derive the date hint and validation from the same locale contract used by the form reader.
- Verify the displayed hint and the resulting date for all three affected tenants.
- Keep app/email reports at those tenants in parser scope; channel matters.
- Test booking-v2 and month-first locale behavior for regressions.
- Reconcile incoming reports by ID and check the actual fix before closing this issue.

Evidence: DATE_HINT and causeOf in `src/lib/kb/causes.ts`, tenant JSON files,
`evidence/analysis.json`, and `src/routes/kb/incidents/4471-review/+page.svx`.
