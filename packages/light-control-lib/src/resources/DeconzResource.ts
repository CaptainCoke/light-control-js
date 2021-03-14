import Resource from 'rest-resource';
import DeconzClient from './DeconzClient';
import { makeLog } from '../logging';

const log = makeLog('lcs:resource');

export default class DeconzResource extends Resource {
  static setupApi(host: string, key: string): void {
    log(`setting up for API connection to ${host}`);
    DeconzResource.client = new DeconzClient(`http://${host}/api/${key}/`);
  }
}
