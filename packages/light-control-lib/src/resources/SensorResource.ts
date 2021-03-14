import DeconzResource from './DeconzResource';
import buttonMaps from '../config/button-maps.config';
import { ButtonPress } from '../types/buttons';
import { makeLog } from '../logging';

const log = makeLog('lcs:sensor');

export type SensorState = {
  buttonevent?: number,
  lastupdated: string,
};

export type RemoteButtonPress = ButtonPress & {
  remote: number,
}

export default class SensorResource extends DeconzResource {
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
