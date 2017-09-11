'use strict';

module.exports = (NODE) => {
  const triggerIn = NODE.getInputByName('trigger');
  const qemuIn = NODE.getInputByName('qemu');

  const doneOut = NODE.getOutputByName('done');

  triggerIn.on('trigger', (conn, state) => {
    qemuIn.getValues(state)
    .then((qemus) => {
      Promise.all(qemus.map(qemu => qemu.start()))
      .then(() => {
        doneOut.trigger(state);
      })
      .catch((err) => {
        NODE.error(err, state);
      });
    });
  });
};
