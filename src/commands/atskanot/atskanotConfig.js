import radioInfo from '../../radioInfo.js';

const atskanotConfig = {
  name: 'atskaņot',
  description: 'Atskaņot radio balss kanālā',
  dm_permission: false,
  options: [
    {
      name: 'radio',
      description: 'Izvēlēties radio staciju',
      required: true,
      type: 'STRING',
      choices: Object.keys(radioInfo).map((radio) => ({ name: `🎧 ${radio}`, value: radio })),
    },
  ],
};

export default atskanotConfig;
