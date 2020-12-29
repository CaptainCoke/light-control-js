import _ from 'lodash';
import debug from 'debug';
import { DeconzResource } from './api.js';

const log = debug("lcs:light");
log.log = console.log.bind(console);

const shortenState = (state) => _.pick(state, 'on', 'bri', 'ct', 'xy');
const sanitizeState = (state) => _.pick(state, 'on', 'bri', 'hue', 'sat', 'ct', 'xy');

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
    log(this.attributes.id, this.attributes.name, shortenState(this.attributes.state));
  }
}

export default {
  LightResource,
};
