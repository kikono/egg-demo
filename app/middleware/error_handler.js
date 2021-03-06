let Const = require('../common/const');
module.exports = () => {
  return function* errorHandler(next) {
    try {
      yield next;
      if (this.status === 404 && !this.body) {
          if (this.acceptJSON) {
            this.body = { 
              status : Const.status.error,
              data: 'Not Found', 
            };
          }
          else this.body = '<h1>Page Not Found</h1>';
      }
    } catch (err) {
      // 注意：自定义的错误统一处理函数捕捉到错误后也要 `app.emit('error', err, this)`
      // 框架会统一监听，并打印对应的错误日志
      this.app.emit('error', err, this);
      this.logger.error(err);
      // 自定义错误时异常返回的格式
      this.body = {
        status : Const.status.error,
        data: this.app.config.env === 'prod' ? 'Internal Server Error' : err.message,
      };
    }
  };
};