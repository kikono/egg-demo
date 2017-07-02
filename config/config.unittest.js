module.exports = appInfo => {
  return {
    /*********************开发环境配置*************************/    
    mongoose : {
      url: 'mongodb://192.168.0.240:27017/test',
      options: {
        db: { native_parser: true },
        user: 'test',
        pass: 'test'
      },
      domainPath : 'app/domain/mongo',
    },
    mysql : {
      // 单数据库信息配置
      client: {
        // host
        host: '192.168.0.240',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '123456',
        // 数据库名
        database: 'branch_world',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },

    redis : {
      clients: {
        // cache 的配置
        cache : { 
            host: '192.168.0.240',
            port: '6379',
            password: '$apr1$CXNy/Ob5$m.FIUANVJOjaBQgnKB8G3',
            db: '11',
        },  
        // token cache的配置      
        token: { 
            host: '192.168.0.240',
            port: '6379',
            password: '$apr1$CXNy/Ob5$m.FIUANVJOjaBQgnKB8G3',
            db: '12',
        },
      },
    },

    auth : {
      host : 'www.4sstar.cn',// 用于认证服务与缓存集团信息缓存标识
      me : {
        url : '/Home/Index/go/op/me',
      } 
    },
    /*********************系统默认配置*************************/

    logger : {
      dir: 'test/log',
      consoleLevel : 'DEBUG',
      appLogName: `test-web.log`,
      coreLogName: 'test-web.log',
      agentLogName: 'test-agent.log',
      errorLogName: 'test-error.log',
    },
    keys : '${appInfo.name}',

    security  : {
      csrf: false,
    },
  };
};
