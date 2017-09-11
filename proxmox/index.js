'use strict';

module.exports = (NODE) => {
  const Proxmox = require('proxmox-wrapper');

  let proxmox = null;

  const proxmoxOut = NODE.getOutputByName('proxmox');
  proxmoxOut.on('trigger', (conn, state, callback) => {
    if (!proxmox) {
      proxmox = new Proxmox({
        username: NODE.data.username,
        password: NODE.data.password,
        hostname: NODE.data.hostname
      });

      proxmox.login()
      .then(() => {
        callback(proxmox);
      }).catch((err) => {
        NODE.setTracker({
          message: err && err.statusCode === 401 ? 'invalid credentials' : 'unknown error',
          color: 'red',
          timeout: 5000
        });
      });
      return;
    }

    callback(proxmox);
  });
};
