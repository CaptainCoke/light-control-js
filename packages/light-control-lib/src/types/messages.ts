import { LightState } from './lights';
import { SensorState } from './sensors';

export enum EventType {
  added = 'added',
  changed = 'changed',
  deleted = 'deleted',
  sceneCalled = 'scene-called',
}

export enum ResourceType {
  lights = 'lights',
  sensors = 'sensors',
  groups = 'groups',
  scenes = 'scenes',
}

export type ResourceChangedMessage = {
  e: EventType.changed,
  id: number,
  name?: string,
}

export type LightChangedMessage = ResourceChangedMessage & {
  r: ResourceType.lights,
  state?: LightState,
}

export type SensorChangedMessage = ResourceChangedMessage & {
  r: ResourceType.sensors,
  state?: SensorState,
  config?: Record<string, unknown>,
}

export type GroupChangedMessage = ResourceChangedMessage & {
  r: ResourceType.groups,
  state?: Record<string, boolean>,
}

export type AnyResourceChangedMessage = (
  LightChangedMessage |
  SensorChangedMessage |
  GroupChangedMessage);

export type ResourceAddedOrDeletedMessage = {
  e: EventType.added | EventType.deleted,
  r: ResourceType,
  id: number,
}

export type SceneRecalledMessage = {
  e: EventType.sceneCalled,
  r: ResourceType.scenes,
  gid: number,
  scid: number,
}

export type MessageFormat =
  ResourceAddedOrDeletedMessage | AnyResourceChangedMessage | SceneRecalledMessage;
