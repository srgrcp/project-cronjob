#!/usr/bin/env node

import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import { Config } from './config';
import { buildJobs } from './job';
import { join } from 'path';

async function main() {
  const configFile = await readFile(
    join(__dirname, '../', 'config.yaml'),
    'utf8'
  );
  const config: Config[] = parse(configFile);

  console.log('Starting cronjobs...');

  const jobs = buildJobs(config);
  jobs.forEach((job) => job.start());

  console.log('cronjobs started successfuly');
}

main();
