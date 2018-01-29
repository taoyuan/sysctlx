const {assert} = require('chai');
const sinon = require('sinon');

const c = require('..');
const m = require('./fixtures/mocks');

describe('sysctlx', () => {
	afterEach(() => {
		c.systemctl.restore && c.systemctl.restore();
	});

	describe('status', () => {
		it('should parse unknown service status', async () => {
			sinon.stub(c, 'systemctl').callsFake(function (...args) {
				assert.sameDeepMembers(args, ['status', 'create_ap']);
				return m.STATUS_NOT_FOUND;
			});

			const status = await c.status('create_ap');
			assert.equal(status, false);
		});


		it('should parse inactive status', async () => {
			sinon.stub(c, 'systemctl').callsFake(function (...args) {
				assert.sameDeepMembers(args, ['status', 'create_ap']);
				return m.STATUS_INACTIVE;
			});

			const status = await c.status('create_ap');
			assert.deepEqual(status, {
				name: 'create_ap',
				description: 'Create AP Service',
				loaded: true,
				file: '/usr/lib/systemd/system/create_ap.service',
				startup: 'disabled',
				props: {
					'vendor preset': 'enabled'
				},
				active: 'inactive',
				raw: m.STATUS_INACTIVE,
			});
		});

		it('should parse disabled status', async () => {
			sinon.stub(c, 'systemctl').callsFake(function (...args) {
				assert.sameDeepMembers(args, ['status', 'create_ap']);
				return m.STATUS_DISABLED;
			});

			const status = await c.status('create_ap');
			assert.deepEqual(status, {
				name: 'create_ap',
				description: 'Create AP Service',
				loaded: true,
				file: '/usr/lib/systemd/system/create_ap.service',
				startup: 'disabled',
				props: {
					'vendor preset': 'enabled'
				},
				active: 'inactive',
				raw: m.STATUS_DISABLED,
			});
		});

		it('should parse enabled status', async () => {
			sinon.stub(c, 'systemctl').callsFake(function (...args) {
				assert.sameDeepMembers(args, ['status', 'create_ap']);
				return m.STATUS_ENABLED;
			});

			const status = await c.status('create_ap');
			assert.deepEqual(status, {
				name: 'create_ap',
				description: 'Create AP Service',
				loaded: true,
				file: '/usr/lib/systemd/system/create_ap.service',
				startup: 'enabled',
				props: {
					'vendor preset': 'enabled'
				},
				active: 'inactive',
				raw: m.STATUS_ENABLED
			});
		});


		it('should parse active status', async () => {
			sinon.stub(c, 'systemctl').callsFake(function (...args) {
				assert.sameDeepMembers(args, ['status', 'create_ap']);
				return m.STATUS_ACTIVE;
			});

			const status = await c.status('create_ap');
			assert.deepEqual(status, {
				name: 'create_ap',
				description: 'Create AP Service',
				loaded: true,
				file: '/usr/lib/systemd/system/create_ap.service',
				startup: 'disabled',
				props: {
					'vendor preset': 'enabled'
				},
				active: 'active',
				started: new Date('2018-01-28T09:37:11.000Z'),
				pid: '29383',
				raw: m.STATUS_ACTIVE
			});
		});

		it('should parse activating status', async () => {
			sinon.stub(c, 'systemctl').callsFake(function (...args) {
				assert.sameDeepMembers(args, ['status', 'create_ap']);
				return m.STATUS_ACTIVATING;
			});

			const status = await c.status('create_ap');
			assert.deepEqual(status, {
				name: 'create_ap',
				description: 'Create AP Service',
				loaded: true,
				file: '/usr/lib/systemd/system/create_ap.service',
				startup: 'disabled',
				props: {'vendor preset': 'enabled'},
				active: 'activating',
				started: new Date('2018-01-29T10:01:46.000Z'),
				pid: '25982',
				raw: m.STATUS_ACTIVATING
			});
		});

		it('should parse error status', async () => {
			sinon.stub(c, 'systemctl').callsFake(function (...args) {
				assert.sameDeepMembers(args, ['status', 'create_ap']);
				return m.STATUS_ERROR;
			});

			const status = await c.status('create_ap');
			assert.deepEqual(status, {
				name: 'test',
				loaded: false,
				error: 'Invalid argument',
				active: 'inactive',
				raw: m.STATUS_ERROR
			});
		});
	});

	describe('checkActive', () => {
		it('should check active', async () => {
			sinon.stub(c, 'systemctl').callsFake(function (...args) {
				assert.sameDeepMembers(args, ['is-active', 'create_ap']);
				return 'active';
			});

			const active = await c.checkActive('create_ap');
			assert.equal(active, 'active');
		});

		it('should check inactive', async () => {
			sinon.stub(c, 'systemctl').callsFake(function (...args) {
				assert.sameDeepMembers(args, ['is-active', 'create_ap']);
				return 'inactive';
			});

			const active = await c.checkActive('create_ap');
			assert.equal(active, 'inactive');
		});
	});

	describe('isActive', () => {
		it('should parse active', async () => {
			sinon.stub(c, 'systemctl').callsFake(function (...args) {
				assert.sameDeepMembers(args, ['is-active', 'create_ap']);
				return 'active';
			});

			const active = await c.isActive('create_ap');
			assert.equal(active, true);
		});

		it('should parse inactive', async () => {
			sinon.stub(c, 'systemctl').callsFake(function (...args) {
				assert.sameDeepMembers(args, ['is-active', 'create_ap']);
				return 'inactive';
			});

			const active = await c.isActive('create_ap');
			assert.equal(active, false);
		});
	});

	describe('checkEnabled', () => {
		it('should check enabled', async () => {
			sinon.stub(c, 'systemctl').callsFake(function (...args) {
				assert.sameDeepMembers(args, ['is-enabled', 'create_ap']);
				return 'enabled';
			});

			const enabled = await c.checkEnabled('create_ap');
			assert.equal(enabled, 'enabled');
		});

		it('should check not found', async () => {
			sinon.stub(c, 'systemctl').callsFake(function (...args) {
				assert.sameDeepMembers(args, ['is-enabled', 'create_ap']);
				return 'Failed to get unit file state for test.service: No such file or directory';
			});

			const enabled = await c.checkEnabled('create_ap');
			assert.equal(enabled, 'notfound');
		});

		it('should check static', async () => {
			sinon.stub(c, 'systemctl').callsFake(function (...args) {
				assert.sameDeepMembers(args, ['is-enabled', 'create_ap']);
				return 'static';
			});

			const enabled = await c.checkEnabled('create_ap');
			assert.equal(enabled, 'static');
		});
	});

	describe('isEnabled', () => {
		it('should parse enabled', async () => {
			sinon.stub(c, 'systemctl').callsFake(function (...args) {
				assert.sameDeepMembers(args, ['is-enabled', 'create_ap']);
				return 'enabled';
			});

			const enabled = await c.isEnabled('create_ap');
			assert.equal(enabled, true);
		});

		it('should parse not found', async () => {
			sinon.stub(c, 'systemctl').callsFake(function (...args) {
				assert.sameDeepMembers(args, ['is-enabled', 'create_ap']);
				return 'Failed to get unit file state for test.service: No such file or directory';
			});

			const enabled = await c.isEnabled('create_ap');
			assert.equal(enabled, false);
		});

		it('should parse static', async () => {
			sinon.stub(c, 'systemctl').callsFake(function (...args) {
				assert.sameDeepMembers(args, ['is-enabled', 'create_ap']);
				return 'static';
			});

			const enabled = await c.isEnabled('create_ap');
			assert.equal(enabled, false);
		});
	});

});
