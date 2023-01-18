import { EmbedBuilder } from 'discord.js';

export default function apturetEmbed() {
  return {
    embeds: [new EmbedBuilder().setDescription('Radio atskaņošana apturēta')],
  };
}
