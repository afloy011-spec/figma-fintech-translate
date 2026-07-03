import { build, context } from 'esbuild';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';

mkdirSync('dist', { recursive: true });

const isWatch = process.argv.includes('--watch');

/* Pure ES-module bundles inlined into ui.html at build time. The Figma UI is
   shown from a single HTML string (figma.showUI), so a relative
   `<script src="...">` never resolves inside the plugin iframe — without
   inlining, the globals are undefined at runtime and the glossary/formatting
   logic silently never runs. Each entry exposes an IIFE global consumed by the
   inline shims in ui.html. */
const inlineBundles = [
  { entry: 'src/glossary-lookup.mjs', outfile: 'dist/glossary-lookup.js', globalName: 'FintechGlossary', tag: '<script src="glossary-lookup.js"></script>' },
  { entry: 'src/glossary-data.mjs',   outfile: 'dist/glossary-data.js',   globalName: 'FintechData',     tag: '<script src="glossary-data.js"></script>' },
  { entry: 'src/text-format.mjs',     outfile: 'dist/text-format.js',     globalName: 'FintechText',     tag: '<script src="text-format.js"></script>' },
];

const glossaryOpts = inlineBundles.map((b) => ({
  entryPoints: [b.entry],
  bundle: true,
  outfile: b.outfile,
  target: 'es2017',
  format: 'iife',
  globalName: b.globalName,
}));

function writeInlinedUi() {
  let ui = readFileSync('src/ui.html', 'utf8');
  for (const b of inlineBundles) {
    if (!ui.includes(b.tag)) {
      throw new Error('build: expected `' + b.tag + '` in src/ui.html');
    }
    const js = readFileSync(b.outfile, 'utf8');
    ui = ui.replace(b.tag, '<script>\n' + js + '\n</script>');
  }
  writeFileSync('dist/ui.html', ui);
  console.log('✓ ui.html built (glossary + data + text-format inlined)');
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
  for (const opts of glossaryOpts) await build(opts);
  console.log('✓ inline bundles built');
  writeInlinedUi();
  await build(codeBuildOptions());
  console.log('✓ code.js built');
}

if (isWatch) {
  await buildAll();
  const ctxCode = await context(codeBuildOptions());
  const glCtxs = [];
  for (const opts of glossaryOpts) glCtxs.push(await context(opts));
  await ctxCode.watch();
  for (const c of glCtxs) await c.watch();
  console.log('Watching src/code.ts + inline module bundles …');
} else {
  await buildAll();
}
