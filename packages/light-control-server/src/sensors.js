import { DeconzResource } from './api.js';
import buttonMaps from './button-maps.config.js';

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
    console.log(this.attributes.id, this.attributes.name, this.attributes.state);
  }
}

export default {
  SensorResource,
};
