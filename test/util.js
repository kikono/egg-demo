const assert = require('assert');
Util = {}
let token = '6-132-14954526260.9068250025879';
Util.token = token;
Util.init = function* init(app){
	let ctx = app.mockContext();
	var user = yield ctx.helper.getUser(token);
    //用户认证
	assert(user);
	ctx.me = JSON.parse(user);
	ctx.dbConfig = yield ctx.helper.getDBConfig(ctx.company);
	return ctx;
}
module.exports = exports = Util;