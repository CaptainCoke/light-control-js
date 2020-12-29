module.exports = {
  apps: [{
    name: 'light-control-server',
    script: 'src/index.js',
    cwd: 'packages/light-control-server',
    node_args: '--require dotenv/config',
    wait_ready: true,
  }],
};
