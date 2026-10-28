import{a as c,f as p}from"./CwAW9WFE.js";import{R as l}from"./olutZ4Je.js";import{w as a,g as h}from"./-v_Lc1Yp.js";import{l as u,s as m}from"./BvfZsH8o.js";import{D as f}from"./B1tuVcTH.js";import{R as b}from"./DjtHhDRa.js";const e={layout:"runbook",title:"0002 · Merge reports by demonstrated cause",owner:"Rafał Łuczun",status:"proposed",reviewed:"2026-10-28",signature:"v1.eyJzdWIiOiIyMTEwIiwiYXVkIjoiY2hhbGxlbmdlOndoYXQtaXQtc2hvd3MiLCJpYXQiOjE3OTMyMjY3OTksImV4cCI6MTc5MzMxMzE5OX0.niafCVrm1p4Md7VA4-gm_x_aw48-Isck1teboGKEMwk"},{layout:I,title:R,owner:O,status:T,reviewed:z,signature:g}=e;var v=p(`<p><strong>Date:</strong> 28 October 2026 · <strong>Proposed by:</strong> Rafał Łuczun with Codex</p> <h2>Context</h2> <p>The <a href="/kb/incidents/4471-review/">review of #4471</a> shows that subjects and browser-derived
intake tags do not reliably identify a defect. An incident can contain several causes.
This proposal replaces <a href="/kb/decisions/0001-dedupe-by-subject/">0001</a> when accepted by the desk.
Record 0001 is preserved unchanged.</p> <h2>Decision</h2> <p>Read the body and consult tenant locale, booking form version and channel. Merge only
when the cause is demonstrated to be the same. For this snapshot, <code>causes.ts</code> distinguishes
the shared month-first parser from the booking-v3 month-first hint on a day-first form.
Do not use browser locale, intake tags or subject equality as the deciding evidence.</p> <p>Count each report ID once. Keep evidence that contradicts a classification visible and
request a reproduction. Missing tenants or an unexplained symptom need investigation;
leave them apart until a cause is established. Reconcile new arrivals while the desk works.</p> <h2>Examples and consequences</h2> <!> <p>This original explorer demonstrates the exported tenant/form/channel classifier only.
Its “same cause — merge” label is preliminary; it does not read the bodies or establish
that merging is justified. Apply the evidence checks above before any merge.</p> <p>This takes more reading than subject matching, but prevents a queued fix from hiding a
different defect. It also merges different subjects that describe the same cause. Review
the rule when new products, forms or symptoms appear; the current classifier covers only
the date problems evidenced in this export.</p> <!>`,1);function y(o,r){const n=u(r,["children","$$slots","$$events","$$legacy"]);l(o,m(()=>n,()=>e,{children:(i,w)=>{var t=v(),s=a(h(t),14);f(s,{});var d=a(s,6);b(d,{get signature(){return g}}),c(i,t)},$$slots:{default:!0}}))}const C=Object.freeze(Object.defineProperty({__proto__:null,default:y,metadata:e},Symbol.toStringTag,{value:"Module"}));export{C as _,y as a};
