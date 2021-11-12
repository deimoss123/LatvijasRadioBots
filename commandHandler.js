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

    if (cmdkey) {
      await i.deferReply()
      await botCommands[cmdkey].default.run(i)
    }
  })
}

