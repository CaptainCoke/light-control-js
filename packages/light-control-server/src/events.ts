import {
  LightResource,
  GroupResource,
  SensorResource,
  SensorState,
  ResourceChangedMessage,
  SceneRecalledMessage,
  logging,
} from 'light-control-lib';
import { reactOnButton } from './actions/react-on-button';

const { makeLog, notice } = logging;
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

export function onResourceChanged(message : ResourceChangedMessage): void {
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

export function onSceneRecalled({ gid, scid }: SceneRecalledMessage): void {
  log(`Scene ${scid} of group ${gid} was recalled`);
  onGroupChanged(gid);
}
