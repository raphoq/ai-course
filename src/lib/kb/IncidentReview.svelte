<script lang="ts">
  import source from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { uniqueById, groupByCause, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';
  import { INCOMPLETE_DATE_PAIRS } from '#lib/kb/evidence-review';

  const reports = uniqueById(source as Report[]).filter(r => r.mergedInto === 4471);
  const groups = groupByCause(reports, tenantOf);
  const months = [...new Set(reports.map(r => r.receivedAt.slice(0, 7)))].sort();
  const exceptions = reports.filter(r => notes.oneDayMove.includes(r.id));
  const incomplete = reports.filter(r => INCOMPLETE_DATE_PAIRS.some(id => id === r.id));
  const sameDay = reports.filter(r => r.mergedAt?.startsWith('2026-07-02')).length;
</script>

<p>The export has <b>{source.length}</b> rows, <b>{reports.length}</b> unique reports and
  <b>{source.length - reports.length}</b> repeated rows. Count report IDs, not export rows.</p>
<table>
  <thead><tr><th>Classifier assignment</th><th>Reports</th><th>Tenants</th><th>Intake tags</th><th>Received</th></tr></thead>
  <tbody>{#each groups as g (g.cause)}
    <tr><td>{g.cause}</td><td>{g.reports.length}</td><td>{g.tenants}</td>
      <td>{Object.entries(g.taggedAs).map(([tag, n]) => `${tag}: ${n}`).join(' · ')}</td>
      <td>{g.firstSeen} → {g.lastSeen}</td></tr>
  {/each}</tbody>
</table>
<p>These are assignments from the exported tenant/form/channel model, not individually
  verified production diagnoses. The model does not inspect report bodies and is not the
  product parser implementation. After excluding the flagged exceptions and incomplete
  date pairs, the audit found explicit day/month swaps in
  {groups.map(g => `${g.reports.filter(r => !notes.oneDayMove.includes(r.id) && !INCOMPLETE_DATE_PAIRS.some(id => id === r.id)).length} ${g.cause} reports`).join(' and ')}.
  The body alone does not distinguish a parser defect from a form-hint defect.</p>
<p>Intake tags disagree with the tenant-based classification on
  <b>{groups.reduce((n, g) => n + g.reports.filter(r => r.meta.intakeTag !== g.cause).length, 0)}</b>
  reports. Browser language is not the tenant's date format.</p>

<h3>Received is not merged</h3>
<table>
  <thead><tr><th>Month</th><th>Received</th><th>Merged</th></tr></thead>
  <tbody>{#each months as month (month)}
    <tr><td>{month}</td><td>{reports.filter(r => r.receivedAt.startsWith(month)).length}</td>
      <td>{reports.filter(r => r.mergedAt?.startsWith(month)).length}</td></tr>
  {/each}</tbody>
</table>

<h3>Additional reports with incomplete date evidence</h3>
<p>These {incomplete.length} reports remain in the parser assignment. They provide context
  or an incomplete date comparison, rather than a full pair establishing a swap.</p>
<table>
  <thead><tr><th>Report</th><th>Reported symptom</th></tr></thead>
  <tbody>{#each incomplete as r (r.id)}
    <tr><td>{r.id}</td><td>{r.body}</td></tr>
  {/each}</tbody>
</table>
<p><b>{sameDay}</b> reports were merged on 2 July. That is a triage event, not the start of
  the incident: the first report arrived on {reports.map(r => r.receivedAt.slice(0, 10)).sort()[0]}.
  Reports continued until {reports.map(r => r.receivedAt.slice(0, 10)).sort().at(-1)}.</p>

<h3>Keep these bodies visible</h3>
<p>The directory-based classifier files these {exceptions.length} reports under parser.
  Their text does not establish a day/month swap. Keep them in the reported count while
  investigating their actual cause; do not silently declare them explained or fixed.</p>
<table>
  <thead><tr><th>Report</th><th>Tenant / channel</th><th>Reported symptom</th></tr></thead>
  <tbody>{#each exceptions as r (r.id)}
    <tr><td>{r.id}</td><td>{r.tenant} / {r.channel}</td><td>{r.body}</td></tr>
  {/each}</tbody>
</table>
