const glob = require('glob');
const fs = require('fs');
let { ignored_namespaces, namespace } = JSON.parse(process.argv[2]);
if ( !namespace || namespace == undefined ) namespace = 'test';
if ( !ignored_namespaces || ignored_namespaces == undefined ) ignored_namespaces = [];

glob('@(B|R)P/@(blocks|items|entities|entity|recipes|attachables|particles|fogs)/**/*.json', (err, files) => {
	files.forEach(f => {
		let file = JSON.parse(fs.readFileSync(f, 'utf-8'));
		const tlos = [
			'minecraft:block',
			'minecraft:item',
			'minecraft:entity',
			'minecraft:client_entity',
			'minecraft:recipe_furnace',
			'minecraft:recipe_shaped',
			'minecraft:recipe_shapeless',
			'minecraft:recipe_brewing_mix',
			'minecraft:recipe_brewing_container',
			'minecraft:attachable',
			'particle_effect',
			'minecraft:fog_settings'
		];
		let identifier;
		tlos.forEach(tlo => { if (file[tlo]) identifier = file[tlo].description.identifier.split(':', 2); });
		if (identifier == undefined) return;
		if (identifier.length == 1) {
			console.log(`Setting the namespace for ${f}`);
			identifier[1] = identifier[0];
			identifier[0] = namespace;
		} else {
			if (ignored_namespaces.includes(identifier[0]) || identifier[0] == 'minecraft' || identifier[0] == 'minecon') return;
			console.log(`Replacing the namespace for ${f}`)
			identifier[0] = namespace;
		}
		tlos.forEach(tlo => { if (file[tlo]) file[tlo].description.identifier = identifier.join(':'); });

		fs.writeFile(f, JSON.stringify(file, null, '\t'), err => { if (err) throw err; });
	});
});