import { Constants } from 'discord.js'
import { radio } from '../radioInfo.js'

import {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from '@discordjs/voice'

import embedTemplate from '../embedTemplate.js';
import chalk from 'chalk'

export let connections = {}

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
      await i.editReply(embedTemplate({
        description: 'Pievienojies balss kanālam lai atskaņotu radio'
      }))
      return
    }

    const chosenRadio = i.options.getString('radio')

    const { img, url, color } = radio[chosenRadio]

    let membercount = channel.members.size
    const bot = await i.guild.members.cache.get(process.env.BOTID)
    if (bot.voice.channel) membercount--

    await i.editReply(embedTemplate({
      title: 'Radio atskaņošana',
      description: `Tiek atskaņots **${chosenRadio}** \n`,
      fields: [{
        name: 'Balss kanāls: ',
        value: `<#${channel.id}>`,
        inline: true
      }, {
        name: 'Klausītāju skaits:',
        value: `${membercount}`,
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

    const checkIfAlone = async () => {
      await setTimeout(async () => {
        const bot = await i.guild.members.cache.get(process.env.BOTID)

        if (!bot.voice.channel) return

        if (channel.members.size <= 1) {

          setTimeout(() => {
            if (bot.voice.channel) {

              const date = new Date()

              console.log([
                `${date.toLocaleDateString('en-GB')} `,
                `${date.toLocaleTimeString('en-GB')} `,
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