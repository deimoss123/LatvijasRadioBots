import { MessageEmbed, VoiceBasedChannel } from 'discord.js';
import { RadioName } from '../../radioList';

export default function atskanotEmbed(
  chosenRadio: RadioName,
  channel: VoiceBasedChannel,
  memberCount: number,
  imgUrl: string,
  color: string
) {
  return {
    embeds: [
      new MessageEmbed()
        .setTitle('Radio atskaņošana')
        .setDescription(`Tiek atskaņots **${chosenRadio}**`)
        .addField('Balss kanāls', `<#${channel.id}>`, true)
        .addField('Klausītāju skaits', `${memberCount || 0}`, true)
        .setThumbnail(imgUrl)
        // TODO: noņemt
        // @ts-ignore
        .setColor(color),
    ],
  };
}
