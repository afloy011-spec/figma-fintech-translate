import { build, context } from 'esbuild';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';

mkdirSync('dist', { recursive: true });

const isWatch = process.argv.includes('--watch');

const glossaryOpts = {
  entryPoints: ['src/glossary-lookup.mjs'],
  bundle: true,
  outfile: 'dist/glossary-lookup.js',
  target: 'es2017',
  format: 'iife',
  globalName: 'FintechGlossary',
};

/* Inline the bundled glossary into ui.html. The Figma UI is shown from a single
   HTML string (figma.showUI), so a relative `<script src="glossary-lookup.js">`
   never resolves inside the plugin iframe — without inlining, FintechGlossary is
   undefined at runtime and the glossary substring matching silently never runs. */
function writeInlinedUi() {
  const ui = readFileSync('src/ui.html', 'utf8');
  const gl = readFileSync('dist/glossary-lookup.js', 'utf8');
  const tag = '<script src="glossary-lookup.js"></script>';
  if (!ui.includes(tag)) {
    throw new Error('build: expected `' + tag + '` in src/ui.html');
  }
  writeFileSync('dist/ui.html', ui.replace(tag, '<script>\n' + gl + '\n</script>'));
  console.log('✓ ui.html built (glossary inlined)');
}

function codeBuildOptions() {
  const uiHtml = readFileSync('dist/ui.html', 'utf8');
  return {
    entryPoints: ['src/code.ts'],
    bundle: true,
    outfile: 'dist/code.js',
    target: 'es2017',
    format: 'iife',
    define: {
      __html__: JSON.stringify(uiHtml),
    },
  };
}

async function buildAll() {
  await build(glossaryOpts);
  console.log('✓ glossary-lookup.js built');
  writeInlinedUi();
  await build(codeBuildOptions());
  console.log('✓ code.js built');
}

if (isWatch) {
  await buildAll();
  const ctxCode = await context(codeBuildOptions());
  const ctxGl = await context(glossaryOpts);
  await ctxCode.watch();
  await ctxGl.watch();
  console.log('Watching src/code.ts + src/glossary-lookup.mjs …');
} else {
  await buildAll();
}
