import { ApplicationCommandOptionType, ChatInputApplicationCommandData } from 'discord.js';
import radioInfo from '../../radioList';

const atskanotConfig: ChatInputApplicationCommandData = {
  name: 'atskaņot',
  description: 'Atskaņot radio balss kanālā',
  dmPermission: false,
  options: [
    {
      name: 'radio',
      description: 'Izvēlēties radio staciju',
      required: true,
      type: ApplicationCommandOptionType.String,
      choices: Object.keys(radioInfo).map(radio => ({ name: `🎧 ${radio}`, value: radio })),
    },
  ],
};

export default atskanotConfig;
