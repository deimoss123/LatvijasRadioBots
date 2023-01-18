import chalk from 'chalk';
import { CommandInteraction } from 'discord.js';

export default function logDisconnect(i: CommandInteraction<'cached'>) {
  console.log(
    [
      new Date().toLocaleString('en-GB'),
      chalk.blueBright(`[${i.guild.name}]`),
      chalk.yellow('Atskaņošana pārtraukta'),
    ].join(' ')
  );
}
