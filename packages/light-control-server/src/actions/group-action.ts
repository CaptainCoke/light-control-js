import { GroupResource, logging } from 'light-control-lib';
import { ChangeGroupAction } from './types';

const { makeLog, info } = logging;
const log = makeLog('lcs:actions:groups');

export async function groupAction({ group: gid, action }: ChangeGroupAction): Promise<void> {
  log(info(`Performing group action on ${gid}:`), action);
  const group = await GroupResource.detail(gid);
  group.setAction(action);
}

export default {
  groupAction,
};
