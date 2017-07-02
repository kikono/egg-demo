'use strict';
const MessageCenter = require('./server').MessageCenterServer;
const SmartCrowServer = require('./server').SmartCrowServer;


class ProxyServer{
	constructor(app){
		this.app = app;
	}
	createServer(server, opt){
		return new server(this.app, opt);
	}


}

class LoginServer extends SmartCrowServer{
	constructor (app){
		let opt = {
			method : 'GET',
		};
		super(app, opt);
		this.url = app.config['serverPath'].login;
	}
}


BaseServer.LoginServer = LoginServer;

module.exports.ProxyServer = ProxyServer;