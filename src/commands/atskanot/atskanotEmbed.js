import { MessageEmbed } from 'discord.js';

export default function atskanotEmbed(chosenRadio, channel, memberCount, imgUrl, color) {
  return {
    embeds: [
      new MessageEmbed()
        .setTitle('Radio atskaņošana')
        .setDescription(`Tiek atskaņots **${chosenRadio}**`)
        .addField('Balss kanāls', `<#${channel.id}>`, true)
        .addField('Klausītāju skaits', `${memberCount || 0}`, true)
        .setThumbnail(imgUrl)
        .setColor(color),
    ],
  };
}
