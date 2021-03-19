import { GroupResource, GroupActionTransition, logging } from 'light-control-lib';

const { makeLog, info } = logging;
const log = makeLog('lcs:action');

export async function groupAction(gid: number, action: GroupActionTransition): Promise<void> {
  log(info(`Performing group action on ${gid}:`), action);
  const group = await GroupResource.detail(gid);
  group.setAction(action);
}

export default {
  groupAction,
};
