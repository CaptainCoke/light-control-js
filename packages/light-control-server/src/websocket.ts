import WebSocket from 'ws';
import { DeconzResource, LightState, SensorState } from 'light-control-lib/src/index';
import { makeLog } from 'light-control-lib/src/logging';

const log = makeLog('lcs:ws');

// setup API access
const { DECONZ_HOST, DECONZ_API_KEY } = process.env;
if (DECONZ_HOST && DECONZ_API_KEY) {
  DeconzResource.setupApi(DECONZ_HOST, DECONZ_API_KEY);
} else {
  throw new Error('missing DECONZ authentication data');
}

let deconzWebSocket;

type LightChangedMessage = {
  r: 'lights',
  state?: LightState,
}

type SensorChangedMessage = {
  r: 'sensors',
  state?: SensorState,
}

type GroupChangedMessage = {
  r: 'groups',
  state?: Record<string, boolean>,
}

export type ResourceChangedMessage = (
  LightChangedMessage | SensorChangedMessage | GroupChangedMessage) & {
  e: 'changed',
  id: number,
}

export type SceneRecalledMessage = {
  e: 'scene-called',
  gid: number,
  scid: number,
}

export type MessageFormat = {
  e: 'added' | 'deleted'
} | ResourceChangedMessage | SceneRecalledMessage;

async function getConfig(): Promise<Record<string, unknown>> {
  const { data } = await DeconzResource.wrap('/config').get();
  return data;
}

export async function setupWebsocket(onMessage: (msg: MessageFormat) => void)
: Promise<void> {
  const { websocketport } = await getConfig();
  log('connecting to websocket on port', websocketport);
  deconzWebSocket = new WebSocket(`ws://${DECONZ_HOST}:${websocketport}`);
  deconzWebSocket.on('open', () => log('Websocket connected'));
  deconzWebSocket.on('close', () => log('Websocket disconnected'));
  deconzWebSocket.on('message', (msg: string) => onMessage(JSON.parse(msg)));
  // Send the ready signal to PM2
  process?.send?.('ready');
}
