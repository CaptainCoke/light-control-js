import {
  LightResource,
  GroupResource,
  SensorResource
} from 'light-control-lib';
import { makeLog, warning, notice } from 'light-control-lib/src/logging.js';
import { reactOnButton } from './actions/react-on-button.js';
import { setupWebsocket } from './websocket.js';

const log = makeLog('lcs:event');

async function onLightChanged(id) {
  const light = await LightResource.detail(id);
  await light.update();
  light.print();
}

async function onSensorChanged(id, state) {
  const sensor = await SensorResource.detail(id);
  await sensor.update();
  sensor.print();

  const { buttonevent } = state;
  if (buttonevent) reactOnButton(sensor.button(buttonevent));
}

async function onGroupChanged(id) {
  const group = await GroupResource.detail(id);
  await group.update();
  group.print();
}

function onResourceChanged({ r: resource, id, state }) {
  switch (state ? resource : null) {
    case 'lights': onLightChanged(id, state); break;
    case 'sensors': onSensorChanged(id, state); break;
    case 'groups': onGroupChanged(id, state); break;
    default: log(notice(`${resource}/${id} changed`));
  }
}

function onSceneRecalled({ gid, scid }) {
  log(`Scene ${scid} of group ${gid} was recalled`);
  onGroupChanged(gid);
}

function handleMessage(msg) {
  const { e: event, t: type, ...content } = msg;
  switch (event) {
    case 'changed': onResourceChanged(content); break;
    case 'scene-called': onSceneRecalled(content); break;
    default: log(warning('Unsupported message occured:'), msg);
  }
}

// start listening to events
setupWebsocket(handleMessage);
