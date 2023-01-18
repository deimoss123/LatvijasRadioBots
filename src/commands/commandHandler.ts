import atskanot from './atskanot/atskanot';
import apturet from './apturet/apturet';
import ephemeralEmbed from '../utils/ephemeralEmbed';
import { CommandInteraction } from 'discord.js';

export const commandList = [atskanot, apturet];

export default function commandHandler(i: CommandInteraction) {
  if (!i.inCachedGuild()) {
    return i.reply(ephemeralEmbed('Latvijas Radio botu var izmantot tikai serveros')).catch(_ => _);
  }

  const command = commandList.find(cmd => cmd.config.name === i.commandName);
  if (command) command.run(i);
}
