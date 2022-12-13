export default function setBotPresence(client) {
  const guildCount = client.guilds.cache.size;

  client.user.setActivity(`/atskaņot | ${guildCount} serveros`, { type: 'PLAYING' });
  client.user.setPresence({ status: 'online' });
}
