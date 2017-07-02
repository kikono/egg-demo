const Const = require('../common/const');
module.exports =  (options)  => {
	return function* (next){
		// console.info('request--------------------'+JSON.stringify(this.request));
		const token = this.request.token ;// extend/request.js 扩展
		this.app.logger.info("[auth] token :"+token);
		let user = yield this.helper.getUser(token);
		if (!user) {
			this.body = {
		        status : Const.status.error,
		        data : '请先登录系统', 
		    };
			return ;
	    }
    	//用户认证
	    this.me = JSON.parse(user);
	    this.dbConfig = yield this.helper.getDBConfig(this.company);
	   	this.app.logger.info("[auth] success :"+this.me.loginname);
		yield next;

	};
};
