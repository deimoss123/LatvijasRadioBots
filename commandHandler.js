import chalk from 'chalk'

export default async (client, botCommands) => {

  const { commands } = client.application

  //commands.create(botCommands.atskanot.default.config)
  //commands.create(botCommands.apturet.default.config)
  //commands.edit('908527403607937074', botCommands.atskanot.default.config)

  client.on('interactionCreate', async i => {
    if (!i.isCommand()) return

    const { commandName } = i

    const cmdkey = Object.keys(botCommands).find(
      cmd => botCommands[cmd].default.config.name === commandName)

    const date = new Date()

    if (cmdkey) {
      await i.deferReply()

      console.log([
        `${date.toLocaleTimeString()} `,
        `${chalk.blueBright(`[${i.guild.name}]`)} `,
        `${chalk.bold(`${i.member.displayName}`)} `,
        `${chalk.gray(`(${i.member.id})`)}: `,
        `${commandName} ${commandName === 'atskaņot' ? i.options.getString('radio') : ''}`
      ].join(''))

      await botCommands[cmdkey].default.run(i)
    }
  })
}

