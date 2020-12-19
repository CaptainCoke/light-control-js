import _ from 'lodash';
import { deconz } from './api.js';

const shortenLightState = (state) => _.pick(state, 'on', 'bri', 'ct', 'xy');

export const printLight = ({ id, name, state }) => {
  console.log(id, name, shortenLightState(state));
};

export const getLight = (id) => deconz.get(`/lights/${id}`).then(({ data }) => ({ id, ...data }));

export const getAllLightIds = () => deconz.get('/lights').then(({ data }) => _.keys(data));

export const setLightState = (id, state) => deconz.put(`/lights/${id}/state`, state).then(({ data }) => {
  const changes = {};
  data.forEach(({ success }) => {
    _.entries(success).forEach(([key, value]) => {
      const stateName = _.last(_.split(key, '/'));
      changes[stateName] = value;
    });
  });
  console.log(id, shortenLightState(changes));
  return { id, state: changes };
});

export const onLightChanged = (id, state) => {
  console.log(`Light ${id} changed to`, shortenLightState(state));
};

export default {
  printLight,
  getLight,
  getAllLightIds,
  setLightState,
  onLightChanged,
};
