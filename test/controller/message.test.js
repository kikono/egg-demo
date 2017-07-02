const assert = require('assert');
const mock = require('egg-mock');
const request = require('supertest');
const Util = require('../util');
describe('test/controller/message.test.js', () => {
	let app;
	let ctx;

	before(() => {
	    // 创建当前应用的 app 实例
	    app = mock.app();
	    // 等待 app 启动成功，才能执行测试用例
	    return app.ready();
	  });
	it('[TEST] controller find',function*() {
		
	    ctx = yield Util.init(app);
	    // let ctx = app.mockContext();
		var param = {
			token : Util.token,
			content : 'hello',
			page : 10,
			size : 20
		}
		return request(app.callback())
		    .post('/message/index')
		    .type('form')
		    .send(param)
		    .expect(200)
		    .expect(function(res){
		    	//判断是否有结果返回
		    	assert(JSON.parse(res.text).data.count > 0);
		    });


	});	
	


	
});