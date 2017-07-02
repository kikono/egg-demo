var Mock = require('mockjs');
const Const = require('../common/const');
const ProxyServer = require('../../config/proxy');
module.exports = app => {
	class ProxyController extends app.Controller {
		// 通用的代理服务 
		* common() {
			// 获取请求的服务名
			var controller = this.ctx.params.controller;
			var	method = this.ctx.params.method;
			this.app.logger.info('[proxy] server:'+controller+'/'+method);
			// 代理配置
			var proxyServer = new ProxyServer(app);
			let option = {
				contentType : this.ctx.request.type,
				dataType : 'json',
				method : this.ctx.method,
				data : this.ctx.request.body,
			};
			try{
				// 获取请求服务的主机地址，每个模块下可以有自己的host配置，如果未找到就用proxyPath下的host配置
				var host = proxyServer[controller]['server'];
				// 获取查询字符串 ?xx=yy
				var queryString = this.ctx.querystring;
				// 拼接请求url
				var url = host + proxyServer[controller][method];
				if(queryString){
					url = url  + '?'+queryString;
				}
				console.info('url:'+url)
				this.app.logger.debug('[proxy] querystring:'+queryString);
				this.app.logger.debug('[proxy] option:'+JSON.stringify(option));
				this.app.logger.debug('[proxy] url:'+url);
				// 转发请求
				let result = this.app.curl(url, option);
				this.ctx.body = result.data;
			}catch(error){
				var message = '[request] '+controller+'/'+method;
				this.notFound(message);
			}
		}

	}
	return ProxyController;
};
