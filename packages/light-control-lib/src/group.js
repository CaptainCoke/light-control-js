import _ from 'lodash';
import DeconzResource from './resource.js';
import { makeLog } from './logging.js';

const log = makeLog('lcs:group');

const shortenAction = (action) => _.pick(action, 'on', 'bri', 'scene');
const sanitizeAction = (action) => _.pick(action, 'on', 'bri', 'hue', 'sat', 'ct', 'xy');

export default class GroupResource extends DeconzResource {
  static endpoint = '/groups';

  getAction() {
    return this.attributes.action;
  }

  async setAction({ transitiontime, toggle, ...action }) {
    const cleanAction = sanitizeAction(action);
    await this.wrap('/action').put({ ...cleanAction, toggle, transitiontime });
    _.merge(this.attributes.action, cleanAction);
  }

  getCurrentSceneId() {
    return parseInt(this.getAction().scene ?? 0, 10);
  }

  async getRelativeSceneId(offsetToCurrentScene) {
    const { resources: scenes } = await this.scenes().list();
    const numScenes = scenes.length;
    const nextScene = (this.getCurrentSceneId() + offsetToCurrentScene) % numScenes;
    return nextScene > 0 ? nextScene : numScenes + nextScene;
  }

  print() {
    log(this.attributes.id, this.attributes.name, shortenAction(this.attributes.action));
  }
}
