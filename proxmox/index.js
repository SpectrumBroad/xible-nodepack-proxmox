module.exports = function(NODE) {

	const Proxmox = require('proxmox-wrapper');

	let proxmox = null;

	let proxmoxOut = NODE.getOutputByName('proxmox');
	proxmoxOut.on('trigger', (conn, state, callback) => {

		if (!proxmox) {

			proxmox = new Proxmox({
				username: NODE.data.username,
				password: NODE.data.password,
				hostname: NODE.data.hostname
			});

			return proxmox.login()
				.then(() => {
					callback(proxmox);
				}).catch((err) => {

					NODE.setTracker({
						message: err && err.statusCode === 401 ? 'invalid credentials' : 'unknown error',
						color: 'red',
						timeout: 5000
					});

				});

		}

		callback(proxmox);

	});

};
