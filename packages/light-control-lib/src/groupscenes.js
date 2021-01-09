import GroupResource from './group.js';
import SceneResource from './scene.js';

function groupscenes() {
  const groupId = this.attributes.id;

  class GroupScenes extends SceneResource {
    static endpoint = `/groups/${groupId}/scenes`;

    static gid = groupId;
  }

  return GroupScenes;
}

GroupResource.prototype.scenes = groupscenes;
