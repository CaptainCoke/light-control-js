import { useState, useEffect, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { DeconzResource, LightResource } from 'light-control-lib/src/index';
import './index.css';

// setup API access
if (process.env.DECONZ_HOST && process.env.DECONZ_API_KEY) {
  DeconzResource.setupApi(process.env.DECONZ_HOST, process.env.DECONZ_API_KEY);
} else {
  throw new Error('missing DECONZ authentication data');
}

type Props = {
  id: string,
}

function Light(props: Props): ReactElement {
  const { id } = props;

  const [name, setData] = useState<string | null>(null);
  useEffect(() => {
    LightResource.detail(id).then((light) => setData(light.get('name')));
  }, []);

  return (
    <p>{`${id} - ${name ?? 'loading'}`}</p>
  );
}

Light.propTypes = {
  id: PropTypes.string.isRequired,
};

function LightList() {
  const [ids, setData] = useState<string[] | null>(null);
  useEffect(() => {
    LightResource.list().then(({ resources }) => setData(resources.map((res) => res.id)));
  }, []);

  return (
    <div>
      {ids ? ids.map((lightId) => (<Light key={lightId} id={lightId} />)) : 'loading'}
    </div>
  );
}

ReactDOM.render(
  <LightList />,
  document.getElementById('root'),
);
