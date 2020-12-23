import { DeconzResource } from './api.js';
import { GroupResource } from './groups.js';
import buttons from './buttons.config.js';

const sceneOnButton = {
  left: { gid: 1, scid: 1 },
  right: { gid: 1, scid: 2 },
};

async function recallScene({ gid, scid }) {
  const group = await GroupResource.detail(gid);
  const scene = await group.scenes().detail(scid);
  scene.recall();
}

export class SensorResource extends DeconzResource {
  static endpoint = '/sensors';

  print() {
    console.log(this.attributes.id, this.attributes.name, this.attributes.state);
  }
}

export const onSensorChanged = (id, state) => {
  const { buttonevent, lastupdated } = state;
  const { button, action } = buttons[buttonevent];
  if (button) {
    console.log(`Remote ${id}`, { button, action });
    recallScene(sceneOnButton[button]);
  } else console.log(`Sensor ${id} changed to`, state);
};

export default {
  SensorResource,
  onSensorChanged,
};
