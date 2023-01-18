import { Client, Intents } from 'discord.js';
import commandHandler from './commands/commandHandler.js';
import setBotPresence from './utils/setBotPresence.js';
import chalk from 'chalk';
import validateEnv from './utils/validateEnv.js';
import 'dotenv/config';

if (!validateEnv()) process.exit(1);

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES],
});

client.once('ready', bot => {
  console.log(`${chalk.yellow(bot.user.tag)} logged in`);

  setBotPresence(bot);

  // katru stundu
  setInterval(() => setBotPresence(bot), 3_600_000);
});

client.on('interactionCreate', async i => {
  if (i.isCommand()) await commandHandler(i);
});

client.login(process.env.TOKEN);
