# light-control-js
Control of Zigbee Light Link compatible lights

## Install
- `npm install`
- `npx lerna bootstrap --hoist`

## Run the server

### Setup environment
First, generate yourself an API key for the deCONZ REST API.
Then, set the environment variables `DECONZ_HOST` and `DECONZ_API_KEY` appropriately.
For controlling the log output, set the `DEBUG` environment variable.

Alternatively, create a file `packages/light-control-server/.env` that contains assignments for all variables.

Example:
- `DECONZ_HOST=localhost`
- `DECONZ_API_KEY=1234567890`
- `DEBUG=lcs:*`

### Run the server as a service
- `npm install pm2 -g`
- `pm2 start light-control-server`

### Run the server standalone
- `cd packages/light-control-server`
- `npm start`

## Run the webapp

### Setup environment
First, generate yourself an API key for the deCONZ REST API.
Then, set the environment variables `DECONZ_HOST` and `DECONZ_API_KEY` appropriately.

Alternatively, create a file `packages/light-control-app/.env` that contains assignments for all variables.

Example:
- `DECONZ_HOST=localhost`
- `DECONZ_API_KEY=1234567890`

### Starting a local server that runs the webapp 
- `cd packages/light-control-app`
- `npm start`
