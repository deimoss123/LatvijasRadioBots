import radioInfo from '../../radioInfo.js';
import {
  createAudioPlayer,
  createAudioResource,
  entersState,
  getVoiceConnection,
  joinVoiceChannel,
  NoSubscriberBehavior,
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
    
    const chosenRadio = i.options.getString('radio');
    const { img, url, color } = radioInfo[chosenRadio];
    
    let currentConnection = getVoiceConnection(i.guildId);
    if (channel.id !== bot.voice.channelId) {
      currentConnection?.destroy();
      currentConnection = undefined;
    }
    
    let connection = currentConnection;
    
    if (connection?.player?.radioUrl === chosenRadio) {
      return i.reply(ephemeralEmbed(`Balss kanālā jau tiek atskaņots **${chosenRadio}**`));
    }
    
    let memberCount = channel.members.size;
    if (bot.voice.channel && bot.voice.channelId === channel.id) memberCount--;
    
    await i.reply(atskanotEmbed(chosenRadio, channel, memberCount, img, color));
    logCommand(i);
    
    if (!connection) {
      connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guildId,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });
      
      // neliela šizofrēnija
      connection.player = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Stop } });
    }
    
    connection.player.radioUrl = chosenRadio;
    connection.player.play(createAudioResource(url));
    connection.subscribe(connection.player);
    connection.setSpeaking(true);
    
    // ja bots zaudē savienojumu tad mēģinās atsākt atskaņošanu
    connection.on('disconnected', async () => {
      try {
        await Promise.race([
          entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
          entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
        ]);
      } catch (e) {
        try {
          connection.destroy();
        } catch (e) {}
      }
    });
    
    connection.once('destroyed', () => {
      // console.log(player.state)
      connection.removeAllListeners();
      logDisconnect(i);
    });
    
    if (currentConnection) return;
    
    // ik 60 sekundes pārbauda vai bots ir viens pats balss kanālā vai arī bots ir atvienots
    let isAlone = false;
    while (!isAlone) {
      if (connection.state.status === VoiceConnectionStatus.Destroyed) return;
      
      isAlone = await new Promise(res => {
        setTimeout(async () => {
          const bot = await i.guild.members.cache.get(process.env.BOT_ID);
          if (!bot?.voice?.channel || bot.voice.channel.members.size <= 1) res(true);
          res(false);
        }, 5000);
      });
    }
    
    try {
      connection.destroy();
    } catch (e) {}
  },
};

export default atskanot;