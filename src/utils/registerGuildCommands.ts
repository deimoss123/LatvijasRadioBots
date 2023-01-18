import { commandList } from '../commands/commandHandler';
import dotenv from 'dotenv';
import validateEnv from './validateEnv';
import { Client, Intents } from 'discord.js';

async function registerGuildCommands(client: Client<true>) {
  const guild = await client.guilds.fetch(process.env.DEV_GUILD_ID!);

  await guild.commands.set([...commandList].map(cmd => cmd.config)).then(() => {
    console.log('Guild commands registered!');
    process.exit(0);
  });
}

dotenv.config();

if (!validateEnv()) process.exit(1);

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.login(process.env.TOKEN).then(() => registerGuildCommands(client));
