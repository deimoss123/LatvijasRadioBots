import embedTemplate from '../../embedTemplate.js';
import { connections } from '../atskanot/atskanot.js'
import apturetConfig from './apturetConfig.js';
import logCommand from '../../utils/logCommand.js';

const apturet = {
  config: apturetConfig,
  async run(i) {
    const { guildId } = i
    const { channel } = i.member.voice

    const bot = await i.guild.members.cache.get(process.env.BOTID)
    const botChannel = bot.voice.channel

    if (!botChannel) {
      await i.editReply(embedTemplate({
        description: 'Pašlaik netiek atskaņots radio'
      }))
      return
    }

    if (channel?.id !== botChannel.id) {
      await i.editReply(embedTemplate({
        description: 'Nevar apturēt atskaņošanu, jo tu neesi vienā balss kanālā ar botu'
      }))
      return
    }

    await i.editReply(embedTemplate({
      description: 'Radio atskaņošana apturēta'
    }))

    await connections[guildId]?.destroy()

    logCommand(i)
  }
}

export default apturet