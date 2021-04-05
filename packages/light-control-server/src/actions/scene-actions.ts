import { GroupResource, SceneResource, logging } from 'light-control-lib';
import { RequestedScene } from './types';

const { makeLog, info, warning } = logging;
const log = makeLog('lcs:actions:scene');

async function recallScene(group: GroupResource, { scene: id, offset }: RequestedScene) {
  const scid = id ?? await group.getRelativeSceneId(offset ?? 0);
  if (scid) {
    const scene = await group.scenes().detail(scid) as SceneResource;
    log(info(`Recalling scene ${scene.get('name')} of group ${group.get('name')}`));
    await scene.recall();
  } else {
    log(warning('No scene to recall'), { group: group.get('name'), id, offset });
  }
}

export async function changeScene(gid: string, scene: RequestedScene)
: Promise<void> {
  const group = await GroupResource.detail(gid);
  await recallScene(group, scene);
}

export async function toggleScene(gid: string, scene: RequestedScene)
: Promise<void> {
  const group = await GroupResource.detail(gid);
  if (await group.isAnyLightOn()) {
    log(info(`Toggle group ${group.get('name')} off`));
    await group.setAction({ on: false });
  } else {
    await recallScene(group, scene);
  }
}
