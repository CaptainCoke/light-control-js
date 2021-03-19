import WebSocket from 'ws';
import { DeconzResource, MessageFormat, logging } from 'light-control-lib';

const log = logging.makeLog('lcs:ws');

let deconzWebSocket;

export async function setupWebsocket(onMessage: (msg: MessageFormat) => void) : Promise<void> {
  const host = process.env.DECONZ_HOST;
  const { websocketport: port } = await DeconzResource.getConfig();
  log('connecting to websocket on ', { host, port });
  deconzWebSocket = new WebSocket(`ws://${host}:${port}`);
  deconzWebSocket.on('open', () => log('Websocket connected'));
  deconzWebSocket.on('close', () => log('Websocket disconnected'));
  deconzWebSocket.on('message', (msg: string) => onMessage(JSON.parse(msg)));
  // Send the ready signal to PM2
  process?.send?.('ready');
}
