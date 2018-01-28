'use strict';

const execa = require('execa');

const ctl = module.exports = {
	systemctl,
	isEnabled,
	status,
	enable,
	disable,
	start,
	stop,
	restart,
	daemonReload
};

async function status(service_name) {
	return ctl.systemctl("status", service_name);
}

async function enable(service_name) {
	return ctl.systemctl("enable", service_name);
}

async function disable(service_name) {
	return ctl.systemctl("disable ", service_name);
}

async function start(service_name) {
	return ctl.systemctl("start ", service_name);
}

async function stop(service_name) {
	return ctl.systemctl("stop ", service_name);
}

async function restart(service_name) {
	return ctl.systemctl("restart ", service_name);
}

async function daemonReload() {
	return ctl.systemctl("daemon-reload");
}

async function isEnabled(service_name) {
	const result = await ctl.systemctl('is-enabled ', service_name);
	return result.stdout.indexOf('enabled') >= 0;
}

function systemctl(...args) {
	return execa('systemctl', args);
}
