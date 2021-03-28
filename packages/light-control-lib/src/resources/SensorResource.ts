import { DeconzResource } from './DeconzResource';
import { ButtonPress, RemoteButtonPress } from '../types';
import { makeLog } from '../logging';

import buttonMaps from '../config/button-maps.config';

const log = makeLog('lcs:sensor');

export class SensorResource extends DeconzResource {
  static endpoint = '/sensors';

  buttons() : Record<number, ButtonPress> {
    const model = this.attributes.modelid as string;
    return buttonMaps[model];
  }

  hasButtons(): boolean {
    return !!this.buttons();
  }

  button(buttonevent: number) : RemoteButtonPress {
    const { button, action } = this.buttons()?.[buttonevent];
    return { remote: this.attributes.id, button, action };
  }

  lastPressedButton(): RemoteButtonPress | null {
    const buttonevent = this.attributes?.state?.buttonevent;
    if (buttonevent) return this.button(buttonevent);
    return null;
  }

  print() : void {
    log(this.attributes.id, this.attributes.name, this.attributes.state);
  }
}
