import { promises as fs } from 'fs';
import {
  isArray,
  isNumber,
  isString,
  isUndefined,
} from 'ts-util-is';
import {
  Button,
  PressAction,
  SensorResource,
  logging,
  GroupResource,
  DeconzResource,
  isGroupActionTransition,
} from 'light-control-lib';
import {
  AnyAction,
  RequestedScene,
  isHoursOfDay,
} from '../actions';
import { useRemoteMapping } from './handler';

const { makeLog, notice } = logging;
const log = makeLog('lcs:remotes:config');

async function getResourceId<T extends typeof DeconzResource>(
  ResourceType: T, idOrName: string | number,
): Promise<string> {
  function resourceWhichMatchesNameOrId(resource: DeconzResource) {
    if (Number.isInteger(idOrName)) return resource.id === `${idOrName}`;
    return resource.get('name') === idOrName;
  }

  const { resources } = await ResourceType.list();
  const matchingResource = resources.find(resourceWhichMatchesNameOrId);
  if (matchingResource) {
    const { id } = matchingResource;
    return id;
  }
  throw new Error(`No ${ResourceType} found that matches ${idOrName}`);
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

async function getSceneRequest(gid: string, scene: unknown): Promise<RequestedScene> {
  const { scene: idOrName, offset } = scene as Record<string, unknown>;
  if (isString(idOrName) || isNumber(idOrName)) {
    const group = await GroupResource.detail(gid);
    return { scene: await getResourceId(group.scenes(), idOrName) };
  }
  if (Number.isInteger(offset)) {
    return { offset: Number.parseInt(`${offset}`, 10) };
  }
  throw new Error(`Unknown scene request ${scene}`);
}

async function getAnyAction(actionObject: Record<string, unknown>): Promise<AnyAction> {
  const {
    group: idOrName,
    hoursOfDay,
    changeScene,
    toggleScene,
    action,
  } = actionObject;

  if (!(isString(idOrName) || isNumber(idOrName))) throw new Error(`Unknown group for ${actionObject}`);
  const group = await getResourceId(GroupResource, idOrName);

  if (!(isUndefined(hoursOfDay) || isHoursOfDay(hoursOfDay))) throw new Error(`Unknown hours of day for ${actionObject}`);

  const anyAction = { group, hoursOfDay };

  if (changeScene) return { ...anyAction, changeScene: await getSceneRequest(group, changeScene) };
  if (toggleScene) return { ...anyAction, toggleScene: await getSceneRequest(group, toggleScene) };
  if (isGroupActionTransition(action)) return { ...anyAction, action };
  throw new Error(`Unknown action ${actionObject}`);
}

export async function useRemoteMappingFromFile(filename: string): Promise<void> {
  const config = JSON.parse(await fs.readFile(filename, 'utf8'));
  if (!isArray(config)) throw new Error('invalid file format');
  const promises = config.map(async ([remote, button, pressAction, action]) => useRemoteMapping({
    remote: await getResourceId(SensorResource, remote),
    button: getButton(button),
    action: getPressAction(pressAction),
  }, await getAnyAction(action)));
  const handlers = await Promise.all(promises);
  log(notice(`${handlers.length} remote button mappings loaded`));
}
