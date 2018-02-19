'use strict';

module.exports = (NODE) => {
  const triggerIn = NODE.getInputByName('trigger');
  const nodeIn = NODE.getInputByName('node');

  const doneOut = NODE.getOutputByName('done');

  triggerIn.on('trigger', async (conn, state) => {
    const nodes = await nodeIn.getValues(state);
    await Promise.all(nodes.map(node => node.stopAll()));

    doneOut.trigger(state);
  });
};
