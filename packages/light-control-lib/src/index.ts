import DeconzResource from './resources/DeconzResource';
import LightResource, { LightState } from './resources/LightResource';
import SceneResource from './resources/SceneResource';
import SensorResource, { SensorState, RemoteButtonPress } from './resources/SensorResource';
import GroupResource from './resources/GroupWithScenes';
import { GroupActionTransition } from './types/groups';

export {
  DeconzResource,
  GroupResource,
  LightResource,
  SceneResource,
  SensorResource,
  SensorState,
  LightState,
  RemoteButtonPress,
  GroupActionTransition,
};

export default {
  DeconzResource,
  GroupResource,
  LightResource,
  SceneResource,
  SensorResource,
};
