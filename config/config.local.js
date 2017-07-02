module.exports = appInfo => {
  return {
    /*********************开发环境配置*************************/
    mongoose: {
      url: 'mongodb://192.168.0.240:27017/test',
      options: {
        db: { native_parser: true },
        user: 'test',
        pass: 'test'
      },
      domainPath: 'app/domain/mongo',
    },

    sequelize: {
      dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
      host: '192.168.0.240',
      port: '3306',
      user: 'root',
      password: '123456',
      database: '4sstar_world',
      domain: {
        name: 'world',
        dir: 'app/domain/world',
      },
      // sequelize model handle column timestamps and table name
      define: {
        timestamps: false,
        freezeTableName: true,
      },
    },

    redis: {
      clients: {
        // cache 的配置
        cache: {
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
    auth: {
      host: 'www.4sstar.cn',// 用于认证服务与缓存集团信息缓存标识
      me: {
        url: '/Home/Index/go/op/me',
      }
    },


  };
};
