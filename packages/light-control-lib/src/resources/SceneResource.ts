import { DeconzResource } from './DeconzResource';
import { GroupResource } from './GroupResource';
import { makeLog } from '../logging';

const log = makeLog('lcs:scene');

export abstract class SceneResource extends DeconzResource {
  abstract group(): Promise<GroupResource>;

  async print(): Promise<void> {
    const group = await this.group();
    log(this.attributes.id, this.attributes.name, group.attributes.name);
  }

  async recall(): Promise<void> {
    await this.wrap('/recall').put();
  }
}
