import WebSocket from 'ws';
import chalk from 'chalk';
import { onLightChanged } from './lights.js';
import { onGroupChanged } from './groups.js';
import { onSceneRecalled } from './scenes.js';
import { onSensorChanged } from './sensors.js';

const warning = chalk.keyword('orange');
const notice = chalk.gray;

let deconzWebSocket;

function onResourceChanged({ r: resource, id, state }) {
  switch (state ? resource : null) {
    case 'lights': onLightChanged(id, state); break;
    case 'sensors': onSensorChanged(id, state); break;
    case 'groups': onGroupChanged(id, state); break;
    default: console.log(notice(`${resource}/${id} changed`));
  }
}

function handleMessage(msg) {
  const { e: event, t: type, ...content } = msg;
  switch (event) {
    case 'changed': onResourceChanged(content); break;
    case 'scene-called': onSceneRecalled(content); break;
    default: console.log(warning('Unsupported message occured:'), msg);
  }
}

export function setupWebsocket(port) {
  console.log('connecting to websocket on port', port);
  deconzWebSocket = new WebSocket(`ws://${process.env.DECONZ_HOST}:${port}`);
  deconzWebSocket.on('open', () => console.log('Websocket connected'));
  deconzWebSocket.on('close', () => console.log('Websocket disconnected'));
  deconzWebSocket.on('message', (msg) => handleMessage(JSON.parse(msg)));
}

export default {
  setupWebsocket,
};
