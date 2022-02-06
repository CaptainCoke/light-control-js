import {
  isArray,
  isBoolean,
  isNumber,
  isString,
  isUndefined,
} from 'ts-util-is';
import {
  Brigthness,
  ColorTemperature,
  Hue,
  Saturation,
  xy,
  Effect,
  Alert,
  isAlert,
  isEffect,
} from './lights';

export type GroupAction = {
  on?: boolean,
  bri?: Brigthness,
  hue?: Hue,
  sat?: Saturation,
  ct?: ColorTemperature,
  xy?: xy,
  effect?: Effect,
  scene?: string,
}

export function isGroupAction(action: unknown): action is GroupAction {
  const {
    on,
    bri,
    hue,
    sat,
    ct,
    xy: xyElem,
    effect,
    scene,
  } = action as Record<string, unknown>;
  return (isUndefined(on) || isBoolean(on))
    && (isUndefined(bri) || isNumber(bri))
    && (isUndefined(hue) || isNumber(hue))
    && (isUndefined(sat) || isNumber(sat))
    && (isUndefined(ct) || isNumber(ct))
    && (isUndefined(xyElem) || (isArray(xyElem) && xyElem.length === 2 && xyElem.every(isNumber)))
    && (isUndefined(effect) || isEffect(effect))
    && (isUndefined(scene) || isString(scene));
}

export type GroupActionTransition = GroupAction & {
  toggle?: boolean,
  alert?: Alert,
  transitiontime?: number,
};

export function isGroupActionTransition(action: unknown): action is GroupActionTransition {
  const {
    toggle,
    alert,
    transitiontime,
    ...rest
  } = action as Record<string, unknown>;
  return (isUndefined(toggle) || isBoolean(toggle))
    && (isUndefined(alert) || isAlert(alert))
    && (isUndefined(transitiontime) || isNumber(transitiontime))
    && (isUndefined(rest) || isGroupAction(rest));
}
