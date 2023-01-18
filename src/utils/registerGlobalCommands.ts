import { commandList } from '../commands/commandHandler';
import validateEnv from './validateEnv';
import { Client } from 'discord.js';
import 'dotenv/config';
import chalk from 'chalk';

async function registerGuildCommands(client: Client<true>) {
  await client.application.commands.set([...commandList].map(cmd => cmd.config));
  console.log(chalk.green('Global commands registered!'));
  process.exit(0);
}

if (!validateEnv()) process.exit(1);

const client = new Client({ intents: [] });
client.login(process.env.TOKEN).then(() => registerGuildCommands(client));
