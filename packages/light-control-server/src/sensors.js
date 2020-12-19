import { recallScene } from './scenes.js';
import buttons from './buttons.config.js';

const sceneOnButton = {
  left: { gid: 1, scid: 1 },
  right: { gid: 1, scid: 2 },
};

export const onSensorChanged = (id, state) => {
  const { buttonevent, lastupdated } = state;
  const { button, action } = buttons[buttonevent];
  if (button) {
    console.log(`Remote ${id}`, { button, action });
    recallScene(sceneOnButton[button]);
  } else console.log(`Sensor ${id} changed to`, state);
};

export default {
  onSensorChanged,
};
