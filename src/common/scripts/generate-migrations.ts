import { execSync } from 'child_process';

const name = process.argv[2];

if (!name) {
  console.error('Migration name is required');
  process.exit(1);
}

execSync(
  `typeorm-ts-node-commonjs migration:generate -d ./src/db/datasource.ts ./src/db/migrations/${name}`,
  { stdio: 'inherit' },
);
