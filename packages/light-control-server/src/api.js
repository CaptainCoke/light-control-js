import axios from 'axios';

export const deconz = axios.create({ baseURL: `http://${process.env.DECONZ_HOST}/api/${process.env.DECONZ_API_KEY}/` });

export const getConfig = () => deconz.get('config').then(({ data }) => data);

export default {
  deconz,
  getConfig,
};
