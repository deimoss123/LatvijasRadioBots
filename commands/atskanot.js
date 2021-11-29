import { Constants } from 'discord.js'

import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from '@discordjs/voice'

import { embedTemplate } from '../embed.js'
import chalk from 'chalk'

export let connections = {}

const radio = {
  'Latvijas Radio 1': {
    img: 'https://i.postimg.cc/j5QsYwK8/lr1.png',
    url: 'https://60766ff53d5e6.streamlock.net/liveALR1/mp4:LR1/playlist.m3u8',
    color: 0xe00008
  },
  'Latvijas Radio 2': {
    img: 'https://i.postimg.cc/mkLTLLgT/lr2.png',
    url: 'https://5a44e5b800a41.streamlock.net/shoutcast/mp4:lr2a.stream/playlist.m3u8',
    color: 0xffcc00
  },
  'Latvijas Radio 3': {
    img: 'https://i.postimg.cc/vmnYX2Kw/lr3.png',
    url: 'https://60766ff53d5e6.streamlock.net/liveALR3/mp4:klasika/playlist.m3u8',
    color: 0x000000
  },
  'Latvijas Radio 4': {
    img: 'https://i.postimg.cc/sXRVL9FQ/lr4.png',
    url: 'https://5a44e5b800a41.streamlock.net/shoutcast/mp4:lr4a.stream/playlist.m3u8',
    color: 0x307fe2
  },
  'Latvijas Radio 5': {
    img: 'https://i.postimg.cc/jqcs87M2/lr5.png',
    url: 'https://live.pieci.lv/live19-hq.mp3',
    color: 0x9464fa
  },
  'Radio SWH': {
    img: 'https://i.postimg.cc/63DMZ6J0/sw-h.jpg',
    url: 'https://live.radioswh.lv:8443/swhmp3',
    color: 0xf67f21
  },
  'Radio Skonto': {
    img: 'https://i.postimg.cc/D0LBPV7K/skonto.jpg',
    url: 'http://stream.radioskonto.lv:8002/stereo',
    color: 0xef3e36
  },
  'Latgolys Radeja': {
    img: 'https://i.postimg.cc/sgqfYCwJ/latgales.jpg',
    url: 'http://195.13.253.51:8000/128_mp3',
    color: 0x155f0a
  },
  'Latvijas Kristigais Radio': {
    img: 'https://i.postimg.cc/P5Prv5zx/kristigais.jpg',
    url: 'http://91.228.7.124:7007/;?type=http&nocache=905',
    color: 0x643c78
  },
}

export default {
  config: {
    name: 'atskaņot',
    description: 'Atskaņot radio balss kanālā',
    options: [
      {
        name: 'radio',
        description: 'Izvēlēties radio staciju',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING,
        choices: [
          {
            name: 'Latvijas Radio 1',
            value: 'Latvijas Radio 1',
          }, {
            name: 'Latvijas Radio 2',
            value: 'Latvijas Radio 2',
          }, {
            name: 'Latvijas Radio 3',
            value: 'Latvijas Radio 3',
          }, {
            name: 'Latvijas Radio 4',
            value: 'Latvijas Radio 4',
          }, {
            name: 'Latvijas Radio 5',
            value: 'Latvijas Radio 5',
          }, {
            name: 'Radio SWH',
            value: 'Radio SWH'
          }, {
            name: 'Radio Skonto',
            value: 'Radio Skonto'
          }, {
            name: 'Latgolys Radeja',
            value: 'Latgolys Radeja',
          }, {
            name: 'Latvijas Kristigais Radio',
            value: 'Latvijas Kristigais Radio',
          },
        ],
      },
    ],
  },

  run: async i => {
    const { guildId } = i
    const { channel } = i.member.voice

    if (!channel) {
      await i.editReply(embedTemplate(
        'Atskaņošanas kļūda',
        'Pievienojies balss kanālam lai atskaņotu radio'))
      return
    }

    console.log(i.commandId)

    const chosenRadio = i.options.getString('radio')

    const { img, url, color } = radio[chosenRadio]

    await i.editReply(embedTemplate(
      'Atskaņot',
      `Tiek atskaņots **${chosenRadio}** \n` +
      `Balss kanāls: <#${channel.id}>`,
      img, color))

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

    const checkIfAlone = async () => {
      await setTimeout(async () => {
        const bot = await i.guild.members.cache.get(process.env.BOTID)

        if (!bot.voice.channel) return

        if (channel.members.size <= 1) {

          setTimeout(() => {
            if (bot.voice.channel) {

              const date = new Date()

              console.log([
                `${date.toLocaleTimeString()} `,
                `${chalk.blueBright(`[${i.guild.name}]`)} `,
                `${chalk.yellow(`Izgāja no balss kanāla (neaktivitāte)`)} - `,
                `${bot.voice.channel.name}`,
              ].join(''))

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