import WebSocket from 'ws';
import debug from 'debug';
import { DeconzResource } from './api.js';

const log = debug('lcs:ws');
log.log = console.log.bind(console);

let deconzWebSocket;

async function getConfig() {
  const { data } = await DeconzResource.wrap('/config').get();
  return data;
}

export async function setupWebsocket(onMessage) {
  const { websocketport } = await getConfig();
  log('connecting to websocket on port', websocketport);
  deconzWebSocket = new WebSocket(`ws://${process.env.DECONZ_HOST}:${websocketport}`);
  deconzWebSocket.on('open', () => log('Websocket connected'));
  deconzWebSocket.on('close', () => log('Websocket disconnected'));
  deconzWebSocket.on('message', (msg) => onMessage(JSON.parse(msg)));
  // Send the ready signal to PM2
  process?.send?.('ready');
}

export default {
  setupWebsocket,
};
