import { promises as fs } from 'fs';
import {
  Button,
  PressAction,
  SensorResource,
  logging,
} from 'light-control-lib';
import { AnyAction, ChangeSceneAction, ChangeGroupAction } from '../actions';
import { useRemoteMapping } from './handler';

const { makeLog, notice } = logging;
const log = makeLog('lcs:remotes:config');

async function getRemoteId(remoteIdOrName: string | number): Promise<string> {
  function remoteWithMatchesNameOrId(sensor: SensorResource) {
    if (!sensor.hasButtons()) return false;
    if (Number.isInteger(remoteIdOrName)) return sensor.id === `${remoteIdOrName}`;
    return sensor.get('name') === remoteIdOrName;
  }

  const { resources: sensors } = await SensorResource.list();
  const matchingRemote = sensors.find(remoteWithMatchesNameOrId);
  if (matchingRemote) {
    const { id } = matchingRemote;
    return id;
  }
  throw new Error(`No remote found that matches ${remoteIdOrName}`);
}

function getButton(buttonName: string): Button {
  const button = buttonName as Button;
  if (Object.values(Button).includes(button)) return button;
  throw new Error(`no such button ${buttonName}`);
}

function getPressAction(pressName: string): PressAction {
  const pressAction = pressName as PressAction;
  if (Object.values(PressAction).includes(pressAction)) return pressAction;
  throw new Error(`no such press action ${pressName}`);
}

function getAnyAction(actionObject: Record<string, unknown>): AnyAction {
  if (actionObject.group) {
    if (actionObject.scene) return actionObject as ChangeSceneAction;
    if (actionObject.action) return actionObject as ChangeGroupAction;
  }
  throw new Error(`Unknown action ${actionObject}`);
}

export async function useRemoteMappingFromFile(filename: string): Promise<void> {
  const config = JSON.parse(await fs.readFile(filename, 'utf8'));
  if (!Array.isArray(config)) throw new Error('invalid file format');
  const promises = config.map(async ([remote, button, pressAction, action]) => useRemoteMapping({
    remote: await getRemoteId(remote),
    button: getButton(button),
    action: getPressAction(pressAction),
  }, getAnyAction(action)));
  const handlers = await Promise.all(promises);
  log(notice(`${handlers.length} remote button mappings loaded`));
}
