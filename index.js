'use strict';

const execa = require('execa');
const inflection = require('inflection');

const ctl = module.exports = {
	systemctl,
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

function parse_status(s) {
	const parsed = {};
	let match;
	let line;

	if (s.match(/could not be found/i)) {
		return false;
	}

	if (match = s.match(/([^ ]+)\.service/)) {
		parsed.name = match[1];
	}

	if (match = s.match(/\.service - (.+)/)) {
		parsed.description = match[1];
	}

	if (match = s.match(/Loaded:[ ]+(.+)/)) {
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
				parsed.path = parts[0];
			}
			if (parts.length >= 2) {
				parsed.startup = parts[1] === 'enabled';
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

	if (match = s.match(/Active: (.+)/)) {
		line = match[1];

		if (match = line.match(/([^ ]+)/)) {
			parsed.active = match[1] === 'active';
		}

		if (match = line.match(/since ([\w -:]+)/)) {
			parsed.started = new Date(match[1]);
		}
	}

	if (match = s.match(/Main PID: (\d+)/)) {
		parsed.pid = match[1];
	}

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

async function isEnabled(serviceName) {
	const result = await ctl.systemctl('is-enabled', serviceName);
	return Boolean(result.match(/^enabled/));
}

async function isActive(serviceName) {
	const result = await ctl.systemctl('is-active', serviceName);
	return Boolean(result.match(/^active/));
}

async function systemctl(...args) {
	const result = await execa('systemctl', args);
	if (result.stdout) {
		return result.stdout;
	}
	if (result.stderr) {
		throw new Error(result.stderr);
	}
	return result;
}
