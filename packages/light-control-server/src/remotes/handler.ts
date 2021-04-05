import {
  RemoteButtonPress,
  Button,
  logging,
  PressAction,
} from 'light-control-lib';
import { AnyAction, handleAction } from '../actions';

const { makeLog, warning } = logging;
const log = makeLog('lcs:remotes:handler');

const remoteButtonActions: Map<string, Map<Button, Map<PressAction, AnyAction[]>>> = new Map();

export async function handleButton({ remote, button, action: pressaction } : RemoteButtonPress)
: Promise<void> {
  if (button) {
    const actions = remoteButtonActions?.get(remote)?.get(button)?.get(pressaction);
    if (actions) await Promise.all(actions.map(handleAction));
    else log('Not action for', { remote, button, pressaction });
  } else {
    log(warning(`No button mapped for received buttonevent on remote ${remote}`));
  }
}

export function useRemoteMapping({
  remote,
  button,
  action: pressaction,
} : RemoteButtonPress, action: AnyAction): void {
  if (!remoteButtonActions.has(remote)) remoteButtonActions.set(remote, new Map());
  const actionForRemote = remoteButtonActions.get(remote);
  if (actionForRemote && !actionForRemote.has(button)) actionForRemote.set(button, new Map());
  const actionForButton = actionForRemote?.get(button);
  if (actionForButton && !actionForButton.has(pressaction)) actionForButton.set(pressaction, []);
  actionForButton?.get(pressaction)?.push(action);
}
