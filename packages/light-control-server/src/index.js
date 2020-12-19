import _ from 'lodash';
import { getConfig } from './api.js';
import { setupWebsocket } from './websocket.js';
import { getAllLightIds, getLight, printLight } from './lights.js';
import { getAllSceneIds, getScene, printScene } from './scenes.js';

const requestError = (err) => console.error(err.message, _.pick(err.config, 'url', 'method'));

// get websocket settings from config and start listening to events
getConfig().then(({ websocketport }) => setupWebsocket(websocketport));

/*getAllLightIds()
  .then((ids) => ids.forEach((id) => getLight(id).then(printLight)))
  .catch(requestError);*/

/*getAllSceneIds()
  .then((ids) => ids.forEach((id) => getScene(id).then(printScene)));*/

/*setState(1, { bri: 128, transitiontime: 10 })
  .then(getLight)
  .then(printLight)
  .catch(requestError);*/
