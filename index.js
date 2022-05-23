import { Intents, Client } from 'discord.js'
import dotenv from 'dotenv'
import cron from 'node-cron'
import commandHandler from './commands/commandHandler.js'
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

client.on('interactionCreate', async i => {
  if (i.isCommand()) await commandHandler(i)
})

client.login(process.env.TOKEN).then(() => {
  console.log('Bot logged in')
  setBotPresence(client)

  // katru dienu plkst 00:00
  cron.schedule('0 0 * * *', () => {
    setBotPresence(client)
  })
})
