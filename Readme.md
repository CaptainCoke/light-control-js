# light-control-js

Control of Zigbee Light Link compatible lights

## Install

- `npm install -g yarn`
- `yarn install`

## Run the server

### Setup the server environment

First, generate yourself an API key for the deCONZ REST API.
Then, set the environment variables `DECONZ_HOST` and `DECONZ_API_KEY` appropriately.
For controlling the log output, set the `DEBUG` environment variable.

Alternatively, create a file `packages/light-control-server/.env` that contains assignments for all variables.

Example:

```properties
DECONZ_HOST=localhost
DECONZ_API_KEY=1234567890
DEBUG=lcs:*
```

### Run the server as a service

```console
npm install pm2 -g
pm2 start ecosystem.config.js
```

### Run the server standalone

```console
cd packages/light-control-server
yarn start
```

## Run the webapp

### Setup the webapp environment

First, generate yourself an API key for the deCONZ REST API.
Then, set the environment variables `DECONZ_HOST` and `DECONZ_API_KEY` appropriately.

Alternatively, create a file `packages/light-control-app/.env` that contains assignments for all variables.

Example:

```properties
DECONZ_HOST=localhost
DECONZ_API_KEY=1234567890
```

### Starting a local server that runs the webapp 

```console
cd packages/light-control-app
yarn start
```
