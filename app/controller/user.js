// app/controller/user.js
module.exports = app => {
	class UserController extends app.Controller {
		* list() {
			//定义输入参数
  			const  data  = yield this.getService('user').findAll();
  			this.success(data);
  		}
  }
  	return UserController;
}