import chalk from 'chalk';
import debug from 'debug';

export const warning = chalk.keyword('orange');
export const notice = chalk.gray;
export const info = chalk.bgGreen.black;

export function makeLog(namespace: string): debug.Debugger {
  const log = debug(namespace);
  // eslint-disable-next-line no-console
  log.log = console.log.bind(console);
  return log;
}

export default {
  warning,
  notice,
  info,
  makeLog,
};
