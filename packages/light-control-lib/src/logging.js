import chalk from 'chalk';
import debug from 'debug';

export const warning = chalk.keyword('orange');
export const notice = chalk.gray;
export const info = chalk.bgGreen.black;

export function makeLog(namespace) {
  const log = debug(namespace);
  log.log = console.log.bind(console);
  return log;
}

export default {
  warning,
  notice,
  info,
  makeLog,
};
