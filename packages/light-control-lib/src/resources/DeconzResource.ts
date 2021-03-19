import Resource from 'rest-resource';
import { DeconzClient } from './DeconzClient';
import { makeLog } from '../logging';

const log = makeLog('lcs:resource');

export class DeconzResource extends Resource {
  static setupApi(host?: string, key?: string): void {
    if (host && key) {
      log(`setting up for API connection to ${host}`);
      DeconzResource.client = new DeconzClient(`http://${host}/api/${key}/`);
    } else {
      throw new Error('missing DECONZ authentication data');
    }
  }

  static async getConfig(): Promise<Record<string, unknown>> {
    const { data } = await DeconzResource.wrap('/config').get();
    return data;
  }
}
