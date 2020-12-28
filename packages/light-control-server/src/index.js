import chalk from 'chalk';
import { setupWebsocket } from './websocket.js';
import { LightResource } from './lights.js';
import { GroupResource } from './groups.js';
import { SensorResource } from './sensors.js';

const warning = chalk.keyword('orange');
const info = chalk.bgGreen.black;
const notice = chalk.gray;

const remoteButtonActions = { 
  5: {
    left: { group: 1, scene: { offset: -1 } },
    right: { group: 1, scene: { offset: +1 } },
    up: { group: 1, action: { bri: 255 } },
    down: { group: 1, action: { bri: 10 } },
    power: { group: 1, action: { toggle: true } },
  },
};

async function recallScene(gid, { id, offset }) {
  const group = await GroupResource.detail(gid);
  const scid = id ?? await group.getRelativeSceneId(offset);
  if (scid) {
    console.log(info(`Recalling scene ${scid} of group ${gid}`));
    const scene = await group.scenes().detail(scid);
    scene.recall();
  } else {
    console.log(warning('No scene for to recall'), { gid, scid: id, offset })
  }
}

async function groupAction(gid, action) {
  console.log(info(`Performing group action on ${gid}:`), action);
  const group = await GroupResource.detail(gid);
  group.setAction(action);
}

function performButtonAction(what) {
  const { group, scene, action } = what;
  if (group && scene) recallScene(group, scene);
  else if (group && action) groupAction(group, action);
  else console.log(warning('Unsupported button action'), what);
}

async function onRemoteChanged(id, buttonevent) {
  const remote = await SensorResource.detail(id);
    const { button, action: pressaction } = remote.button(buttonevent);
    if (button) {
      console.log(`Remote ${id}`, { button, pressaction });
      const action = remoteButtonActions?.[id]?.[button];
      if (action) performButtonAction(action);
    } else {
      console.log(warning(`No button map for ${buttonevent} on remote ${id}`));
    }
}

async function onLightChanged(id, state) {
  const light = await LightResource.detail(id);
  await light.update();
  light.print();
}

function onSensorChanged(id, state) {
  const { buttonevent } = state;
  if (buttonevent) onRemoteChanged(id, buttonevent);
  else console.log(notice(`Sensor ${id} changed to`), state);
}

async function onGroupChanged(id, state) {
  const group = await GroupResource.detail(id);
  await group.update();
  group.print();
}

function onResourceChanged({ r: resource, id, state }) {
  switch (state ? resource : null) {
    case 'lights': onLightChanged(id, state); break;
    case 'sensors': onSensorChanged(id, state); break;
    case 'groups': onGroupChanged(id, state); break;
    default: console.log(notice(`${resource}/${id} changed`));
  }
}

function onSceneRecalled({ gid, scid }) {
  console.log(`Scene ${scid} of group ${gid} was recalled`);
  onGroupChanged(gid);
}

function handleMessage(msg) {
  const { e: event, t: type, ...content } = msg;
  switch (event) {
    case 'changed': onResourceChanged(content); break;
    case 'scene-called': onSceneRecalled(content); break;
    default: console.log(warning('Unsupported message occured:'), msg);
  }
}

// start listening to events
setupWebsocket(handleMessage);
