import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';
import cron from 'node-cron';
import commandHandler from './commands/commandHandler.js';
import setBotPresence from './utils/setBotPresence.js';
import chalk from 'chalk';

dotenv.config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

client.once('ready', bot => {
  console.log(`${chalk.yellow(bot.user.tag)} logged in`);

  setBotPresence(bot);

  // katru dienu plkst 00:00
  cron.schedule('0 0 * * *', () => setBotPresence(bot), {});
});

client.on('interactionCreate', async i => {
  if (i.isCommand()) await commandHandler(i);
});

client.login(process.env.TOKEN);