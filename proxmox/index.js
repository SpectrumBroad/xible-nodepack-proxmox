'use strict';

module.exports = (NODE) => {
  // const ProxmoxWrapper = require('proxmox-wrapper');
  const ProxmoxWrapper = require('/var/node/proxmox-wrapper');

  let proxmox = null;

  const proxmoxOut = NODE.getOutputByName('proxmox');
  proxmoxOut.on('trigger', async (conn, state, callback) => {
    if (proxmox) {
      callback(proxmox);
      return;
    }

    proxmox = new ProxmoxWrapper({
      username: NODE.data.username,
      password: NODE.data.password,
      hostname: NODE.data.hostname
    });

    try {
      await proxmox.login();
      callback(proxmox);
    } catch (err) {
      NODE.setTracker({
        message: err && err.statusCode === 401 ? 'invalid credentials' : `unknown error: ${err.statusCode}`,
        color: 'red',
        timeout: 5000
      });
    }
  });
};
