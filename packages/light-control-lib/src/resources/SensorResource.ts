import { isString, isUndefined } from 'ts-util-is';
import { DeconzResource } from './DeconzResource';
import { ButtonPress, RemoteButtonPress } from '../types';
import { makeLog } from '../logging';

import buttonMaps from '../config/button-maps.config';

const log = makeLog('lcs:sensor');

export class SensorResource extends DeconzResource {
  static endpoint = '/sensors';

  buttons() : Record<number, ButtonPress> | undefined {
    const model = this.attributes.modelid;
    if (isString(model)) return buttonMaps[model];
    return undefined;
  }

  hasButtons(): boolean {
    return !isUndefined(this.buttons());
  }

  button(buttonevent: number) : RemoteButtonPress | undefined {
    const buttonPress = this.buttons()?.[buttonevent];
    if (buttonPress) {
      const { button, action } = buttonPress;
      return { remote: this.attributes.id, button, action };
    }
    return undefined;
  }

  lastPressedButton(): RemoteButtonPress | null {
    const buttonevent = this.attributes?.state?.buttonevent;
    if (buttonevent) return this.button(buttonevent) ?? null;
    return null;
  }

  lastUpdated(): Date | null {
    const lastupdated = this.attributes?.state?.lastupdated;
    if (isString(lastupdated)) return new Date(lastupdated);
    return null;
  }

  print() : void {
    log(this.attributes.id, this.attributes.name, this.attributes.state);
  }
}
