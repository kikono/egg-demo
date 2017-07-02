const Const = require('../common/const');
var PathTemplate = require("path-template");
module.exports =  (options)  => {
	return function* (next){
		const token = this.request.token ;// extend/request.js 扩展
		let data = this.request.body;
		let logger = {
			user_id : this.me.employee_id,
			url : this.url,
			ip : this.ip,
			content : JSON.stringify(data)
		};
		var result = yield this.service['userLog'].create(logger);
		// let method = this.method;
		// let header = this.header;
		// let type = this.request.type;
		// let charset = this.request.charset;
		// console.info('url:'+url);
		// console.info('originalUrl:'+originalUrl);
		// console.info('user:'+user);
		// console.info('origin:'+origin);
		// console.info('data:'+JSON.stringify(data));
		// console.info('method:'+method);
		// console.info('header:'+JSON.stringify(header));
		// console.info('type:'+type);
		// console.info('charset:'+charset);
		// console.info(JSON.stringify(this.params));
		yield next;

	};
};
