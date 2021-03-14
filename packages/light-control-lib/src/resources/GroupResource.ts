import _ from 'lodash';
import DeconzResource from './DeconzResource';
import { makeLog } from '../logging';
import { GroupAction, GroupActionTransition } from '../types/groups';

const log = makeLog('lcs:group');

const shortenAction = (action: GroupAction) => _.pick(action, 'on', 'bri', 'scene');
const sanitizeAction = (action: GroupAction) => _.pick(action, 'on', 'bri', 'hue', 'sat', 'ct', 'xy');

export default abstract class GroupResource extends DeconzResource {
  static endpoint = '/groups';

  getAction() : GroupAction {
    return this.attributes.action;
  }

  async setAction({ transitiontime, toggle, ...action }: GroupActionTransition): Promise<void> {
    const cleanAction = sanitizeAction(action);
    await this.wrap('/action').put({ ...cleanAction, toggle, transitiontime });
    _.merge(this.attributes.action, cleanAction);
  }

  getCurrentSceneId(): number {
    return parseInt(this.getAction().scene ?? '0', 10);
  }

  abstract numberOfScenes(): Promise<number>;

  async getRelativeSceneId(offsetToCurrentScene: number): Promise<number> {
    const numScenes = await this.numberOfScenes();
    const nextScene = (this.getCurrentSceneId() + offsetToCurrentScene) % numScenes;
    return nextScene > 0 ? nextScene : numScenes + nextScene;
  }

  print(): void {
    log(this.attributes.id, this.attributes.name, shortenAction(this.attributes.action));
  }
}
