import _ from 'lodash';
import { getConfig } from './api.js';
import { setupWebsocket } from './websocket.js';

const requestError = (err) => console.error(err.message, _.pick(err.config, 'url', 'method'));

// get websocket settings from config and start listening to events
getConfig().then(({ websocketport }) => setupWebsocket(websocketport));
