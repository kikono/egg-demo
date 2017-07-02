let Const = require('../common/const');
let util = require('../common/util');
module.exports = app => {
  // message 为 mongo 操作
  class MessageService extends app.Service {

    * create(info) {
      // 获取models的方法
      let model = this.ctx.getModel('message');
      let result = yield model.create(info);
      return result;
    }
    * createMany(info) {
      // 获取models的方法
      let model = this.ctx.getModel('message');
      // let logger = this.ctx.getModel('logger');
      var doc =[];
      doc.push(info);
      doc.push(info);

      let result = yield model.createMany(info);
      return result;
    }    
    * update(info) {
      let model = this.ctx.getModel('message');
      var result = yield model.update(info).where({_id:info._id});
      return result;
    }
    * delete(id) {
      let model = this.ctx.getModel('message');
      var result = yield model.findById(id);
      return result;
    }
    * find(param) {
      // 其他条件
      let option = param;
      let model = this.ctx.getModel('message');
      var reg = new  RegExp(option.content);
      // 查询条件
      var where = {};
      if(option.sender_name){
          where.sender_name = option.sender_name;
      }
      if(option.content){
          where.content = {$regex : reg};
      }

      var query = model.where(where);
      // 查询字段
      var filed ='sender_name content';
      query.select(filed);
      // 查询数量
      const count = yield query.count();
      // 分页查询
      if(option.paginate){
        query.skip(option.paginate.index);
        query.limit(option.paginate.size);
      }
      const data = yield query.find();
      // const  data  =yield model.find(option);
      let result = {
        count : count,
        list : data
      };
      return result;
    }
  }
  return MessageService;
};