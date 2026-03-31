import { build, context } from 'esbuild';
import { copyFileSync, mkdirSync } from 'fs';

mkdirSync('dist', { recursive: true });

const isWatch = process.argv.includes('--watch');

const opts = {
  entryPoints: ['src/code.ts'],
  bundle: true,
  outfile: 'dist/code.js',
  target: 'es2020',
  format: 'iife',
};

copyFileSync('src/ui.html', 'dist/ui.html');
console.log('✓ ui.html copied');

if (isWatch) {
  const ctx = await context(opts);
  await ctx.watch();
  console.log('Watching src/code.ts …');
} else {
  await build(opts);
  console.log('✓ code.js built');
}
