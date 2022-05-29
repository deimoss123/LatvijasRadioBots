import embedTemplate from '../../embeds/embedTemplate.js';
import apturetConfig from './apturetConfig.js';
import { getVoiceConnection } from '@discordjs/voice';
import ephemeralReply from '../../embeds/ephemeralReply.js';

const apturet = {
  config: apturetConfig,
  async run(i) {
    const { guildId } = i;
    const { channel } = i.member.voice;

    const bot = await i.guild.members.cache.get(process.env.BOTID);
    const botChannel = bot.voice.channel;

    const connection = getVoiceConnection(guildId);

    if (!botChannel || !connection) {
      return i.reply(ephemeralReply('Pašlaik netiek atskaņots radio'));
    }

    if (channel?.id !== botChannel.id) {
      return i.reply(ephemeralReply('Nevar apturēt atskaņošanu, jo tu neesi vienā balss kanālā ar botu'));
    }

    await i.reply(embedTemplate({
      description: 'Radio atskaņošana apturēta',
    }));

    try {
      connection.destroy();
    } catch (e) {}
  },
};

export default apturet;