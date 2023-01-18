import { ActivityType, Client, PresenceUpdateStatus } from 'discord.js';

export default function setBotPresence(client: Client<true>) {
  const guildCount = client.guilds.cache.size;

  client.user.setPresence({
    status: PresenceUpdateStatus.DoNotDisturb,
    activities: [{ name: `/atskaņot | ${guildCount} serveros`, type: ActivityType.Playing }],
  });
}
