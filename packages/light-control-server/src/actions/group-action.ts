import { GroupResource, GroupActionTransition } from 'light-control-lib/src/index';
import { makeLog, info } from 'light-control-lib/src/logging';

const log = makeLog('lcs:action');

export async function groupAction(gid: number, action: GroupActionTransition): Promise<void> {
  log(info(`Performing group action on ${gid}:`), action);
  const group = await GroupResource.detail(gid);
  group.setAction(action);
}

export default {
  groupAction,
};
