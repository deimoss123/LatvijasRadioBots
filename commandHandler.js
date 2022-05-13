import chalk from 'chalk'
import atskanot from './commands/atskanot.js';
import apturet from './commands/apturet.js';

export const commandList = [ atskanot, apturet ]

export default async function commandHandler(i) {
  const command = commandList.find(cmd => cmd.config.name === i.commandName)
  if (!command) return

  await i.deferReply()
  await command.run(i)

  const date = new Date()

  console.log([
    `${date.toLocaleTimeString('en-GB')} `,
    `${chalk.blueBright(`[${i.guild.name}]`)} `,
    `${chalk.bold(`${i.member.displayName}`)} `,
    `${chalk.gray(`(${i.member.id})`)}: `,
    `${command.config.name} ${command.config.name === 'atskaņot' ? i.options.getString('radio') : ''}`
  ].join(''))
}

