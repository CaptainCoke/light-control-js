import {
  Brigthness,
  ColorTemperature,
  Hue,
  Saturation,
  xy,
  Effect,
  Alert,
} from './lights';

export type GroupAction = {
  on?: boolean,
  bri?: Brigthness,
  hue?: Hue,
  sat?: Saturation,
  ct?: ColorTemperature,
  xy?: xy,
  effect?: Effect,
  scene?: number,
}

export type GroupActionTransition = GroupAction & {
  toggle?: boolean,
  alert?: Alert,
  transitiontime?: number,
};
