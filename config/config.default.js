module.exports = appInfo => {
  return {
    /*********************系统默认配置*************************/


    // cache 设置 可以定义多个cache 例如 ['user','carType']
    // 通过user.set get 方法访问
    tokenRedis : {
        name : 'token', // 指定redis配置名称
        maxAge : 1800 * 1000,//maxAge 单位毫秒，
    },
    
    cacheRedis : 'cache',  // 指定redis配置名称

    middleware: [ 'errorHandler','auth','userLog'  ],
    errorHandler: {
      // 非 `/api/` 路径不在这里做错误处理，留给默认的 onerror 插件统一处理
      match: '/',
    },


    logger : {
      consoleLevel : 'DEBUG',
      appLogName: `${appInfo.name}-web.log`,
      coreLogName: 'core-web.log',
      agentLogName: 'agent-agent.log',
      errorLogName: 'common-error.log',
    },
    keys : '${appInfo.name}',

    companyDomain : 'company',
    
    security  : {
      csrf: false,
    },
    spruceMock  : {
      dir: './mock',
    },    
  };
};
