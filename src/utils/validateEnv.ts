import chalk from 'chalk';

export default function validateEnv() {
  let isValid = true;

  const requiredEnvVars: (keyof NodeJS.ProcessEnv)[] = ['TOKEN', 'DEV_GUILD_ID'];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.log(chalk.red('MISSING ENV VAR: ') + envVar);
      isValid = false;
    }
  }

  return isValid;
}
