const archiver = require('archiver');
const glob = require('glob');
const fs = require('fs');
const { name } = JSON.parse(fs.readFileSync('../../config.json', 'utf-8'));
const { ROOT_DIR } = process.env;
const formatCodes = require('./formatCodes.json');

let settings = process.argv[2];
let output = `${name}.mcaddon`;
let variables = {};
let exclude = [];
let include = [];
try {
	settings = JSON.parse(settings);
	output = settings.output || output;
	variables = settings.variables || variables;
	exclude = settings.exclude || exclude;
	include = settings.include || include;
} catch {}

for ([key, value] of Object.entries(variables)) output = output.replaceAll(`{{${key}}}`, value);
output = `${ROOT_DIR}/${output}`;

const stream = fs.createWriteStream(output, 'utf-8');
const archive = archiver('zip', { zlib: { level: 9 }});

['bp', 'rp'].filter(x => !exclude.some(y => y.toLowerCase() == x)).forEach(x => { archive.directory(x.toUpperCase(), x.toLowerCase()); });
include.forEach(f => {
	let { source } = f;
	let sourcePath;
	if (f.fromRoot) sourcePath = `${ROOT_DIR}/${source}`;
	else sourcePath = `data/${source}`;
	const stats = fs.statSync(sourcePath, { throwIfNoEntry: false });
	if (!stats) return console.error(`File does not exist (skipping file): ${source}`);
	const name = (f.path || source).split('/');

	if (stats.isDirectory()) {
		const files = glob.sync(`${sourcePath}/**/*`);
		if (f.format && f.format != 'none') {
			const fixF = new Map();
			files.forEach(file => {
				const s = fs.statSync(file);
				if (s.isDirectory()) return;
				const text = fs.readFileSync(file, 'utf-8');
				const fix = f.format == 'txt' ? formatText(text) : formatMd(text);
				fixF.set(file, fix);
			});
			fixF.forEach((fix, file) => {
				const name2 = file.slice(sourcePath.length);
				archive.append(fix, { name: name + name2 });
			});
		}
		else archive.directory(sourcePath, name[name.length - 1]);
	}
	else {
		const text = fs.readFileSync(sourcePath, 'utf-8');
		const fix = f.format == 'txt' ? formatText(text) : formatMd(text);
		archive.append(fix, { name: name[name.length - 1] });
	}
});

archive.on('error', console.error);
archive.pipe(stream);
archive.finalize();

function formatText(text) {
	text = text.replaceAll(new RegExp('§.', 'g'), '');
	return text;
}

function formatMd(text) {
	const valid = Object.keys(formatCodes);
	const matches = [...text.matchAll(`§[${valid.join('')}r]`)];
	let resetSpan = '';
	matches.forEach(match => {
		if (match[0] === '§r') {
			text = text.replace(match[0], resetSpan);
			resetSpan = '';
			return;
		}
		text = text.replace(match[0], `<span style="${formatCodes[match[0][1]]}">`);
		resetSpan += '</span>';
	});
	[...text.matchAll(/.\n[^\n]/g)].forEach(match => text = text.replace(match[0], match[0][0] + '  \n' + match[0][2]));
	return text;
}