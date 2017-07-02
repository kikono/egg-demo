var dateFormat = require('dateformat');

class Util{

    static merge (dest, src){
        let slice = [].slice;
        console.info('dest:'+JSON.stringify(dest));
        console.info('src:'+JSON.stringify(src));
        src = slice.call(arguments, 1);
        let j, key, len, object, value;
        for (j = 0, len = src.length; j < len; j++) {
            object = src[j];
            for (key in object) {
                value = object[key];
                dest[key] = value;
            }
        }
        console.info('merge:'+JSON.stringify(dest));
        return dest;
    };
    static isEmptyObject (obj){
        if(!obj)return true;
        for(let key in obj){
            console.info('key:'+key);
            return false
        };
        console.info(true);
        return true
    };

  static * cacheCompany(app) {
    //app.js 中定义
    let cacheName = app.companyCacheName;
    app.cache.del(cacheName);
    const domain = app.config['sequelize'].domain;
    let data = yield app[domain.name]['company'].findAll();
    let objs = {};
    for (let i = 0; i < data.length; i++) {
      let id = data[i].id;
      objs[eval(id)] = data[i];
    }
    // 有效期30分钟
    let maxAge = 30 * 60;
    app.cache.set(cacheName, JSON.stringify(objs), 'EX', maxAge);
    console.info('-----------集团配置信息缓存成功！-----------缓存名称:' + cacheName);
    return yield app.cache.get(cacheName);
  };

    static getIPAdress(){
        var interfaces = require('os').networkInterfaces();
        for(var devName in interfaces){
            var iface = interfaces[devName];
            for(var i=0;i<iface.length;i++){
                var alias = iface[i];
                if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                    return alias.address;
                }
            }
        }
    };
    /**
     * 获得已格式化的当前时间
     */
    static now(){
        return  dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    }
    /**
     * 获得一天的格式化后开始时间 2017-05-11 00:00:00
     */
    static dayStart (){
        return  dateFormat(new Date(),"yyyy-mm-dd 00:00:00");
    }
    /**
     * 获得一天的格式化后结束时间 2017-05-11 23:59:59
     */
    static dayEnd (){
        return  dateFormat(new Date(),"yyyy-mm-dd 23:59:59");
    }
}

module.exports = exports = Util;