const glob = require('glob');
const fs = require('fs');
const querystring = require('querystring');
const https = require('https');

function jsonMinify(t){var e,n,r,s,g,x=/"|(\/\*)|(\*\/)|(\/\/)|\n|\r/g,o=!1,i=!1,l=!1,u=[],a=0,c=0;for(x.lastIndex=0;e=x.exec(t);)r=RegExp.leftContext,s=RegExp.rightContext,i||l||(n=r.substring(c),o||(n=n.replace(/(\n|\r|\s)+/g,"")),u[a++]=n),g=c,c=x.lastIndex,'"'!=e[0]||i||l?"/*"!=e[0]||o||i||l?"*/"!=e[0]||o||!i||l?"//"!=e[0]||o||i||l?"\n"!=e[0]&&"\r"!=e[0]||o||i||!l?i||l||/\n|\r|\s/.test(e[0])||(u[a++]=e[0]):l=!1:l=!0:i=!1:i=!0:(n=r.substring(g).match(/\\+$/),o&&n&&n[0].length%2!=0||(o=!o),c--,s=t.substring(c));return u[a++]=s,u.join("")};

glob('@(B|R)P/**/*.json', (err, files) => {
	files.forEach(f => {
		fs.writeFileSync(f, jsonMinify(fs.readFileSync(f, 'utf-8')), 'utf-8');
		console.log(`Minimized ${f}.`);
	});
});

glob('@(B|R)P/**/*.js', (err, files) => {
	files.forEach(f => {
		const query = querystring.stringify({ input: fs.readFileSync(f, 'utf-8') });
		const stream = fs.createWriteStream(f, 'utf-8');
		
		const req = https.request({ method: 'POST', hostname: 'www.toptal.com', path: '/developers/javascript-minifier/raw', }, (resp) => resp.pipe(stream));
		req.on('error', err => { throw (err) });
		req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
		req.setHeader('Content-Length', query.length);
		req.end(query, 'utf8');
	});
});