'use strict';
const ProxyServer = require('./server').ProxyServer;

module.exports = app => {
  app.proxyServer = new ProxyServer(app);
};


// class ProxyServer{
// 	constructor(app){
// 		console.info("--------------Create ProxyServer-------------");
// 		this.app = app;
// 	}
// 	login(){
// 		console.info("---------------调用 login---------------");
// 		const token = this.app.ctx;// extend/request.js 扩展
// 		console.info("---------------token---------------"+JSON.stringify(token));
// 		const login = new LoginServer(this.app);
// 		const param = {
// 			token: token,
// 		}
// 		login.param = param;
// 		const result = login.run();
// 		// console.info('result :'+JSON.stringify(result));
// 		return result;
// 	}

// }






// module.exports = app =>{
// 	app.phpServer = {
// 		* login(){
// 			console.info("---------------调用 login---------------");
// 			const data = {}
// 			const option = {
// 			method : 'POST',
// 				contentType: 'json',
// 				data : data,
// 			}
// 			const login = new LoginServer(option, app);
// 			const result = yield  login.run();
// 			return result;
// 		}
// 	}
// }
