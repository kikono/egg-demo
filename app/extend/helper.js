const Const = require('../common/const');
const Util = require('../common/util');
module.exports = {
 /**
  * user cache  根据token获取用户信息
  */
 	*getUser(token){
 		if(!token) return;
 		let tokenRedisConfig = this.app.config['tokenRedis'];
		let name = tokenRedisConfig.name;
		let cache = this.app.redis.get(name);
		let user = yield cache.get(token);
		if(!user){
			let auth = this.app.config['auth'];
			let me = auth.me;
			//认证配置
			let option = {
				contentType : (!me.contentType)? 'json':me.contentType,
				dataType : (!me.dataType)? 'json':me.dataType,
				method : (!me.method)? 'GET':me.method,
				data : {token: token},
			};
			let url = auth.host + auth.me.url;
			let result = yield this.app.curl(url, option);
			result = result.data;
			console.info("login user :"+JSON.stringify(result));
			// 认证失败
			if(result.status === Const.status.error){
				return ;
			}
			user = JSON.stringify(result.data);
			// 设置token 有效时长
			let maxAge = tokenRedisConfig.maxAge;
	    	cache.set(token, user , 'PX', maxAge);
		}
		return user;
	},
	*getDBConfig(companyId){
		let cacheName = this.app.companyCacheName;
		let list = yield this.app.cache.get(cacheName);

		if(!list){
		    // 缓存公司信息
		    list = yield Util.cacheCompany(this.app);
		}

	    if(!list){
	    	return null;
	    }
	   	let company = JSON.parse(list)[companyId];
		let config = {};
    	config = {
		    host: company.dbserver,
		    // 端口号
		    port: company.dbport,
		    // 用户名
		    user: company.dbuser,
		    // 密码
		    password: company.dbpwd,
		    // 数据库名
		    database: company.dbname,
		};

	    // console.info('config+++++++++++=----------'+JSON.stringify(config));
	    return config;
	  },

};