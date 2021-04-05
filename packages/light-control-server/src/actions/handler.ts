import { logging } from 'light-control-lib';
import { changeScene, toggleScene } from './scene-actions';
import { groupAction } from './group-action';
import { AnyAction } from './types';

const { makeLog, error } = logging;
const log = makeLog('lcs:actions:handler');

function inInterval([begin, end]: [number, number]): boolean {
  const currentHour = new Date().getHours();
  log(begin, currentHour, end);
  // for times intervals on the same day e.g. 12 - 16
  if (begin < end) return begin <= currentHour && currentHour < end;
  // for time intervals across midnight  e.g. 22 - 6
  return begin <= currentHour || currentHour < end;
}

export async function handleAction(action: AnyAction): Promise<void> {
  const { group, hoursOfDay } = action;

  if (hoursOfDay && !inInterval(hoursOfDay)) return;

  if ('changeScene' in action) {
    await changeScene(group, action.changeScene);
  } else if ('toggleScene' in action) {
    await toggleScene(group, action.toggleScene);
  } else if ('action' in action) {
    await groupAction(action);
  } else {
    log(error('Unsupported action', action));
  }
}
