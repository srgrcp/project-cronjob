import { CronJob } from 'cron';
import { Config } from './config';
import { execSync } from 'child_process';

export const buildJobs = (config: Config[]) => {
  return config.map((job) =>
    CronJob.from({
      cronTime: job.schedule,
      timeZone: 'UTC-5',
      runOnInit: job.runOnInit,
      onTick: () => {
        console.log(`Running job ${job.name}`);
        const dateString = new Date().toISOString();

        job.commands
          .map((command) => command.replace(/{\s*date\s*}/gim, dateString))
          .forEach((command) => {
            console.log(`Executing command: ${command}`);

            execSync(command, { stdio: 'inherit' });
          });
      },
    })
  );
};
