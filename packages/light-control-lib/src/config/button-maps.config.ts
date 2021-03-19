import { Button, ButtonPress, PressAction } from '../types/sensors';

const buttonMaps : Record<string, Record<number, ButtonPress>> = {
  'TRADFRI remote control': {
    1001: { button: Button.POWER, action: PressAction.HOLD },
    1002: { button: Button.POWER, action: PressAction.SHORT },
    1003: { button: Button.POWER, action: PressAction.LONG },
    2001: { button: Button.UP, action: PressAction.HOLD },
    2002: { button: Button.UP, action: PressAction.SHORT },
    2003: { button: Button.UP, action: PressAction.LONG },
    3001: { button: Button.DOWN, action: PressAction.HOLD },
    3002: { button: Button.DOWN, action: PressAction.SHORT },
    3003: { button: Button.DOWN, action: PressAction.LONG },
    4001: { button: Button.LEFT, action: PressAction.HOLD },
    4002: { button: Button.LEFT, action: PressAction.SHORT },
    4003: { button: Button.LEFT, action: PressAction.LONG },
    5001: { button: Button.RIGHT, action: PressAction.HOLD },
    5002: { button: Button.RIGHT, action: PressAction.SHORT },
    5003: { button: Button.RIGHT, action: PressAction.LONG },
  },
};

export default buttonMaps;
