'use strict';

module.exports = (NODE) => {
  const proxmoxIn = NODE.getInputByName('proxmox');

  const nodeOut = NODE.getOutputByName('node');

  nodeOut.on('trigger', async (conn, state, callback) => {
    const proxmoxs = await proxmoxIn.getValues(state);
    const nodes = await Promise.all(proxmoxs.map(proxmox => proxmox.Node.getByName(NODE.data.nodeName)));
    callback(nodes);
  });
};
