import { Client } from 'node-rest-client';

const client = new Client();

const printLight = () => {
  client.get(`http://${process.env.DECONZ_HOST}/api/${process.env.DECONZ_API_KEY}/lights/1`, (data) => {
    console.log(data);
  });
};

printLight();
