module.exports = {
  apps: [{
    name: 'light-control-server',
    script: 'src/index.ts',
    cwd: 'packages/light-control-server',
    node_args: '--require dotenv/config',
    wait_ready: true,
    listen_timeout: 30000,
  }],
};
