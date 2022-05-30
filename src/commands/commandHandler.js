import atskanot from './atskanot/atskanot.js';
import apturet from './apturet/apturet.js';

export const commandList = [atskanot, apturet];

export default async function commandHandler(i) {
  if (!i.guild) {
    await i.reply('Latvija Radio botu var izmantot tikai serveros');
    return;
  }

  const command = commandList.find(cmd => cmd.config.name === i.commandName);
  if (!command) return;

  await command.run(i);
}

