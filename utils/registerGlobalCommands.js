import { commandList } from '../commandHandler.js';
import dotenv from 'dotenv';
import validateEnv from './validateEnv.js';
import { Client, Intents } from 'discord.js';

async function registerGuildCommands(client) {
  await client.application.commands.set([...commandList].map(cmd => cmd.config)).then(() => {
    console.log('Global commands registered!')
    process.exit(0)
  })
}

dotenv.config()

if (!validateEnv()) process.exit(1)

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
client.login(process.env.TOKEN).then(() => registerGuildCommands(client))
