export default function validateEnv() {
  let isValid = true;

  const requiredEnvVars = ['TOKEN', 'BOTID', 'DEV_GUILD_ID'];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.log(`MISSING ${envVar}`);
      isValid = false;
    }
  }

  return isValid;
}