// Packages
const glob = require('glob');
const fs = require('fs-extra');

// Variables
const types = [ 'keys', 'find' ];

// Defaults
let settings = process.argv[2];
let type = 'keys';
let ignoredNamespaces = [ 'minecraft', 'minecon' ];
let oldNamespace = 'namespace'
let namespace = 'newNamespace';
// User
try {
	settings = JSON.parse(settings);
	type = settings.type || type;
	ignoredNamespaces = settings.ignoredNamespaces || type;
	oldNamespace = settings.oldNamespace || oldNamespace;
	namespace = JSON.parse(fs.readFileSync('../../config.json', 'utf-8')).namespace || namespace;
} catch {}


if (!types.includes(type)) return console.error('The filter will fail due to an invalid type setting.');
glob('@(B|R)P/**/*.json', (err, files) => {
	files.forEach(f => {
		// Setup
		let file = JSON.parse(fs.readFileSync(f, 'utf-8'));
		eval(`${type}()`);

		function keys() {
			file = JSON.stringify(file, (key, val) => {
				function replaceNamespace(string) {
					let ns = string;
					let args = ns.split(/ +/);
					for ( i = 0; i < args.length; i++ ) {
						if ( args[i].includes(':') ) {
							ns = args[i].split(':', 2);
							if (!ignoredNamespaces.includes(ns[0])) {
								ns[0] = namespace;
								args[i] = ns.join(':');
							}
						}
					}
					ns = args.join(' ');
					return ns;
				}
				if (typeof val != 'string') return (replaceNamespace(key), val);
				return (replaceNamespace(key), replaceNamespace(val));
			}, '\t');
		}

		function find() {
			file = JSON.stringify(file, null, '\t');
			file = file.replace(new RegExp(oldNamespace, 'g'), namespace);
			if (!f.includes(oldNamespace)) return;
			const newPath = f.replace(new RegExp(oldNamespace, 'g'), namespace);
			fs.moveSync(f, newPath);
		}

		fs.outputFileSync(f, file, 'utf-8');
	});
});

if (type == 'find') glob('@(B|R)P/**/', (err, files) => files.forEach(f => { if (f.endsWith(`${oldNamespace}/`)) fs.removeSync(f); }));