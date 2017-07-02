module.exports = app => {
	class MessageController extends app.Controller {


		* index() {
      // 初始化 请求参数，对request中定义的参数进行封装
			this.inParam = this.prepare();
			const service = this.getService('message');
  			const data  = yield service.find(this.inParam);
  			this.success(data);
  		}
		* create() {
			const createRul = {
				content: {
					type: 'string',
					required: true,
				},
				sender_name : {
					type: 'string',
					required: true,
					min : 1,
					max : 10,
				}
			}
			this.ctx.validate(createRul); // will throw if invalid
			// 初始化 请求参数，对request中定义的参数进行封装
			this.inParam = this.prepare();
			const service = this.getService('message');
			const data  = yield service.create(this.inParam);
			this.success(data);
		}
		* update() {
			// 初始化 请求参数，对request中定义的参数进行封装
			this.inParam = this.updatePrepare();
			const service = this.getService('message');
			const data  = yield service.update(this.inParam);
			this.success(data);
		}
		* delete() {
			// 初始化 请求参数，对request中定义的参数进行封装
			this.inParam = {
				_id: '_id',
			}
			const service = this.getService('message');
			// 请使用delete 进行逻辑删除
			const data  = yield service.delete(this.inParam._id);
			this.success(data);
		}


		prepare(){
			var inParam = {
				sender_name : 'sender_name',
				content : 'content',
			};
			return inParam;
		}
		updatePrepare(){
			var inParam = this.prepare();
			inParam._id = '_id';
			return inParam;
		}
  }
  return MessageController;
}