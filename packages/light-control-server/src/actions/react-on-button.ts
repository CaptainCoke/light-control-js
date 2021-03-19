import fs from 'fs';
import { RemoteButtonPress, GroupActionTransition, logging } from 'light-control-lib';
import { recallScene, RequestedScene } from './recall-scene';
import { groupAction } from './group-action';

const { makeLog, warning } = logging;
const log = makeLog('lcs:action');

const remoteButtonActions = JSON.parse(fs.readFileSync('config/remote-button-actions.json', 'utf8'));

type ButtonAction = {
  group: number,
  scene?: RequestedScene,
  action?: GroupActionTransition,
}

function decodeAndPerformAction(what: ButtonAction) {
  const { group, scene, action } = what;
  if (group && scene) recallScene(group, scene);
  else if (group && action) groupAction(group, action);
  else log(warning('Unsupported button action'), what);
}

export function reactOnButton({ remote, button, action: pressaction } : RemoteButtonPress): void {
  if (button) {
    const action = remoteButtonActions?.[remote]?.[button];
    if (action) decodeAndPerformAction(action);
    else log('Not action for', { remote, button, pressaction });
  } else {
    log(warning(`No button mapped for received buttonevent on remote ${remote}`));
  }
}

export default {
  reactOnButton,
};
