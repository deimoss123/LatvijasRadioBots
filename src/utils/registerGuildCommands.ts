import { commandList } from '../commands/commandHandler';
import validateEnv from './validateEnv';
import { Client } from 'discord.js';
import 'dotenv/config';
import chalk from 'chalk';

async function registerGuildCommands(client: Client<true>) {
  const guild = await client.guilds.fetch(process.env.DEV_GUILD_ID);

  await guild.commands.set([...commandList].map(cmd => cmd.config)).then(() => {
    console.log(chalk.green('Guild commands registered!'));
    process.exit(0);
  });
}

if (!validateEnv()) process.exit(1);

const client = new Client({ intents: [] });
client.once('ready', bot => registerGuildCommands(bot));
client.login(process.env.TOKEN);
