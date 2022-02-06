import { isString } from 'ts-util-is';

/** Integer in 0...255 */
export type Brigthness = number;

/** Integer in 0...65535 mapping to 0° - 360° */
export type Hue = number;

/** Integer in 0...255 */
export type Saturation = number;

/** Integer in 153...500, expressing CT in Mired */
export type ColorTemperature = number;

/** Real numbers in 0 - 1 */
export type xy = [number, number];

/** Effect on light or group:
 * - none - no effect
 * - colorloop - the lights of the group will cycle continously through all
 *               colors with the speed specified by colorloopspeed
 */
export type Effect = 'none' | 'colorloop';

export function isEffect(effect: unknown): effect is Effect {
  return isString(effect) && (effect === 'none' || effect === 'colorloop');
}

/** A temporary alert effect:
 * - none - lights are not performing an alert
 * - select - lights are blinking a short time
 * - lselect - lights are blinking a longer time
 */
export type Alert = 'none' | 'select' | 'lselect';

export function isAlert(alert: unknown): alert is Alert {
  return isString(alert) && (alert === 'none' || alert === 'select' || alert === 'lselect');
}

export type ColorTemperatureLightState = {
  colormode: 'ct',
  ct: ColorTemperature,
}

export type XyLightState = {
  colormode: 'xy',
  xy: xy,
}

export type HueSaturationLightState = {
  colormode: 'hs',
  hue: Hue,
  sat: Saturation,
}

export type SwitchableLightState = {
  reachable: boolean,
  on?: boolean,
  bri?: Brigthness,
  effect?: Effect,
  alert?: Alert,
}

export type LightState = SwitchableLightState &
  (ColorTemperatureLightState | XyLightState | HueSaturationLightState);
