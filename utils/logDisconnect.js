import chalk from 'chalk';

export default function logDisconnect(i) {
  console.log(
    [
      new Date().toLocaleString(),
      chalk.blueBright(`[${i.guild.name}]`),
      chalk.yellow('Atskaņošana pārtraukta'),
    ].join(' '),
  );
}