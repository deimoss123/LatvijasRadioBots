const atskanotConfig = {
  name: 'atskaņot',
  description: 'Atskaņot radio balss kanālā',
  options: [
    {
      name: 'radio',
      description: 'Izvēlēties radio staciju',
      required: true,
      type: 'STRING',
      choices: [
        {
          name: 'Latvijas Radio 1',
          value: 'Latvijas Radio 1',
        }, {
          name: 'Latvijas Radio 2',
          value: 'Latvijas Radio 2',
        }, {
          name: 'Latvijas Radio 3',
          value: 'Latvijas Radio 3',
        }, {
          name: 'Latvijas Radio 4',
          value: 'Latvijas Radio 4',
        }, {
          name: 'Latvijas Radio 5',
          value: 'Latvijas Radio 5',
        }, {
          name: 'Radio SWH',
          value: 'Radio SWH',
        }, {
          name: 'Radio Skonto',
          value: 'Radio Skonto',
        }, {
          name: 'Latgolys Radeja',
          value: 'Latgolys Radeja',
        }, {
          name: 'Latvijas Kristigais Radio',
          value: 'Latvijas Kristigais Radio',
        },
      ].map(({ name, value }) => ({ name: '🎧 ' + name, value })),
    },
  ],
};

export default atskanotConfig;