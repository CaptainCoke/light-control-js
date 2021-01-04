import _ from 'lodash';
import DeconzResource from './resource.js';
import GroupResource from './group.js';
import { makeLog } from './logging.js';

const log = makeLog('lcs:scene');

export default class SceneResource extends DeconzResource {
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
