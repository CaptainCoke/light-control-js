import { GroupActionTransition } from 'light-control-lib';
import { isArray, isNumber } from 'ts-util-is';

export type RequestedScene = {
  scene?: string
  offset?: number
}

export type ChangeSceneAction = { group: string, changeScene: RequestedScene };
export type ChangeGroupAction = { group: string, action: GroupActionTransition };
export type ToggleSceneAction = { group: string, toggleScene: RequestedScene };

export type AnyAction = {
  hoursOfDay?: [number, number],
} & (ChangeSceneAction | ChangeGroupAction | ToggleSceneAction);

export function isHoursOfDay(hoursOfDay: unknown): hoursOfDay is [number, number] {
  return isArray(hoursOfDay) && hoursOfDay.length === 2
    && hoursOfDay.every((x) => isNumber(x) && x >= 0 && x <= 24);
}
