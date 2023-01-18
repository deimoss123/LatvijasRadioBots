import atskanot from './atskanot/atskanot';
import apturet from './apturet/apturet';
import ephemeralEmbed from '../utils/ephemeralEmbed';
import { ChatInputApplicationCommandData, ChatInputCommandInteraction } from 'discord.js';

export interface Command {
  config: ChatInputApplicationCommandData;
  run: (i: ChatInputCommandInteraction<'cached'>) => void;
}

export const commandList: Command[] = [atskanot, apturet];

export default function commandHandler(i: ChatInputCommandInteraction) {
  if (!i.inCachedGuild()) {
    return i.reply(ephemeralEmbed('Latvijas Radio botu var izmantot tikai serveros')).catch(_ => _);
  }

  const command = commandList.find(cmd => cmd.config.name === i.commandName);
  if (command) command.run(i);
}
