import { ReactElement } from 'react';
import PropTypes from 'prop-types';

import { useLight } from '../api/Deconz.hooks';

type Props = {
  id: number,
}

export function Light(props: Props): ReactElement {
  const { id } = props;

  const { light, isLoading } = useLight(id);

  if (isLoading) {
    return (<p>Loading...</p>);
  }
  return (<p>{`${id} - ${light?.name} is ${light?.state.on ? 'on' : 'off'}`}</p>);
}

Light.propTypes = {
  id: PropTypes.string.isRequired,
};
