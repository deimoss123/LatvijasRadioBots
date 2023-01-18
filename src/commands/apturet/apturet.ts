import apturetConfig from './apturetConfig';
import { getVoiceConnection } from '@discordjs/voice';
import ephemeralEmbed from '../../utils/ephemeralEmbed';
import apturetEmbed from './apturetEmbed';
import { Command } from '../commandHandler';

const apturet: Command = {
  config: apturetConfig,
  async run(i) {
    const { guildId } = i;
    const { channel } = i.member.voice;

    const bot = i.guild.members.me!;
    const botChannel = bot.voice.channel;

    const connection = getVoiceConnection(guildId);

    if (!botChannel || !connection) {
      return i.reply(
        ephemeralEmbed(
          '❌ Pašlaik netiek atskaņots radio',
          'https://www.ulmanbots.lv/images/humors/karote.gif'
        )
      );
    }

    if (channel?.id !== botChannel.id) {
      return i
        .reply(
          ephemeralEmbed('❌ Nevar apturēt atskaņošanu, jo tu neesi vienā balss kanālā ar botu')
        )
        .catch(_ => _);
    }

    try {
      await i.reply(apturetEmbed());
      connection.destroy();
      // eslint-disable-next-line no-empty
    } catch (e) {}
  },
};

export default apturet;
