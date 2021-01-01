import { GroupResource } from '../groups.js';
import { makeLog, info } from '../logging.js';

const log = makeLog('lcs:action');

export async function recallScene(gid, { id, offset }) {
  const group = await GroupResource.detail(gid);
  const scid = id ?? await group.getRelativeSceneId(offset);
  if (scid) {
    log(info(`Recalling scene ${scid} of group ${gid}`));
    const scene = await group.scenes().detail(scid);
    scene.recall();
  } else {
    log(warning('No scene for to recall'), { gid, scid: id, offset })
  }
}

export default {
  recallScene,
};
