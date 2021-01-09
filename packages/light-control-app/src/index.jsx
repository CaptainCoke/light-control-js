import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { DeconzResource, LightResource } from 'light-control-lib';
import './index.css';

// setup API access
DeconzResource.setupApi(process.env.DECONZ_HOST, process.env.DECONZ_API_KEY);

function Light(props) {
  const { id } = props;

  const [name, setData] = useState([]);
  useEffect(() => LightResource.detail(id).then((light) => setData(light.get('name'))), []);

  return (
    <p>{`${id} - ${name ?? 'loading'}`}</p>
  );
}

Light.propTypes = {
  id: PropTypes.string.isRequired,
};

function LightList() {
  const [ids, setData] = useState([]);
  useEffect(() => LightResource.list()
    .then(({ resources }) => setData(resources.map((res) => res.id))),
  []);

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
