import { EmbedBuilder, HexColorString, VoiceBasedChannel } from 'discord.js';
import { RadioName } from '../../radioList';

const PIESPRAUDE_EMOJI = '<:piespraude:1172581024430043187>';

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
        .setTitle(`Radio atskaņošana`)
        .setDescription(
          (process.env.PIESPRAUDE === 'true' ? `${PIESPRAUDE_EMOJI} ` : '') +
            `Tiek atskaņots **${chosenRadio}**`
        )
        .addFields(
          { name: 'Balss kanāls', value: `${channel}`, inline: true },
          { name: 'Klausītāju skaits', value: `${memberCount || 0}`, inline: true }
        )
        .setThumbnail(imgUrl)
        .setColor(color as HexColorString),
    ],
  };
}
