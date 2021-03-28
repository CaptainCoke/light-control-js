import { DeconzResource, SensorResource } from 'light-control-lib';
import { setupWebsocket } from './websocket';
import {
  useSensorEvents,
  useGroupEvents,
  useLightEvents,
  addButtonEventHandler,
} from './events';
import { useRemoteMappingFromFile, handleButton } from './remotes';

async function setupService() {
  // setup REST API
  DeconzResource.setupApi(process.env.DECONZ_HOST, process.env.DECONZ_API_KEY);

  // load actions to be perfomed on press of a remote button
  await useRemoteMappingFromFile('./config/remote-button-actions.json');

  const { resources: sensors } = await SensorResource.list();
  sensors.forEach((sensor) => addButtonEventHandler(sensor, handleButton));

  // setup event listening
  useSensorEvents();
  useGroupEvents();
  useLightEvents();

  // start listening to websocket events
  await setupWebsocket();

  // Send the ready signal to PM2
  process?.send?.('ready');
}

setupService();
