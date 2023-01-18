import { EmbedBuilder } from 'discord.js';

export default function ephemeralEmbed(description: string, imageUrl: string | null = null) {
  return {
    embeds: [new EmbedBuilder().setDescription(description).setColor('#ffffff').setImage(imageUrl)],
    ephemeral: true,
  };
}
