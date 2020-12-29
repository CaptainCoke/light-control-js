import _ from 'lodash';
import debug from 'debug';
import { DeconzResource } from './api.js';
import { GroupResource } from './groups.js';

const log = debug("lcs:scene");
log.log = console.log.bind(console);

export class SceneResource extends DeconzResource {
  static gid = 0;

  static group() {
    return GroupResource.detail(this.gid);
  }

  async print() {
    const Ctor = this.getConstructor()
    const group = await Ctor.group();
    log(this.attributes.id, this.attributes.name, group.attributes.name);
  }

  async recall() {
    await this.wrap('/recall').put();
  }
}

export default {
  SceneResource,
};
