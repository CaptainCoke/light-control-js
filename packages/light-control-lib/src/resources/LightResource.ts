import _ from 'lodash';
import DeconzResource from './DeconzResource';
import { makeLog } from '../logging';
import {
  Brigthness,
  ColorTemperature,
  Hue,
  Saturation,
  xy,
  Effect,
  Alert,
} from '../types/lights';

const log = makeLog('lcs:light');

export type CtLightState = {
  colormode: 'ct',
  ct: ColorTemperature,
}

export type XyLightState = {
  colormode: 'xy',
  xy: xy,
}

export type HsLightState = {
  colormode: 'hs',
  hue: Hue,
  sat: Saturation,
}

export type DimmableLightState = {
  reachable: boolean,
  on: boolean,
  bri?: Brigthness,
  effect?: Effect,
  alert?: Alert,
}

export type LightState = (CtLightState | XyLightState | HsLightState) & DimmableLightState;

export type LightStateTransition = LightState & { transitiontime: number };

const shortenState = (state: LightState) => _.pick(state, 'on', 'bri', 'ct', 'xy');
const sanitizeState = (state: LightState) => _.pick(state, 'on', 'bri', 'hue', 'sat', 'ct', 'xy');

export default class LightResource extends DeconzResource {
  static endpoint = '/lights';

  getState(): LightState {
    return <LightState> this.attributes.state;
  }

  async setState({ transitiontime, ...state }: LightStateTransition): Promise<void> {
    const cleanState = sanitizeState(state);
    await this.wrap('/state').put({ ...cleanState, transitiontime });
    _.merge(this.attributes.state, cleanState);
  }

  updateState(state: LightState): void {
    _.merge(this.attributes.state, sanitizeState(state));
  }

  print(): void {
    log(this.attributes.id, this.attributes.name, shortenState(this.attributes.state));
  }
}
