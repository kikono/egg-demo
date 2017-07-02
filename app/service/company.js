let Const = require('../common/const');
let util = require('../common/util');
module.exports = app => {
  class MessageService extends app.Service {

    * find(param) {
      let option = {}
      let model = this.ctx.domain.Company;
      const  data  = yield model.select(option);
      return data;
    }
  }
  return MessageService;
};