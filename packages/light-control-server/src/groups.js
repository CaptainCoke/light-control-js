import _ from 'lodash';
import { deconz } from './api.js';

export const getAllGroupIds = () => deconz.get('/groups').then(({ data }) => _.keys(data));

export default {
  getAllGroupIds,
};
