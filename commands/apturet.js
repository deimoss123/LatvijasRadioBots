import { embedTemplate } from '../embed.js'
import { connections } from './atskanot.js'

export default {
  config: {
    name: 'apturēt',
    description: 'Apturēt radio atskaņošanu'
  },

  run: async i => {
    const { guildId } = i
    const { channel } = i.member.voice

    const bot = await i.guild.members.cache.get(process.env.BOTID)
    const botChannel = bot.voice.channel

    if (!botChannel) {
      await i.editReply(embedTemplate(
        'Apturēšanas kļūda',
        'Pašlaik netiek atskaņots radio',))
      return
    }

    if (channel?.id !== botChannel.id) {
      await i.editReply(embedTemplate(
        'Apturēšanas kļūda',
        'Nevar apturēt atskaņošanu, jo tu neesi vienā balss kanālā ar botu',))
      return
    }

    await i.editReply(embedTemplate(
      'Apturēt',
      'Radio atskaņošana apturēta',))

    await connections[guildId]?.destroy()
  }
}