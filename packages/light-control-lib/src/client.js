import _ from 'lodash';
import { DefaultClient } from 'rest-resource/dist/client.js';
import isNumber from 'is-number';

export default class DeconzClient extends DefaultClient {
  // eslint-disable-next-line class-methods-use-this
  negotiateContent(ResourceClass) {
    return (response) => {
      const { data } = response;
      const resources = [];
      const dataKeys = _.keys(data);
      if (dataKeys.every(isNumber)) {
        dataKeys.forEach((id) => resources.push(new ResourceClass({ id, ...data[id] })));
      } else {
        const { url } = response.config;
        const id = _.last(_.split(url, '/'));
        resources.push(new ResourceClass({ id, ...data }));
      }
      return { response, resources };
    };
  }
}
