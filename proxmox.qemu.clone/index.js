'use strict';

module.exports = (NODE) => {
  const triggerIn = NODE.getInputByName('trigger');
  const qemuIn = NODE.getInputByName('qemu');

  const doneOut = NODE.getOutputByName('done');

  triggerIn.on('trigger', async (conn, state) => {
    const qemus = await qemuIn.getValues(state);
    try {
      await Promise.all(qemus.map(qemu => qemu.clone({
        newVmId: NODE.data.newVmId,
        newName: NODE.data.newName,
        full: !!NODE.data.full
      })));
      doneOut.trigger(state);
    } catch (err) {
      NODE.error(err, state);
    }
  });
};
