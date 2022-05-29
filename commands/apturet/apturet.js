import apturetConfig from './apturetConfig.js';
import { getVoiceConnection } from '@discordjs/voice';
import ephemeralReplyEmbed from '../../utils/ephemeralReplyEmbed.js';
import apturetEmbed from './apturetEmbed.js';

const apturet = {
  config: apturetConfig,
  async run(i) {
    const { guildId } = i;
    const { channel } = i.member.voice;

    const bot = await i.guild.members.cache.get(process.env.BOTID);
    const botChannel = bot.voice.channel;

    const connection = getVoiceConnection(guildId);

    if (!botChannel || !connection) {
      return i.reply(ephemeralReplyEmbed('Pašlaik netiek atskaņots radio'));
    }

    if (channel?.id !== botChannel.id) {
      return i.reply(ephemeralReplyEmbed('Nevar apturēt atskaņošanu, jo tu neesi vienā balss kanālā ar botu'));
    }

    await i.reply(apturetEmbed());

    try {
      connection.destroy();
    } catch (e) {}
  },
};

export default apturet;