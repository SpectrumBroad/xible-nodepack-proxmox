'use strict';

module.exports = (NODE) => {
  const nodeIn = NODE.getInputByName('node');

  const qemuOut = NODE.getOutputByName('qemu');

  qemuOut.on('trigger', async (conn, state, callback) => {
    const nodes = await nodeIn.getValues(state);
    const qemus = await Promise.all(
      nodes
      .filter(node => !!node)
      .map(node => node.Qemu.getByVmId(NODE.data.vmId))
    );
    callback(qemus);
  });
};
