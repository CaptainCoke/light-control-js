import _ from 'lodash';
import Resource from 'rest-resource';
import { DefaultClient } from 'rest-resource/dist/client.js';
import isNumber from 'is-number';

class DeconzClient extends DefaultClient {
  negotiateContent(ResourceClass) {
    return (response) => {
      const { data } = response;
      const resources = [];
      const dataKeys = _.keys(data);
      if (dataKeys.every(isNumber)) {
        dataKeys.forEach((id) => resources.push(new ResourceClass({ id, ...data[id] })))
      } else {
        const { url } = response.config;
        const id = _.last(_.split(url, '/'));
        resources.push(new ResourceClass({ id, ...data }))
      }
      return { response, resources };
    }
  }
}

export class DeconzResource extends Resource.default {
  static client = new DeconzClient(`http://${process.env.DECONZ_HOST}/api/${process.env.DECONZ_API_KEY}/`);
}

export default {
  DeconzResource,
};
