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
  return (typeof on === 'undefined' || typeof on === 'boolean')
    && (typeof bri === 'undefined' || typeof bri === 'number')
    && (typeof hue === 'undefined' || typeof hue === 'number')
    && (typeof sat === 'undefined' || typeof sat === 'number')
    && (typeof ct === 'undefined' || typeof ct === 'number')
    && (typeof xyElem === 'undefined' || (Array.isArray(xyElem) && xyElem.length === 2 && xyElem.every((x) => typeof x === 'number')))
    && (typeof effect === 'undefined' || isEffect(effect))
    && (typeof scene === 'undefined' || typeof scene === 'string');
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
  return (typeof toggle === 'undefined' || typeof toggle === 'boolean')
    && (typeof alert === 'undefined' || isAlert(alert))
    && (typeof transitiontime === 'undefined' || typeof transitiontime === 'number')
    && (typeof rest === 'undefined' || isGroupAction(rest));
}
