import WebSocket from 'ws';
import { onLightChanged } from './lights.js';
import { onSceneRecalled } from './scenes.js';
import { onSensorChanged } from './sensors.js';

let deconzWebSocket;

const onResourceChanged = ({ r: resource, id, state }) => {
  switch (state ? resource : null) {
    case 'lights': onLightChanged(id, state); break;
    case 'sensors': onSensorChanged(id, state); break;
    case 'groups': console.log(`Group ${id} changed to`, state); break;
    default: console.log(`${resource}/${id} changed`);
  }
};

const handleMessage = (msg) => {
  const { e: event, t: type, ...content } = msg;
  switch (event) {
    case 'changed': onResourceChanged(content); break;
    case 'scene-called': onSceneRecalled(content); break;
    default: console.log('Unsupported message occured: ', msg);
  }
};

export const setupWebsocket = (port) => {
  console.log('connecting to websocket on port ', port);
  deconzWebSocket = new WebSocket(`ws://${process.env.DECONZ_HOST}:${port}`);
  deconzWebSocket.on('open', () => console.log('Websocket connected'));
  deconzWebSocket.on('close', () => console.log('Websocket disconnected'));
  deconzWebSocket.on('message', (msg) => handleMessage(JSON.parse(msg)));
};

export default {
  setupWebsocket,
};
