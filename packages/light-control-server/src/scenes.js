import _ from 'lodash';
import { deconz } from './api.js';
import { getAllGroupIds } from './groups.js';

export const recallScene = ({ gid: group, scid: scene }) => deconz.put(`/groups/${group}/scenes/${scene}/recall`).then(({ data }) => {
  const recalledScene = data?.[0]?.success?.id;
  if (recalledScene == scene) {
    console.log(`Group ${group} recalled scene ${recalledScene}`)
    return { gid: group, scid: scene };
  }
  console.error(`Group ${group} recalled scene ${recalledScene} instead of ${scene}!`);
  return null;
});

export const onSceneRecalled = ({ gid: group, scid: scene }) => {
  console.log(`Group ${group} changed to scene ${scene}`);
};

export const getAllSceneIdsOfGroup = (gid) => deconz.get(`/groups/${gid}/scenes`).then(({ data }) => _.keys(data).map((scid) => ({gid, scid})));

export const printScene = ({ gid: group, scid: scene, name }) => {
  console.log({ group, scene, name });
};

export const getScene = ({ gid, scid }) => deconz.get(`/groups/${gid}/scenes/${scid}`).then(({data}) => ({ gid, scid, ...data }));

export const getAllSceneIds = async () => {
  let allScenes = [];
  const gids = await getAllGroupIds()
  for (const gid of gids) {
    allScenes = allScenes.concat(await getAllSceneIdsOfGroup(gid));
  }
  return allScenes;
};

export default {
  getAllSceneIdsOfGroup,
  getAllSceneIds,
  printScene,
  onSceneRecalled,
  recallScene,
};
