module.exports = appInfo => {
  return {
    /*********************生产环境配置*************************/


    proxyServer : {
      smartCrow : 'localhost',
      messageCenter : 'localhost:3000'
    },
    mongoose : {
      url: 'mongodb://192.168.0.240:27017/companys',
      options: {
        db: { native_parser: true },
        user: 'car4sstar',
        pass: 'b5be59d6a63ca538b3b4012f5b3f0e28'
      }
    },
    
    redis : {
      clients: {
        session: { /* config */ },
        cache: { /* config */ },
      },
    },
    sessionRedis : {
      name: 'session', // specific `session` as the session store
    },
  };
};
