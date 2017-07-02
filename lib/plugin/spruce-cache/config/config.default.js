'use strict';

/**
 * proxy-server default config
 * @member Config#proxy-server
 * @property {String} SOME_KEY - some description
 */
module.exports = appInfo => {
  return {
	// cache 设置 可以定义多个cache 例如 ['user','carType']
    // 通过user.set get 方法访问
    // smartCache : ['user'],
  };
};
