// 代理配置
function ProxyServer(app) {
    // 代理服务 
    let proxyServer = {
      smartCrow : "",// 云杉1.0 服务
      messageCenter : "", // 消息中心 服务
    };

    // 为每个服务注入 主机地址，需要config中配置
    for(let key in proxyServer){
      proxyServer[key] = app.config['proxyServer'][key];
      // console.info(proxyServer[key]);
    }

    // 配置服务
    // server属性 是必须的，指定了是哪个微服务
    proxyServer.message = {
        // server指定了哪个微服务
        server : proxyServer.messageCenter,
        list : '/message/index',
        find : '/message/index',
    };
    proxyServer.category = {
        // server指定了哪个微服务
        server : proxyServer.smartCrow,      
        queryCates : '/Admin/Category/go/op/queryCates',
    };
    return proxyServer;
};

module.exports = exports = ProxyServer;