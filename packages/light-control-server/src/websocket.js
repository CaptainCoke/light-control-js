import WebSocket from 'ws';
import { DeconzResource } from './api.js';

let deconzWebSocket;

async function getConfig() {
  const { data } = await DeconzResource.wrap('/config').get();
  return data;
}

export async function setupWebsocket(onMessage) {
  const { websocketport } = await getConfig();
  console.log('connecting to websocket on port', websocketport);
  deconzWebSocket = new WebSocket(`ws://${process.env.DECONZ_HOST}:${websocketport}`);
  deconzWebSocket.on('open', () => console.log('Websocket connected'));
  deconzWebSocket.on('close', () => console.log('Websocket disconnected'));
  deconzWebSocket.on('message', (msg) => onMessage(JSON.parse(msg)));
}

export default {
  setupWebsocket,
};
