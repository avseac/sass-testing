import fs from 'node:fs';
import path from 'node:path';
import * as sass from 'sass'

const idir = 'scss';
const odir = 'css';
const compressCSS = false;

if (!fs.existsSync(odir)) {
	fs.mkdirSync(odir);
}

fs.readdirSync(odir).forEach(f => fs.rmSync(`${odir}/${f}`));

fs.readdir(idir, (err, files) => {
	if (err) throw err;
	
	const fullIpath = files.map(f => path.join(idir, f));
	const fullOpath = files.map(f => path.join(odir, [...f.split('.').slice(0, -1), 'css'].join('.')));

	for (const file of files) {

		const idx = files.indexOf(file);
		const result = sass.compile(fullIpath[idx], { style: (compressCSS) ? 'compressed' : 'expanded' });

		fs.writeFileSync(fullOpath[idx], result.css);
	}
})