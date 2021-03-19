import { DeconzResource } from './DeconzResource';
import { ButtonPress, RemoteButtonPress } from '../types';
import { makeLog } from '../logging';

import buttonMaps from '../config/button-maps.config';

const log = makeLog('lcs:sensor');

export class SensorResource extends DeconzResource {
  static endpoint = '/sensors';

  buttons() : Record<number, ButtonPress> {
    const mappedButtons = buttonMaps?.[<string> this.attributes.modelId];
    return mappedButtons;
  }

  button(buttonevent: number) : RemoteButtonPress {
    const { button, action } = this.buttons()?.[buttonevent];
    return { remote: this.attributes.id, button, action };
  }

  print() : void {
    log(this.attributes.id, this.attributes.name, this.attributes.state);
  }
}
