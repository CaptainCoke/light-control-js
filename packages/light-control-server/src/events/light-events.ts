import {
  LightResource,
  logging,
  ResourceType,
  EventType,
  MessageFormat,
} from 'light-control-lib';
import { addEventHandler } from './handler';

const { makeLog, error } = logging;
const log = makeLog('lcs:event:lights');

async function onLightChanged(message: MessageFormat) {
  if (message.e === EventType.changed && message.r === ResourceType.lights) {
    const { id } = message;
    const light = await LightResource.detail(id);
    await light.update();
    light.print();
  } else {
    log(error('Incompatible message received:'), message);
  }
}

export function useLightEvents(): void {
  addEventHandler(ResourceType.lights, EventType.changed, onLightChanged);
}
