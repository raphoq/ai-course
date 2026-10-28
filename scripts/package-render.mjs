import fs from 'node:fs';
const root = new URL('../', import.meta.url);
// Refresh generated site files; evidence screenshots live outside this directory.
fs.rmSync(new URL('rendered/', root), { recursive: true, force: true });
fs.cpSync(new URL('build/', root), new URL('rendered/', root), { recursive: true });
console.log('Copied the complete static site to rendered/. Serve this directory as the HTTP root.');
