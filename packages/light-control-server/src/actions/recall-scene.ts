import { GroupResource, SceneResource, logging } from 'light-control-lib';

const { makeLog, info, warning } = logging;
const log = makeLog('lcs:action');

export type RequestedScene = {
  id?: number
  offset?: number
}

export async function recallScene(gid: number, { id, offset }: RequestedScene): Promise<void> {
  const group = await GroupResource.detail(gid);
  const scid = id ?? await group.getRelativeSceneId(offset ?? 0);
  if (scid) {
    log(info(`Recalling scene ${scid} of group ${gid}`));
    const scene = <SceneResource> await group.scenes().detail(scid);
    scene.recall();
  } else {
    log(warning('No scene for to recall'), { gid, scid: id, offset });
  }
}
