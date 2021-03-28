import { GroupResource, SceneResource, logging } from 'light-control-lib';
import { ChangeSceneAction } from './types';

const { makeLog, info, warning } = logging;
const log = makeLog('lcs:actions:scene');

export async function recallScene({
  group: gid,
  scene: { id, offset },
}: ChangeSceneAction): Promise<void> {
  const group = await GroupResource.detail(gid);
  const scid = id ?? await group.getRelativeSceneId(offset ?? 0);
  if (scid) {
    log(info(`Recalling scene ${scid} of group ${gid}`));
    const scene = await group.scenes().detail(scid) as SceneResource;
    scene.recall();
  } else {
    log(warning('No scene to recall'), { gid, scid: id, offset });
  }
}
