
const util = require('./util');
class BaseServer{
	constructor(app, opt={}){
		this.app = app;
		this.option = {
			method : 'POST',
			contentType: 'json',
			dataType: 'json',
		};
		this.option = util.merge(this.option, opt);
	} 
	get host(){
		return this.hostAddress;
	}
	set host(host){
		this.hostAddress = host;
	}
	set url(url){
		this.requestUrl = this.hostAddress + url;
	}
	get url(){
		return this.requestUrl;
	}

	set param(param){
		this.requestParam = param;
	}

	get param(){
		return this.requestParam;
	}
	*run(){
		this.option.data = this.param;
		console.info('options:'+JSON.stringify(this.option));
		const result = yield this.app.curl(this.url, this.option);
		return result.data;
	}
}

class SmartCrowServer extends BaseServer{
	constructor(app, opt={}){
		super(app, opt);
		this.host = app.config['proxyServer'].smartCrow;
	}


}

class MessageCenterServer extends BaseServer{
	constructor(app, opt={}){
		super(app, opt);
		this.host = app.config['proxyServer'].messageCenter;
	}
}




BaseServer = {};
BaseServer.MessageCenterServer = MessageCenterServer;
BaseServer.SmartCrowServer = SmartCrowServer;



module.exports.Server = BaseServer;