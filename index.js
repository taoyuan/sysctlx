'use strict';

const {exec} = require('child-process-promise');

const ctl = module.exports = {
	systemctl,
	checkActive,
	checkEnabled,
	isActive,
	isEnabled,
	status,
	enable,
	disable,
	start,
	stop,
	restart,
	reload
};

function parse_status(raw) {
	const parsed = {};
	let match;
	let line;

	if (raw.match(/could not be found/i)) {
		return false;
	}

	if (match = raw.match(/([^ ]+)\.service/)) {
		parsed.name = match[1];
	}

	if (match = raw.match(/\.service - (.+)/)) {
		parsed.description = match[1];
	}

	if (match = raw.match(/Loaded:[ ]+(.+)/)) {
		line = match[1];

		if (match = line.match(/([^ ]+)/)) {
			parsed.loaded = match[1] === 'loaded';
		}

		if (!parsed.loaded) {
			if (match = line.match(/Reason: ([^)]+)/)) {
				parsed.error = match[1];
			}
		} else if (match = line.match(/\((.+)\)/)) {
			const props = match[1];
			const parts = props.split(';').map(s => s.trim());
			if (parts.length >= 1) {
				parsed.file = parts[0];
			}
			if (parts.length >= 2) {
				parsed.startup = parts[1];
			}
			if (parts.length >= 3) {
				for (let i = 2; i < parts.length; i++) {
					const arr = parts[i].split(':').map(s => s.trim());
					parsed.props = parsed.props || {};
					parsed.props[arr[0]] = arr[1];
				}
			}
		}
	}

	if (match = raw.match(/Active: (.+)/)) {
		line = match[1];

		if (match = line.match(/([^ ]+)/)) {
			parsed.active = match[1];
		}

		if (match = line.match(/since ([\w -:]+)/)) {
			parsed.started = new Date(match[1]);
		}
	}

	if (match = raw.match(/Main PID: (\d+)/)) {
		parsed.pid = match[1];
	}

	parsed.raw = raw;

	return parsed;
}

async function status(serviceName) {
	const result = await ctl.systemctl('status', serviceName);
	return parse_status(result);
}

async function enable(serviceName) {
	return await ctl.systemctl('enable', serviceName);
}

async function disable(serviceName) {
	return await ctl.systemctl('disable ', serviceName);
}

async function start(serviceName, reloadIfChanged) {
	const result = await ctl.systemctl('start ', serviceName);
	if (reloadIfChanged && result && result.match(/changed on disk/)) {
		await ctl.reload();
		return await ctl.systemctl('start ', serviceName);
	}
	return result;
}

async function stop(serviceName) {
	return await ctl.systemctl('stop ', serviceName);
}

async function restart(serviceName) {
	return await ctl.systemctl('restart ', serviceName);
}

async function reload() {
	return await ctl.systemctl('daemon-reload');
}

async function checkEnabled(serviceName) {
	const result = await ctl.systemctl('is-enabled', serviceName);
	if (/No such file or directory/.test(result)) {
		return 'notfound';
	}
	return result;
}

async function checkActive(serviceName) {
	return await ctl.systemctl('is-active', serviceName);
}

async function isEnabled(serviceName) {
	const result = await checkEnabled(serviceName);
	return Boolean(result.match(/^enabled/));
}

async function isActive(serviceName) {
	const result = await checkActive(serviceName);
	return Boolean(result.match(/^active/));
}

async function systemctl(...args) {
	try {
		const result = await exec(['systemctl', ...args].join(' '));
		return result.stdout || result.stderr;
	} catch (e) {
		return e.stdout || e.stderr;
	}
}
