'use strict';

module.exports = (NODE) => {
  const triggerIn = NODE.getInputByName('trigger');
  const nodeIn = NODE.getInputByName('node');

  const doneOut = NODE.getOutputByName('done');

  triggerIn.on('trigger', async (conn, state) => {
    const nodes = await nodeIn.getValues(state);
    try {
      await Promise.all(nodes.map(node => node.startAll()));
    } catch (err) {
      NODE.error(err, state);
    }

    doneOut.trigger(state);
  });
};
