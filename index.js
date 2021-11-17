import { Intents, Client } from 'discord.js'
import dotenv from 'dotenv'
import fs from 'fs'

import commandHandler from './commandHandler.js'

dotenv.config()

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES
  ],
})

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
let commands = {}

for (const file of commandFiles) {
  const newfile = file.substring(0, file.length - 3)
  const command = await import(`./commands/${file}`)
  commands[newfile] = command
}

client.once('ready', async () => {
  console.log('ready')
  await commandHandler(client, commands)
})

client.login(process.env.TOKEN).then(() => {
  client.user.setActivity('/atskaņot', {type: 'LISTENING' })
  client.user.setPresence({
    game: { name: '/atskaņot'},
    status: 'online'
  })
})
