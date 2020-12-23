import { DeconzResource } from './api.js';
import { SceneResource } from './scenes.js';

export class GroupResource extends DeconzResource {
  static endpoint = '/groups';

  scenes() {
    const groupId = this.attributes.id;
    class GroupScenes extends SceneResource {
      static endpoint = `/groups/${groupId}/scenes`;
      static gid = groupId;
    };
    return GroupScenes;
  }

  print() {
    console.log(this.attributes.id, this.attributes.name);
  }
}

export function onGroupChanged(id, state) {
  console.log(`Group ${id} changed to`, state);
}

export default {
  GroupResource,
  onGroupChanged,
};
