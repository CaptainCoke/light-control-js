export enum Button {
  POWER = 'power',
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum PressAction {
  HOLD = 'hold',
  SHORT = 'short',
  LONG = 'long'
}

export type ButtonPress = { button: Button, action: PressAction };

export type SensorState = {
  buttonevent?: number,
  lastupdated: string,
};

export type RemoteButtonPress = ButtonPress & { remote: string }
