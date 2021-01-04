import fs from 'fs';
import { recallScene } from './recall-scene.js';
import { groupAction } from './group-action.js';
import { makeLog, warning } from 'light-control-lib/src/logging.js';

const log = makeLog('lcs:action');

const remoteButtonActions = JSON.parse(fs.readFileSync('config/remote-button-actions.json', 'utf8'));

function decodeAndPerformAction(what) {
  const { group, scene, action } = what;
  if (group && scene) recallScene(group, scene);
  else if (group && action) groupAction(group, action);
  else log(warning('Unsupported button action'), what);
}

export function reactOnButton({ remote, button, action: pressaction }) {
  if (button) {
    const action = remoteButtonActions?.[remote]?.[button];
    if (action) decodeAndPerformAction(action);
    else log('Not action for', { remote, button, pressaction });
  } else {
    log(warning(`No button map for ${buttonevent} on remote ${remote}`));
  }
}

export default {
  reactOnButton,
};
