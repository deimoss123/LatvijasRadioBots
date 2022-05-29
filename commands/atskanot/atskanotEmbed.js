import embedTemplate from '../../embeds/embedTemplate.js';

export default function atskanotEmbed(
  chosenRadio,
  channel,
  memberCount,
  img,
  color,
) {
  return embedTemplate(
    {
      content: Math.random().toString(),
      title: 'Radio atskaņošana',
      description: `Tiek atskaņots **${chosenRadio}** \n`,
      fields: [
        {
          name: 'Balss kanāls: ',
          value: `<#${channel.id}>`,
          inline: true,
        }, {
          name: 'Klausītāju skaits:',
          value: `${memberCount || 0}`,
          inline: true,
        },
      ],
      url: img,
      color,
    },
  );
}