import WebSocket from 'ws';
import { DeconzResource, logging } from 'light-control-lib';
import { handleEvents } from './events';

const log = logging.makeLog('lcs:ws');

let deconzWebSocket;

export async function setupWebsocket() : Promise<void> {
  const host = process.env.DECONZ_HOST;
  const { websocketport: port } = await DeconzResource.getConfig();
  log('connecting to websocket on ', { host, port });
  deconzWebSocket = new WebSocket(`ws://${host}:${port}`);
  deconzWebSocket.on('open', () => log('Websocket connected'));
  deconzWebSocket.on('close', () => log('Websocket disconnected'));
  deconzWebSocket.on('message', (message: string) => handleEvents(JSON.parse(message)));
}
