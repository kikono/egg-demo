// app/controller/user.js
module.exports = app => {
	class LoggerController extends app.Controller {
		* find() {
			this.inParam = {
				content : 'content',
				url : 'url'
			};
  			const  data  = yield this.getService('userLog').find(this.inParam);

  			this.success(data);
  		}
  }
  	return LoggerController;
}