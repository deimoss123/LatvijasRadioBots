export default function setBotPresence(client) {
  client.user.setActivity('/atskaņot', {type: 'LISTENING' })
  client.user.setPresence({
    game: { name: '/atskaņot'},
    status: 'online'
  })
}