import {
  SensorResource,
  logging,
  ResourceType,
  EventType,
  MessageFormat,
  RemoteButtonPress,
} from 'light-control-lib';
import { addEventHandler } from './handler';

const { makeLog, error } = logging;
const log = makeLog('lcs:event:sensors');

type RemoteHandler = (button: RemoteButtonPress) => Promise<void>;

const registeredHandlers: Map<string, Array<RemoteHandler>> = new Map();

async function notifyHandlers(sensor: SensorResource) {
  const button = sensor.lastPressedButton();
  const handlers = registeredHandlers.get(sensor.id);
  if (button && handlers) {
    log(`notifying ${handlers.length} handlers of remote ${sensor.id}`);
    await Promise.all(handlers.map((handler) => handler(button)));
  }
}

async function onSensorChanged(message: MessageFormat) {
  if (message.e === EventType.changed && message.r === ResourceType.sensors) {
    const { id } = message;
    const sensor = await SensorResource.detail(id);
    await sensor.update();
    sensor.print();
    await notifyHandlers(sensor);
  } else {
    log(error('Incompatible message received:'), message);
  }
}

export function addButtonEventHandler(sensor: SensorResource, handler: RemoteHandler): void {
  if (!registeredHandlers.has(sensor.id)) registeredHandlers.set(sensor.id, []);
  registeredHandlers.get(sensor.id)?.push(handler);
}

export function useSensorEvents(): void {
  addEventHandler(ResourceType.sensors, EventType.changed,
    (message: MessageFormat) => onSensorChanged(message));
}
