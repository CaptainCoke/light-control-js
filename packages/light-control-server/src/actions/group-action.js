import { GroupResource } from 'light-control-lib';
import { makeLog, info } from 'light-control-lib/src/logging.js';

const log = makeLog('lcs:action');

export async function groupAction(gid, action) {
  log(info(`Performing group action on ${gid}:`), action);
  const group = await GroupResource.detail(gid);
  group.setAction(action);
}

export default {
  groupAction,
};
