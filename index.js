import { Intents, Client } from 'discord.js'
import dotenv from 'dotenv'

import commandHandler from './commandHandler.js'
import setBotPresence from './utils/setBotPresence.js';

dotenv.config()

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES
  ],
})

client.on('ready', async () => console.log('Bot ready'))

client.on('interactionCreate', async i => {
  if (i.isCommand()) {
    await commandHandler(i)
  }
})

client.login(process.env.TOKEN).then(() => {
  console.log('Bot logged in')
  setBotPresence(client)
})
