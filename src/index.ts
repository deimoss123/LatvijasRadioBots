import { Client, GatewayIntentBits } from 'discord.js';
import commandHandler from './commands/commandHandler';
import setBotPresence from './utils/setBotPresence';
import chalk from 'chalk';
import validateEnv from './utils/validateEnv';
import 'dotenv/config';

if (!validateEnv()) process.exit(1);

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

client.once('ready', bot => {
  console.log(`${chalk.yellow(bot.user.tag)} logged in`);

  setBotPresence(bot);
  setInterval(() => setBotPresence(bot), 3_600_000);
});

client.on('interactionCreate', i => {
  if (i.isChatInputCommand()) commandHandler(i);
});

client.login(process.env.TOKEN);
