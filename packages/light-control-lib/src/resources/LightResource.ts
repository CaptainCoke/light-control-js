import _ from 'lodash';
import { DeconzResource } from './DeconzResource';
import { makeLog } from '../logging';
import { LightState } from '../types';

const log = makeLog('lcs:light');

export type LightStateTransition = LightState & { transitiontime: number };

const shortenState = (state: LightState) => _.pick(state, 'on', 'bri', 'ct', 'xy');
const sanitizeState = (state: LightState) => _.pick(state, 'on', 'bri', 'hue', 'sat', 'ct', 'xy');

export class LightResource extends DeconzResource {
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
