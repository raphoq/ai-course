The shared parser treats day-first tenant dates as month-first — 379 reports

## Scope and count

379 unique report IDs in #4471 in the 2026-10-04 export. The tenant-based classifier
assigns these to `parser`: 11 tenants, first received 2026-04-01, last received 2026-10-04.
356 have intake tag `parser`; 23 have intake tag `hint`. Tags come from browser language
and are not authoritative. All report IDs are in `evidence/analysis.json`.

## Expected and observed

The shared parser reads month first even for tenants whose dates are day first.
R-41200 (Harbour Dental, en-GB, app): a 7 April reminder went out on 4 July.
R-41203 (Lantern Row, cs-CZ, app): booked 2 December, invite says 12 February.
Expected: parsing, storage and invite rendering preserve the intended tenant-local date.

## Reproduction to verify

For a day-first tenant, send the intended date 07/04/2026 through the app or email
intake, then inspect the stored value and generated invite. Expect 7 April, not 4 July.
Repeat through booking-v2. Booking-v3 tenants arriving through app or email remain in
this parser scope; their booking-v3 form reports have a separate hint defect.
This reproduction is derived from the export and has not been run against production.

## Unresolved evidence within this count

The classifier assigns R-41202, R-41209, R-41236, R-41344 and R-41620 here, but their
bodies do not demonstrate a day/month swap. They mention a one-day difference,
June-only shifts, an invite arriving before booking, or different dates across cities.
Keep all five visible and investigate. Four further reports lack a complete date pair:
R-41290, R-41417, R-41514 and R-41615. A manual body audit found explicit swaps in
370 parser-assigned reports. Keep the total assignment at 379; do not present all 379
as independently proven diagnoses. The classifier is support knowledge, not production
parser code, and the body alone does not distinguish parser from hint.
Do not infer a proven timezone defect from these descriptions alone.

## Acceptance

- Honor the tenant's date contract; preserve dates through storage and invite creation.
- Verify app/email and booking-v2 paths and avoid regressions for month-first locales.
- Obtain original inputs, timezone, timestamps and invite payloads for the five exceptions.
- Reconcile new report IDs before closing; a queued fix is not evidence of resolution.

Evidence: `src/lib/kb/causes.ts`, tenant directory, report export, desk notes and
`src/routes/kb/incidents/4471-review/+page.svx`.
