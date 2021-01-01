import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';

function Light(props) {
  const { id } = props;
  return (
    <div>{id}</div>
  );
}

Light.propTypes = {
  id: PropTypes.number.isRequired,
};

function LightList() {
  return (
    <div>
      {[1, 2, 3].map((lightId) => (<Light id={lightId} />))}
    </div>
  );
}

ReactDOM.render(
  <LightList />,
  document.getElementById('root'),
);
