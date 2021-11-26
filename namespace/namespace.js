const glob = require('glob');
const fs = require('fs-extra');

// Defaults
let settings = process.argv[2];
let type = 'keys';
let ignoredNamespaces = [ 'minecraft', 'minecon' ];
let oldNamespace = 'namespace'
let namespace = 'newNamespace';
// User
try {
	settings = JSON.parse(settings);
	type = settings.type;
	ignoredNamespaces = settings.ignoredNamespaces;
	oldNamespace = settings.oldNamespace;
	namespace = JSON.parse(fs.readFileSync('../../config.json', 'utf-8')).namespace;
} catch {}

glob('@(B|R)P/@(blocks|items|entities|entity|recipes|attachables|particles|fogs)/**/*.json', (err, files) => {
	files.forEach(f => {
		// Setup
		let file = JSON.parse(fs.readFileSync(f, 'utf-8'));
		eval(`${type}()`);

		function keys() {
			return console.log('The type "keys" is temporarily disabled due to active development.');
		// 	const tlos = [
		// 		'minecraft:block',
		// 		'minecraft:item',
		// 		'minecraft:entity',
		// 		'minecraft:client_entity',
		// 		'minecraft:recipe_furnace',
		// 		'minecraft:recipe_shaped',
		// 		'minecraft:recipe_shapeless',
		// 		'minecraft:recipe_brewing_mix',
		// 		'minecraft:recipe_brewing_container',
		// 		'minecraft:attachable',
		// 		'particle_effect',
		// 		'minecraft:fog_settings'
		// 	];
		// 	let type;
		// 	tlos.forEach(tlo => { if (file[tlo]) type = tlo; });
	
		// 	// Generate Data
		// 	function keyify (obj, prefix = '') {
		// 		let keys = Object.keys(obj);
		// 		for ( let i = 0; i < keys.length; i++ ) {
		// 			const preKey = prefix + keys[i];
		// 			if ( !Array.isArray(obj[keys[i]]) && obj[keys[i]] != null && typeof obj[keys[i]] == 'object' ) keys.push(...keyify(obj[keys[i]], preKey + '.' ));
		// 			else keys[i] = preKey;
		// 		};
		// 		return keys;
		// 	}
		// 	const nsPaths = keyify(file[type]).filter(path => path.endsWith('.event'));
		// 	console.log(nsPaths);
		// 	// Somehow I need to find all the "event" keys, as well as the events and component groups. Hmm
	
		// 	// Replace namespaces
		// 	nsPaths.forEach(path => {
		// 		const ns = eval(`file[type][${path}].split(':', 2)`);
		// 		if (!ns) return;
		// 		if (ns.length == 1) {
		// 			console.log(`Setting the namespace for ${f} -> ${path}`);
		// 			ns = [ namespace, ns[0] ];
		// 		} else {
		// 			if (ignoredNamespaces.includes(ns[0])) return;
		// 			console.log(`Replacing the namespace for ${f} -> ${path}`);
		// 			ns[0] = namespace;
		// 		}
		// 		eval(`file[type][${path}]`) = ns.join(':');
		// 	});
		}

		function find() {
			file = JSON.stringify(file, null, '\t');
			file = file.replace(new RegExp(oldNamespace, 'g'), namespace);
			file = JSON.parse(file);
			if (f.match(new RegExp(oldNamespace))) {
				fs.unlinkSync(f);
				f = f.replace(new RegExp(oldNamespace, 'g'), namespace);
			}
		}

		// Write out file
		fs.outputFileSync(f, JSON.stringify(file, null, '\t'), err => { if (err) throw err; });
	});
});