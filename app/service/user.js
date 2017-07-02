module.exports = app => {
  class UserService extends app.Service {

    * find() {
      let option = {
        limit: 10, // 返回数据量
        offset: 0, // 数据偏移量        
      }
      // console.info(this.ctx.domain.login);
      let model = this.ctx.domain.login;
      const  data  = yield model.select(option);
      return data;
    }
    * findAll() {
      let option = {
        limit: 10, // 返回数据量
        offset: 0, // 数据偏移量        
      }
      // console.info(this.ctx.domain.login);
      const users = yield this.ctx.getModel('login').select(option);
      return users;
    }
  }
  return UserService;
};