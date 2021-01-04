import Resource from 'rest-resource';
import DeconzClient from './client.js';
import { makeLog } from './logging.js';

const log = makeLog('lcs:resource');

const RestResource = (Resource.default instanceof Object) ? Resource.default : Resource;

export default class DeconzResource extends RestResource {
  static setupApi(host, key) {
    log(`setting up for API connection to ${host}`);
    DeconzResource.client = new DeconzClient(`http://${host}/api/${key}/`);
  }
}
