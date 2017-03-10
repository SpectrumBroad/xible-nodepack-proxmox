module.exports = function(NODE) {

	let nodeIn = NODE.getInputByName('node');

	let qemuOut = NODE.getOutputByName('qemu');

	qemuOut.on('trigger', (conn, state, callback) => {

		nodeIn.getValues(state).then((nodes) => {

			Promise.all(nodes
					.filter((node) => !!node)
					.map((node) => node.getQemuByVmId(NODE.data.vmId))
				)
				.then((qemus) => {
					callback(qemus);
				});

		});

	});

};
