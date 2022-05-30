import chalk from 'chalk';

export default function validateEnv() {
  let isValid = true;

  const requiredEnvVars = ['TOKEN', 'BOT_ID', 'DEV_GUILD_ID'];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.log(chalk.red('MISSING ENV VAR: ') + envVar);
      isValid = false;
    }
  }

  return isValid;
}