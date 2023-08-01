const fs = require('fs');
const glob = require('globl');

let contents = {content:[{path:'contents.json'}]};
glob.sync('BP/**/*').forEach(file => contents.content.push({path:file.slice(3)}));
fs.writeFileSync('BP/contents.json', JSON.stringify(contents), 'utf-8');
console.log('BP Contents Created.');

contents = {content:[{path:'contents.json'}]};
glob.sync('RP/**/*').forEach(file => contents.content.push({path:file.slice(3)}));
fs.writeFileSync('RP/contents.json', JSON.stringify(contents), 'utf-8');
console.log('RP Contents Created.');