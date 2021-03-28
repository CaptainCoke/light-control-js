import {
  GroupResource,
  logging,
  ResourceType,
  EventType,
  MessageFormat,
} from 'light-control-lib';
import { addEventHandler } from './handler';

const { makeLog, error } = logging;
const log = makeLog('lcs:events:groups');

async function updateGroup(id: number) {
  const group = await GroupResource.detail(id);
  await group.update();
  group.print();
}

function onGroupChanged(message: MessageFormat): void {
  if (message.e === EventType.changed && message.r === ResourceType.groups) {
    const { id } = message;
    updateGroup(id);
  } else {
    log(error('Incompatible message received:'), message);
  }
}

function onSceneRecalled(message: MessageFormat): void {
  if (message.e === EventType.sceneCalled) {
    const { gid, scid } = message;
    log(`Scene ${scid} of group ${gid} was recalled`);
    updateGroup(gid);
  } else {
    log(error('Incompatible message received:'), message);
  }
}

export function useGroupEvents(): void {
  addEventHandler(ResourceType.scenes, EventType.sceneCalled, onSceneRecalled);
  addEventHandler(ResourceType.groups, EventType.changed, onGroupChanged);
}
