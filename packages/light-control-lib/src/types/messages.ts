import { LightState } from './lights';
import { SensorState } from './sensors';

type LightChangedMessage = {
  r: 'lights',
  state?: LightState,
}

type SensorChangedMessage = {
  r: 'sensors',
  state?: SensorState,
  config?: Record<string, unknown>,
}

type GroupChangedMessage = {
  r: 'groups',
  state?: Record<string, boolean>,
}

export type ResourceChangedMessage = {
  e: 'changed',
  id: number,
  name?: string,
} & (LightChangedMessage | SensorChangedMessage | GroupChangedMessage);

export type ResourceAddedOrDeletedMessage = {
  e: 'added' | 'deleted',
  r: 'groups' | 'sensors' | 'lights' | 'scenes',
  id: number,
}

export type SceneRecalledMessage = {
  e: 'scene-called',
  gid: number,
  scid: number,
}

export type MessageFormat =
  ResourceAddedOrDeletedMessage | ResourceChangedMessage | SceneRecalledMessage;
