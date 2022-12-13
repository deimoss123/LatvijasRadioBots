import atskanot from './atskanot/atskanot.js';
import apturet from './apturet/apturet.js';
import ephemeralEmbed from '../utils/ephemeralEmbed.js';

export const commandList = [atskanot, apturet];

export default function commandHandler(i) {
  if (!i.inGuild()) {
    return i.reply(ephemeralEmbed('Latvija Radio botu var izmantot tikai serveros')).catch(_ => _);
  }

  const command = commandList.find(cmd => cmd.config.name === i.commandName);
  if (command) command.run(i);
}
