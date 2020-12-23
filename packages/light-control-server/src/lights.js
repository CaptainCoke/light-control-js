import _ from 'lodash';
import { DeconzResource } from './api.js';

const shortenLightState = (state) =>_.pick(state, 'on', 'bri', 'ct', 'xy');
const sanitizeState = ({ on, bri, hue, sat, ct, xy }) => _.omitBy({ on, bri, hue, sat, ct, xy }, _.isNil);

export class LightResource extends DeconzResource {
  static endpoint = '/lights';

  getState() {
    return this.attributes.state;
  }

  async setState({ transitiontime, ...state }) {
    const cleanState = sanitizeState(state);
    await this.wrap('/state').put({ ...cleanState, transitiontime });
    _.merge(this.attributes.state, cleanState);
  }

  updateState(state) {
    _.merge(this.attributes.state, sanitizeState(state));
  }

  print() {
    console.log(this.attributes.id, this.attributes.name, shortenLightState(this.attributes.state));
  }
}

export function onLightChanged(id, state) {
  console.log(`Light ${id} changed to`, shortenLightState(state));
  LightResource.detail(id).then((light) => light.updateState(state));
};

export default {
  LightResource,
  onLightChanged,
};
