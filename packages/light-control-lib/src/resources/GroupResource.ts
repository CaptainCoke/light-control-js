import _ from 'lodash';
import { DeconzResource } from './DeconzResource';
import { makeLog } from '../logging';
import { GroupAction, GroupActionTransition } from '../types';

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

  print(): void {
    log(this.attributes.id, this.attributes.name, shortenAction(this.attributes.action));
  }
}
