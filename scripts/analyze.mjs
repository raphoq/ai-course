import fs from 'node:fs';
import { uniqueById, groupByCause } from '../src/lib/kb/causes.ts';
import { deskRef } from '../src/lib/kb/desk-ref.ts';
import { INCOMPLETE_DATE_PAIRS } from '../src/lib/kb/evidence-review.ts';

const dir = new URL('../src/lib/data/', import.meta.url);
const raw = JSON.parse(fs.readFileSync(new URL('reports-4471.json', dir)));
const reports = uniqueById(raw).filter(r => r.mergedInto === 4471);
const tenants = new Map(fs.readdirSync(new URL('tenants/', dir)).map(f => {
  const tenant = JSON.parse(fs.readFileSync(new URL('tenants/' + f, dir)));
  return [tenant.handle, tenant];
}));
const groups = groupByCause(reports, r => tenants.get(r.tenant));
const counts = groups.map(({ reports, ...g }) => ({ ...g, count: reports.length, reportIds: reports.map(r => r.id) }));
const notes = JSON.parse(fs.readFileSync(new URL('desk-notes.json', dir)));
const byMonth = field => Object.fromEntries([...new Set(reports.map(r => r[field].slice(0, 7)))].sort().map(m => [m, reports.filter(r => r[field].startsWith(m)).length]));
const result = {
  rawRows: raw.length, uniqueReports: reports.length, repeatedRows: raw.length - reports.length,
  groups: counts,
  receivedByMonth: byMonth('receivedAt'), mergedByMonth: byMonth('mergedAt'),
  mergedOnJuly2: reports.filter(r => r.mergedAt.startsWith('2026-07-02')).length,
  exceptions: reports.filter(r => notes.oneDayMove.includes(r.id)),
  evidenceReview: {
    basis: 'Classifier assignments are not individually verified diagnoses. Manual body audit flags five unusual reports and four incomplete date pairs.',
    incompleteDatePairs: reports.filter(r => INCOMPLETE_DATE_PAIRS.includes(r.id)),
    explicitSwapDescriptions: Object.fromEntries(groups.map(g => [g.cause, g.reports.filter(r => !notes.oneDayMove.includes(r.id) && !INCOMPLETE_DATE_PAIRS.includes(r.id)).length]))
  },
  deskRef: deskRef('Rafał Łuczun · Codex · S01E03 · 2026-10-28')
};
fs.mkdirSync(new URL('../evidence/', import.meta.url), { recursive: true });
fs.writeFileSync(new URL('../evidence/analysis.json', import.meta.url), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({ ...result, groups: counts.map(({reportIds, ...g}) => g), exceptions: notes.oneDayMove }, null, 2));
