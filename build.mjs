import { build, context } from 'esbuild';
import { copyFileSync, mkdirSync } from 'fs';

mkdirSync('dist', { recursive: true });

const isWatch = process.argv.includes('--watch');

const codeOpts = {
  entryPoints: ['src/code.ts'],
  bundle: true,
  outfile: 'dist/code.js',
  target: 'es2017',
  format: 'iife',
};

const glossaryOpts = {
  entryPoints: ['src/glossary-lookup.mjs'],
  bundle: true,
  outfile: 'dist/glossary-lookup.js',
  target: 'es2017',
  format: 'iife',
  globalName: 'FintechGlossary',
};

copyFileSync('src/ui.html', 'dist/ui.html');
console.log('✓ ui.html copied');

async function buildAll() {
  await build(glossaryOpts);
  console.log('✓ glossary-lookup.js built');
  await build(codeOpts);
  console.log('✓ code.js built');
}

if (isWatch) {
  await buildAll();
  const ctxCode = await context(codeOpts);
  const ctxGl = await context(glossaryOpts);
  await ctxCode.watch();
  await ctxGl.watch();
  console.log('Watching src/code.ts + src/glossary-lookup.mjs …');
} else {
  await buildAll();
}
