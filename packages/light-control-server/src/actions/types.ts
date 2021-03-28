import { GroupActionTransition } from 'light-control-lib';

export type RequestedScene = {
  id?: string
  offset?: number
}

export type ChangeSceneAction = { group: number, scene: RequestedScene };
export type ChangeGroupAction = { group: number, action: GroupActionTransition };
export type AnyAction = ChangeSceneAction | ChangeGroupAction;
