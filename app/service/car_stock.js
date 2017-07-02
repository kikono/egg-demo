let Const = require('../common/const');
let util = require('../common/util');
module.exports = app => {
  class CarStockService extends app.Service {

    * save(info) {
        // 获取models的方法
        // const carStock = new app.mongoose.models['CarStock'](info);
        let carStock = this.ctx.myDomain.carStock;
        yield carStock.save({});
        return info;
    }

    * find(param) {
      // where 语句
      let where = ' 1=1 ';
      if(!util.isEmpty(param.qkey)){
        // where = 'like':'%'+param.qkey+'%';
        where = where +' and (vin like '+'\'%'+param.qkey+'%\' ';
        where = where +' or des like '+'\'%'+param.qkey+'%\' )';        
      }
      if(util.isEmpty(param.shopid) && util.isEmpty(param.wareids)){
        param.shopid = this.ctx.meTopId;
        param.wareids = param.shop_obj.wareids;
      }

      // 其他条件
      let option = {
        columns: ['model_name', 'id','vin'],
        where : where,
        limit: param.paginate.size, // 返回数据量
        offset: param.paginate.index, // 数据偏移量        
      }
      let model = this.ctx.getModel('carStock');
      const  data  = yield model.select(option);
      const  count = yield model.count(where);
      let result = {
        count : count,
        list : data,
      };
      console.info('result:'+result);
      // this.logger.info('[service 中使用config] status.success='+this.config['status'].success);
      // this.logger.info('[service 中使用logger]');
      // this.logger.info('----'+this.config['serverPath'].login);
      return result;
    }
  }
  return CarStockService;
};