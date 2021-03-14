import {
  LightResource,
  GroupResource,
  SensorResource,
  SensorState,
} from 'light-control-lib/src/index';
import { makeLog, warning, notice } from 'light-control-lib/src/logging';
import { reactOnButton } from './actions/react-on-button';
import {
  setupWebsocket,
  MessageFormat,
  ResourceChangedMessage,
  SceneRecalledMessage,
} from './websocket';

const log = makeLog('lcs:event');

async function onLightChanged(id: number) {
  const light = await LightResource.detail(id);
  await light.update();
  light.print();
}

async function onSensorChanged(id: number, state: SensorState) {
  const sensor = await SensorResource.detail(id);
  await sensor.update();
  sensor.print();

  const { buttonevent } = state;
  if (buttonevent) reactOnButton(sensor.button(buttonevent));
}

async function onGroupChanged(id: number) {
  const group = await GroupResource.detail(id);
  await group.update();
  group.print();
}

function onResourceChanged(message : ResourceChangedMessage) {
  const { id, r: resource } = message;
  if (message.r === 'sensors' && message.state) {
    onSensorChanged(id, message.state);
  } else {
    switch (message.r) {
      case 'lights': onLightChanged(id); break;
      case 'groups': onGroupChanged(id); break;
      default: log(notice(`${resource}/${id} changed`));
    }
  }
}

function onSceneRecalled({ gid, scid }: SceneRecalledMessage) {
  log(`Scene ${scid} of group ${gid} was recalled`);
  onGroupChanged(gid);
}

function handleMessage(msg: MessageFormat): void {
  switch (msg.e) {
    case 'changed': onResourceChanged(msg); break;
    case 'scene-called': onSceneRecalled(msg); break;
    default: log(warning('Unsupported message occured:'), msg);
  }
}

// start listening to events
setupWebsocket(handleMessage);
