import _ from 'lodash';
import { DeconzResource } from './DeconzResource';
import { makeLog } from '../logging';
import { GroupAction, GroupActionTransition } from '../types';
import { LightResource } from './LightResource';

const log = makeLog('lcs:group');

const shortenAction = (action: GroupAction) => _.pick(action, 'on', 'bri', 'scene');
const sanitizeAction = (action: GroupAction) => _.pick(action, 'on', 'bri', 'hue', 'sat', 'ct', 'xy');

export abstract class GroupResource extends DeconzResource {
  static endpoint = '/groups';

  getAction() : GroupAction {
    return this.attributes.action;
  }

  async setAction({ transitiontime, toggle, ...action }: GroupActionTransition): Promise<void> {
    const cleanAction = sanitizeAction(action);
    await this.wrap('/action').put({ ...cleanAction, toggle, transitiontime });
    _.merge(this.attributes.action, cleanAction);
  }

  getCurrentSceneId(): string {
    return this.getAction().scene ?? '';
  }

  async lights(): Promise<LightResource[]> {
    const { lights } = this.attributes;
    if (Array.isArray(lights)) {
      return Promise.all(lights.map((id) => LightResource.detail(id)));
    }
    return [];
  }

  async isAnyLightOn(): Promise<boolean> {
    const lights = await this.lights();
    return lights.some((light) => light.getState().on);
  }

  print(): void {
    log(this.attributes.id, this.attributes.name, shortenAction(this.attributes.action));
  }
}
