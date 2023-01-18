import { Client } from 'discord.js';

export default function setBotPresence(client: Client<true>) {
  const guildCount = client.guilds.cache.size;

  client.user.setActivity(`/atskaņot | ${guildCount} serveros`, { type: 'PLAYING' });
  client.user.setPresence({ status: 'online' });
}
