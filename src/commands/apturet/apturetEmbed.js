import { MessageEmbed } from 'discord.js';

export default function apturetEmbed() {
  return {
    embeds: [
      new MessageEmbed()
        .setDescription('Radio atskaņošana apturēta'),
    ],
  };
}