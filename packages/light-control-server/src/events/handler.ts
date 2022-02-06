import {
  MessageFormat,
  logging,
  EventType,
  ResourceType,
} from 'light-control-lib';

const { makeLog, warning } = logging;
const log = makeLog('lcs:events:handler');

type EventHandler = (message: MessageFormat) => Promise<void>;

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

export async function handleEvents(message: MessageFormat): Promise<void> {
  const { e: event, r: resource } = message;
  const handlers = registeredHandlers.get(handlerKey(resource, event));
  if (handlers) {
    await Promise.all(handlers.map((handler) => handler(message)));
  } else log(warning('Unhandled message received:'), message);
}
