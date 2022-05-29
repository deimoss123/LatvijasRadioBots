import { MessageEmbed } from 'discord.js';

export default function ephemeralReplyEmbed(description) {
  return {
    embeds: [
      new MessageEmbed()
        .setDescription(description)
        .setColor('#ffffff'),
    ],
    ephemeral: true,
  };
}