import _ from 'lodash';
import { DeconzResource } from './api.js';
import { GroupResource } from './groups.js';

export class SceneResource extends DeconzResource {
  static gid = 0;

  static group() {
    return GroupResource.detail(this.gid);
  }

  async print() {
    const Ctor = this.getConstructor()
    const group = await Ctor.group();
    console.log(this.attributes.id, this.attributes.name, group.attributes.name);
  }

  async recall() {
    await this.wrap('/recall').put();
  }
}

export const onSceneRecalled = ({ gid: group, scid: scene }) => {
  console.log(`Group ${group} changed to scene ${scene}`);
};

export default {
  SceneResource,
  onSceneRecalled,
};
