import { ReactElement } from 'react';
import { LightResource } from 'light-control-lib';

import { Light } from './Light';
import { useList } from '../api/Deconz.hooks';

export function LightList(): ReactElement {
  const { resourceIds, isLoading } = useList(LightResource);

  if (isLoading) {
    return (<div>Loading...</div>);
  }
  return (
    <div>
      {resourceIds?.map((lightId) => (<Light key={lightId} id={lightId} />))}
    </div>
  );
}
