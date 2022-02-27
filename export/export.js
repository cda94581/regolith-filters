const archiver = require('archiver');
const fs = require('fs');
const { name } = JSON.parse(fs.readFileSync('../../config.json', 'utf-8'));

let settings = process.argv[2];
let exclude = [];
try {
	settings = JSON.parse(settings);
	exclude = settings.exclude;
} catch {}

const output = fs.createWriteStream(`../../${name}.mcaddon`, 'utf-8');
const archive = archiver('zip', { zlib: { level: 9 }});

['bp', 'rp'].filter(x => !exclude.some(y => y.toLowerCase() == x)).forEach(x => { archive.directory(x.toUpperCase(), x.toLowerCase()); });
archive.on('error', err => console.error(err));
archive.pipe(output);
archive.finalize();