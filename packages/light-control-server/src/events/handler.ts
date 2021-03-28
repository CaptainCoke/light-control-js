import {
  MessageFormat,
  logging,
  EventType,
  ResourceType,
} from 'light-control-lib';

const { makeLog, warning } = logging;
const log = makeLog('lcs:events:handler');

type EventHandler = (message: MessageFormat) => void;

const registeredHandlers: Map<string, EventHandler[]> = new Map<string, EventHandler[]>();

const handlerKey = (resource: ResourceType, event: EventType) => `${resource}-${event}`;

export function addEventHandler(
  resource: ResourceType,
  event: EventType,
  handler: EventHandler,
): void {
  const key = handlerKey(resource, event);
  if (registeredHandlers.has(key)) registeredHandlers.get(key)?.push(handler);
  else registeredHandlers.set(key, [handler]);
}

export function handleEvents(message: MessageFormat): void {
  const { e: event, r: resource } = message;
  const handlers = registeredHandlers.get(handlerKey(resource, event));
  if (handlers) handlers.forEach((handler) => handler(message));
  else log(warning('Unhandled message received:'), message);
}
