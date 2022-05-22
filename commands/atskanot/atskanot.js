import radioInfo from '../../radioInfo.js'
import {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from '@discordjs/voice'
import embedTemplate from '../../embedTemplate.js';
import chalk from 'chalk'
import atskanotConfig from './atskanotConfig.js';
import logCommand from '../../utils/logCommand.js';

export let connections = {}

const atskanot = {
  config: atskanotConfig,
  async run(i) {
    const { guildId } = i
    const { channel } = i.member.voice

    if (!channel) {
      await i.editReply(embedTemplate({
        description: 'Pievienojies balss kanālam lai atskaņotu radio'
      }))
      return
    }

    logCommand(i)

    const chosenRadio = i.options.getString('radio')

    const { img, url, color } = radioInfo[chosenRadio]

    let memberCount = channel.members.size
    const bot = await i.guild.members.cache.get(process.env.BOTID)
    if (bot.voice.channel) memberCount--

    await i.editReply(embedTemplate({
      title: 'Radio atskaņošana',
      description: `Tiek atskaņots **${chosenRadio}** \n`,
      fields: [{
        name: 'Balss kanāls: ',
        value: `<#${channel.id}>`,
        inline: true
      }, {
        name: 'Klausītāju skaits:',
        value: `${memberCount}`,
        inline: true
      }],
      url: img,
      color
    }))

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guildId,
      adapterCreator: channel.guild.voiceAdapterCreator,
    })

    connections[guildId] = connection

    const resource = createAudioResource(url)
    const player = createAudioPlayer()

    player.play(resource)
    connection.subscribe(player)

    // viss šitais kods ir šizofrēnija
    const checkIfAlone = async () => {
      await setTimeout(async () => {
        const bot = await i.guild.members.cache.get(process.env.BOTID)

        if (!bot.voice.channel) return

        if (channel.members.size <= 1) {

          setTimeout(() => {
            if (bot.voice.channel) {

              console.log([
                new Date().toLocaleString(),
                chalk.blueBright(`[${i.guild.name}]`),
                chalk.yellow(`Izgāja no balss kanāla (neaktivitāte)`),
                bot.voice.channel.name,
              ].join(' '))

              try {
                player.stop()
                connection.destroy()
              } catch (e) {
                console.error(e)
              }
            }
          }, 10000)

          return
        }
        await checkIfAlone()
      }, 10000)
    }

    await checkIfAlone()
  },
}

export default atskanot