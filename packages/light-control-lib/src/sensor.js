import DeconzResource from './resource.js';
import buttonMaps from '../config/button-maps.config.js';
import { makeLog } from './logging.js';

const log = makeLog('lcs:sensor');

export default class SensorResource extends DeconzResource {
  static endpoint = '/sensors';

  buttons() {
    return buttonMaps?.[this.attributes.modelid];
  }

  button(buttonevent) {
    const { button, action } = this.buttons()?.[buttonevent];
    return { remote: this.attributes.id, button, action };
  }

  print() {
    log(this.attributes.id, this.attributes.name, this.attributes.state);
  }
}
