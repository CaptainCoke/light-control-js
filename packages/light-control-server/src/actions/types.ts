import { GroupActionTransition } from 'light-control-lib';

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
  return Array.isArray(hoursOfDay) && hoursOfDay.length === 2 && hoursOfDay.every((x) => typeof x === 'number' && x >= 0 && x <= 24);
}
