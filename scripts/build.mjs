import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const target = process.argv[2] ?? 'public';
const result = spawnSync(
  process.execPath,
  [require.resolve('dumi/bin/dumi.js'), 'build', ...process.argv.slice(3)],
  {
    stdio: 'inherit',
    env: { ...process.env, DOCS_TARGET: target },
    windowsHide: true,
  },
);

if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
