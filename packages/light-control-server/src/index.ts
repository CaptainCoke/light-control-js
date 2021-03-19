import { DeconzResource, MessageFormat, logging } from 'light-control-lib';
import { setupWebsocket } from './websocket';
import { onResourceChanged, onSceneRecalled } from './events';

const { makeLog, warning } = logging;
const log = makeLog('lcs:handler');

function handleMessage(msg: MessageFormat): void {
  switch (msg.e) {
    case 'changed': onResourceChanged(msg); break;
    case 'scene-called': onSceneRecalled(msg); break;
    default: log(warning('Unsupported message occured:'), msg);
  }
}

// setup REST API
DeconzResource.setupApi(process.env.DECONZ_HOST, process.env.DECONZ_API_KEY);

// start listening to events
setupWebsocket(handleMessage);
