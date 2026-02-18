import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

function hashContent(content) {
    return createHash('sha256').update(content).digest('hex').slice(0, 10);
}

function minifyCss(source) {
    return source
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}:;,>+~])\s*/g, '$1')
        .replace(/;}/g, '}')
        .trim();
}

function minifyJs(source) {
    const withoutBlockComments = source.replace(/\/\*[\s\S]*?\*\//g, '');
    const compactLines = withoutBlockComments
        .split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('//'));

    return compactLines.join('\n');
}

async function removeOldFingerprintedAssets() {
    const files = await fs.readdir(ROOT);
    const oldAssets = files.filter(file =>
        /^style\.[a-f0-9]{10}\.min\.css$/.test(file) ||
        /^script\.[a-f0-9]{10}\.min\.js$/.test(file)
    );

    await Promise.all(oldAssets.map(file => fs.unlink(path.join(ROOT, file))));
}

async function updateHtmlReferences(cssFile, jsFile) {
    const files = await fs.readdir(ROOT);
    const htmlFiles = files.filter(file => file.endsWith('.html'));

    await Promise.all(htmlFiles.map(async file => {
        const fullPath = path.join(ROOT, file);
        const original = await fs.readFile(fullPath, 'utf8');
        const updated = original
            .replace(/href="style(?:\.[a-f0-9]{10}\.min)?\.css"/g, `href="${cssFile}"`)
            .replace(/src="script(?:\.[a-f0-9]{10}\.min)?\.js"/g, `src="${jsFile}"`);

        if (updated !== original) {
            await fs.writeFile(fullPath, updated, 'utf8');
        }
    }));
}

async function main() {
    const cssSource = await fs.readFile(path.join(ROOT, 'style.css'), 'utf8');
    const jsSource = await fs.readFile(path.join(ROOT, 'script.js'), 'utf8');

    const cssMin = minifyCss(cssSource);
    const jsMin = minifyJs(jsSource);

    const cssFile = `style.${hashContent(cssMin)}.min.css`;
    const jsFile = `script.${hashContent(jsMin)}.min.js`;

    await removeOldFingerprintedAssets();
    await fs.writeFile(path.join(ROOT, cssFile), cssMin, 'utf8');
    await fs.writeFile(path.join(ROOT, jsFile), jsMin, 'utf8');
    await updateHtmlReferences(cssFile, jsFile);

    console.log(`Built ${cssFile} and ${jsFile}`);
}

await main();
