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

/** A temporary alert effect:
 * - none - lights are not performing an alert
 * - select - lights are blinking a short time
 * - lselect - lights are blinking a longer time
 */
export type Alert = 'none' | 'select' | 'lselect';
