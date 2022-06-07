import radioInfo from '../../radioInfo.js';
import {
  createAudioPlayer,
  createAudioResource,
  entersState,
  getVoiceConnection,
  joinVoiceChannel,
  VoiceConnectionStatus,
} from '@discordjs/voice';
import atskanotConfig from './atskanotConfig.js';
import logCommand from '../../utils/logCommand.js';
import atskanotEmbed from './atskanotEmbed.js';
import logDisconnect from '../../utils/logDisconnect.js';
import ephemeralEmbed from '../../utils/ephemeralEmbed.js';

const atskanot = {
  config: atskanotConfig,
  async run(i) {
    const { channel } = i.member?.voice;

    if (!channel) return i.reply(ephemeralEmbed('Pievienojies balss kanālam lai atskaņotu radio'));

    const bot = await i.guild.members.cache.get(process.env.BOT_ID);

    if (!channel.permissionsFor(bot).has('CONNECT')) {
      return i.reply(ephemeralEmbed('Botam nav atļauts pievienoties šim balss kanālam'));
    }

    const currentConnection = getVoiceConnection(i.guildId);
    currentConnection?.destroy?.();

    logCommand(i);

    const chosenRadio = i.options.getString('radio');
    const { img, url, color } = radioInfo[chosenRadio];

    let memberCount = channel.members.size;
    if (bot.voice.channel && bot.voice.channelId === channel.id) memberCount--;

    await i.reply(atskanotEmbed(chosenRadio, channel, memberCount, img, color));

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guildId,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    const resource = createAudioResource(url);
    const player = createAudioPlayer();

    player.play(resource);
    connection.subscribe(player);

    // ja bots zaudē savienojumu tad mēģinās atsākt atskaņošanu
    // connection.on('disconnected', async () => {
    //   try {
    //     await Promise.race([
    //       entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
    //       entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
    //     ]);
    //   } catch (e) {
    //     try {
    //       connection.destroy();
    //     } catch (e) {}
    //   }
    // });

    connection.once('destroyed', () => {
      player.stop()
      logDisconnect(i)
    });

    // ik 60 sekundes pārbauda vai bots ir viens pats balss kanālā vai arī bots ir atvienots
    let isAlone = false;
    while (!isAlone) {
      if (connection.state.status === VoiceConnectionStatus.Destroyed) return;

      connection.setSpeaking(true);

      isAlone = await new Promise(res => {
        setTimeout(async () => {
          const bot = await i.guild.members.cache.get(process.env.BOT_ID);
          if (!bot?.voice?.channel || bot.voice.channel.members.size <= 1) res(true);
          res(false);
        }, 60000);
      });
    }

    try {
      connection.destroy();
    } catch (e) {}
  },
};

export default atskanot;