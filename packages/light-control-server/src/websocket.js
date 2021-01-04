import WebSocket from 'ws';
import { DeconzResource } from 'light-control-lib';
import { makeLog } from 'light-control-lib/src/logging.js';

const log = makeLog('lcs:ws');

// setup API access
const { DECONZ_HOST, DECONZ_API_KEY } = process.env;
DeconzResource.setupApi(DECONZ_HOST, DECONZ_API_KEY);

let deconzWebSocket;

async function getConfig() {
  const { data } = await DeconzResource.wrap('/config').get();
  return data;
}

export async function setupWebsocket(onMessage) {
  const { websocketport } = await getConfig();
  log('connecting to websocket on port', websocketport);
  deconzWebSocket = new WebSocket(`ws://${DECONZ_HOST}:${websocketport}`);
  deconzWebSocket.on('open', () => log('Websocket connected'));
  deconzWebSocket.on('close', () => log('Websocket disconnected'));
  deconzWebSocket.on('message', (msg) => onMessage(JSON.parse(msg)));
  // Send the ready signal to PM2
  process?.send?.('ready');
}

export default {
  setupWebsocket,
};
