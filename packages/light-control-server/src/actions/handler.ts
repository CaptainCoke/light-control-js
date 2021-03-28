import { logging } from 'light-control-lib';
import { recallScene } from './recall-scene';
import { groupAction } from './group-action';
import { AnyAction } from './types';

const { makeLog, error } = logging;
const log = makeLog('lcs:actions:handler');

export async function handleAction(action: AnyAction): Promise<void> {
  if ('scene' in action) {
    await recallScene(action);
  } else if ('action' in action) {
    await groupAction(action);
  } else {
    log(error('Unsupported action', action));
  }
}
