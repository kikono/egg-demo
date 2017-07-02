const assert = require('assert');
const mock = require('egg-mock');
const request = require('supertest');
const Util = require('../util');
const Paginate = require('../../app/common/paginate');
describe('test/service/message.test.js', () => {
	let app;

	before(() => {
	    // 创建当前应用的 app 实例
	    app = mock.app();
	    // 等待 app 启动成功，才能执行测试用例
	    return app.ready();
	  });

	it('[TEST] config',function*() {
		const ctx = yield Util.init(app);
		assert(ctx.app.config['auth'])
	});	
	it('[TEST] service find',function*() {
		 // app.mockService('message', 'find', function* () {
		 // 	console.info('--------------'+args)
		 //    return 'popomore';
		 //  });
		const ctx = yield Util.init(app);
		  var param = {
		  	content : 'hello',
		  	paginate : new Paginate(),
		  }
		  const message = yield ctx.service['message'].find(param);
		  assert(message.count > 0);
		  console.info('total :'+message.count);
		  console.info('find count :'+message.list.length);
	});	
	it('[TEST] service create',function*() {

		const ctx = yield Util.init(app);
		  var param = {
		  	sender_name : 'tim',
		  	content : 'hello1'
		  }
		  const message = yield ctx.service['message'].create(param);
		  assert(message);
	});	


	
});