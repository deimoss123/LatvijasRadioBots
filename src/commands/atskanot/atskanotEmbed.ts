import { EmbedBuilder, VoiceBasedChannel } from 'discord.js';
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
      new EmbedBuilder()
        .setTitle('Radio atskaņošana')
        .setDescription(`Tiek atskaņots **${chosenRadio}**`)
        .addFields(
          { name: 'Balss kanāls', value: `${channel}`, inline: true },
          { name: 'Klausītāju skaits', value: `${memberCount || 0}`, inline: true }
        )
        .setThumbnail(imgUrl)
        // TODO: noņemt
        // @ts-ignore
        .setColor(color),
    ],
  };
}
