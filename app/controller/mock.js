var Mock = require('mockjs');
const Const = require('../common/const');

module.exports = app => {
	class MockController extends app.Controller {
		* index() {
			var controller = this.ctx.params.controller;
			console.info(JSON.stringify(this.ctx.params));
			var	method = this.ctx.params.method;
			this.app.logger.info('[mock] request:'+controller+'/'+method);
			var mockInfo = app.mock[controller];
			const validate = this.validRequest(mockInfo[method].request);
			var output = Mock.mock(mockInfo[method].response);
			this.ctx.body = {
	        	status : Const.status.success,
	        	data : output,
	        	validate :  {
	        		'输入验证' : '只做提示，不用处理',
	        		'验证结果' : validate,
	        	},
	      	};
			// this.success(output);
		}
		validRequest(request){
			var data = this.ctx.request.body;
			// console.info(JSON.stringify(request)+':'+JSON.stringify(data));
			var result = Mock.valid(request, data);
			return result;

		}
	}
	return MockController;
};
