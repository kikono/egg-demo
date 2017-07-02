let Const = require('../common/const');
let util = require('../common/util');
module.exports = app => {
  class UserLogService extends app.Service {

    * create(info) {
      // 获取models的方法
      let model = this.ctx.getModel('user_log');
      // console.info('userLog:'+info)
      let result = yield model.create(info);
      return result;
    }
    * find(param) {
      let option = param;
      let model = this.ctx.getModel('user_log');
      var reg = new  RegExp(option.content);
      // 查询条件
      var where = {};
      if(option.url){
          where.url = option.url;
      }
      if(option.content){
          where.content = {$regex : reg};
      }

      var query = model.where(where);
      const data = yield query.find();
      // const  data  =yield model.find(option);
      let result = {
        list : data
      };
      return result;
    }
  }
  return UserLogService;
};