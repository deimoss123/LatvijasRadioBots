import apturetConfig from './apturetConfig.js';
import { getVoiceConnection } from '@discordjs/voice';
import ephemeralEmbed from '../../utils/ephemeralEmbed.js';
import apturetEmbed from './apturetEmbed.js';

const apturet = {
  config: apturetConfig,
  async run(i) {
    const { guildId } = i;
    const { channel } = i.member.voice;

    const bot = await i.guild.members.cache.get(process.env.BOT_ID);
    const botChannel = bot.voice.channel;

    const connection = getVoiceConnection(guildId);
    
    if (!botChannel || !connection) {
      return i.reply(ephemeralEmbed('Pašlaik netiek atskaņots radio'));
    }

    if (channel?.id !== botChannel.id) {
      return i.reply(ephemeralEmbed('Nevar apturēt atskaņošanu, jo tu neesi vienā balss kanālā ar botu'));
    }

    await i.reply(apturetEmbed());

    try {
      connection.destroy();
    } catch (e) {}
  },
};

export default apturet;