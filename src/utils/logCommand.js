import chalk from 'chalk';

export default function logCommand(i) {
  console.log(
    [
      new Date().toLocaleString('en-GB'),
      chalk.blueBright(`[${i.guild.name}]`),
      chalk.bold(`${i.member.displayName}`),
      chalk.gray(`(${i.member.id})`),
      i.toString().substring(1),
    ].join(' ')
  );
}
