module.exports = function(NODE) {

	let triggerIn = NODE.getInputByName('trigger');
	let qemuIn = NODE.getInputByName('qemu');

	let doneOut = NODE.getOutputByName('done');

	triggerIn.on('trigger', (conn, state) => {

		qemuIn.getValues(state).then((qemus) => {

			Promise.all(qemus.map((qemu) => qemu.stop()))
				.then(() => {
					doneOut.trigger(state);
				})
				.catch((err) => {
					NODE.fail('' + err, state);
				});

		});

	});

};
