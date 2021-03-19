import _ from 'lodash';
import { DefaultClient, AxiosResponse, ExtractorFunction } from 'rest-resource/dist/client';
import Resource from 'rest-resource';
import isNumber from 'is-number';

type DeconzListResponse = Record<string, Record<string, unknown>>;
type DeconzDetailResponse = Record<string, unknown>

type DeconzResponse = DeconzListResponse | DeconzDetailResponse;

export class DeconzClient extends DefaultClient {
  // eslint-disable-next-line class-methods-use-this
  negotiateContent<T extends typeof Resource>(ResourceClass: T):
    ExtractorFunction<InstanceType<T>> {
    return (response: AxiosResponse<DeconzResponse>) => {
      type ResourceClassT = InstanceType<T>;
      const resources : ResourceClassT[] = [];

      const { data } = response;
      const dataKeys = _.keys(data);
      if (dataKeys.every(isNumber)) {
        dataKeys.forEach((id) => {
          const resource = new ResourceClass({ id, ...<DeconzListResponse>data[id] });
          resources.push(<ResourceClassT>resource);
        });
      } else {
        const { url } = response.config;
        const id = _.last(_.split(url, '/'));
        const resource = new ResourceClass({ id, ...data });
        resources.push(<ResourceClassT>resource);
      }
      return { response, resources };
    };
  }
}
