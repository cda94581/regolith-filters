const fs = require('fs-extra');
const { profile } = JSON.parse(process.argv[2]) ?? 'dev'
const { target } = eval(`JSON.parse(fs.readFileSync('../../config.json', 'utf-8')).regolith.profiles.${profile}.export`);
if (target != 'exact') return console.log('Export target is not \'exact\'. Skipping backup.');
const { rpPath, bpPath } = eval(`JSON.parse(fs.readFileSync('../../config.json', 'utf-8')).regolith.profiles.${profile}.export`);
const now = Date.now();

fs.copySync(`${rpPath}`, `../../backup/${now}/RP`);
fs.copySync(`${bpPath}`, `../../backup/${now}/BP`);