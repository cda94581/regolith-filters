const glob = require('glob');
const fs = require('fs');

glob('RP/**/*.json', (err, files) => {
	files.forEach(f => {
		const min = JSON.stringify(JSON.parse(fs.readFileSync(f, 'utf-8')));
		console.log(`Minimizing ${f}...`);
		fs.writeFile(f, min, 'utf-8', err => { if (err) throw err; });
	});
});

glob('BP/**/*.json', (err, files) => {
	files.forEach(f => {
		const min = JSON.stringify(JSON.parse(fs.readFileSync(f, 'utf-8')));
		console.log(`Minimizing ${f}...`);
		fs.writeFile(f, min, 'utf-8', err => { if (err) throw err; });
	});
});