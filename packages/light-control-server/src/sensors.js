import debug from 'debug';
import { DeconzResource } from './api.js';
import buttonMaps from './button-maps.config.js';

const log = debug("lcs:sensor");
log.log = console.log.bind(console);

export class SensorResource extends DeconzResource {
  static endpoint = '/sensors';

  buttons() {
    return buttonMaps?.[this.attributes.modelid];
  }

  button(buttonevent) {
    const { button, action } = this.buttons()?.[buttonevent];
    return { button, action };
  }

  print() {
    log(this.attributes.id, this.attributes.name, this.attributes.state);
  }
}

export default {
  SensorResource,
};
