import radioInfo, { RadioName } from '../../radioList';
import {
  createAudioPlayer,
  createAudioResource,
  entersState,
  getVoiceConnection,
  joinVoiceChannel,
  VoiceConnectionStatus,
} from '@discordjs/voice';
import atskanotConfig from './atskanotConfig';
import logCommand from '../../utils/logCommand';
import atskanotEmbed from './atskanotEmbed';
import logDisconnect from '../../utils/logDisconnect';
import ephemeralEmbed from '../../utils/ephemeralEmbed';
import { Command } from '../commandHandler';

const atskanot: Command = {
  config: atskanotConfig,
  async run(i) {
    const { channel } = i.member.voice;

    if (!channel) {
      return i
        .reply(ephemeralEmbed('❌ Pievienojies balss kanālam lai atskaņotu radio'))
        .catch(_ => _);
    }

    const bot = i.guild.members.me!;

    if (!channel.viewable) {
      return i
        .reply(ephemeralEmbed(`❌ Bots neredz kanālu ${channel}, tāpēc tam nevar pievienoties`))
        .catch(_ => _);
    }

    if (!channel.joinable) {
      return i
        .reply(ephemeralEmbed(`❌ Botam nav atļaujas pievienoties kanālam ${channel}`))
        .catch(_ => _);
    }

    const chosenRadio = i.options.getString('radio') as RadioName;
    if (!chosenRadio || !radioInfo[chosenRadio]) {
      return i
        .reply(ephemeralEmbed('❌ Šis radio neeksistē, lūdzu, izvēlies kādu radio no saraksta'))
        .catch(_ => _);
    }

    const { img, url, color } = radioInfo[chosenRadio];

    let currentConnection = getVoiceConnection(i.guildId);
    if (channel.id !== bot.voice.channelId) {
      currentConnection?.destroy();
      currentConnection = undefined;
    }

    let connection = currentConnection;

    // if (connection?.player?.radioUrl === chosenRadio) {
    //   return i
    //     .reply(ephemeralEmbed(`❌ Balss kanālā jau tiek atskaņots **${chosenRadio}**`))
    //     .catch(_ => _);
    // }

    let memberCount = channel.members.size;
    if (bot.voice.channel && bot.voice.channelId === channel.id) memberCount--;

    i.reply(atskanotEmbed(chosenRadio, channel, memberCount, img, color)).catch(_ => _);
    logCommand(i);

    if (!connection) {
      connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guildId,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });

      // ja bots zaudē savienojumu tad mēģinās atsākt atskaņošanu
      connection.on(VoiceConnectionStatus.Disconnected, async () => {
        try {
          await Promise.race([
            entersState(connection!, VoiceConnectionStatus.Signalling, 5_000),
            entersState(connection!, VoiceConnectionStatus.Connecting, 5_000),
          ]);
        } catch (e) {
          try {
            connection?.destroy();
            // eslint-disable-next-line no-empty
          } catch (e) {}
        }
      });

      connection.once(VoiceConnectionStatus.Destroyed, () => {
        connection?.player.stop(true);
        connection?.removeAllListeners();
        logDisconnect(i);
      });

      // neliela šizofrēnija
      connection.player = createAudioPlayer();
    }

    connection.subscribe(connection.player);

    const audioResource = createAudioResource(url);
    connection.player.play(audioResource);
    connection.player.radioUrl = chosenRadio;

    connection.setSpeaking(true);

    if (currentConnection) return;

    // ik 5 sekundes pārbauda vai bots ir viens pats balss kanālā vai arī bots ir atvienots
    let isAlone = false;
    while (!isAlone) {
      if (connection.state.status === VoiceConnectionStatus.Destroyed) return;

      isAlone = await new Promise(res => {
        setTimeout(() => res(!bot?.voice?.channel || bot.voice.channel.members.size <= 1), 5000);
      });
    }

    try {
      connection.destroy();
      // eslint-disable-next-line no-empty
    } catch (e) {}
  },
};

export default atskanot;
