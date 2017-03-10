module.exports = function(NODE) {

	let proxmoxIn = NODE.getInputByName('proxmox');

	let nodeOut = NODE.getOutputByName('node');

	nodeOut.on('trigger', (conn, state, callback) => {

		proxmoxIn.getValues(state).then((proxmoxs) => {

			Promise.all(proxmoxs.map((proxmox) => proxmox.Node.getByName(NODE.data.nodeName)))
				.then((nodes) => {
					callback(nodes);
				});

		});

	});

};
