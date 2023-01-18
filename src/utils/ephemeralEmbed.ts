import { EmbedBuilder } from 'discord.js';

export default function ephemeralEmbed(description: string) {
  return {
    embeds: [new EmbedBuilder().setDescription(description).setColor('#ffffff')],
    ephemeral: true,
  };
}
