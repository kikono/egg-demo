// app/controller/employee.js
module.exports = app => {
	class EmployeeController extends app.Controller {
		* list() {
			//定义输入参数
			this.inParam = {
	          	name : 'name',
	        };
  			const  data  = yield this.getService('employee').find(this.inParam);
  			this.success(data);
  		}
		* view() {
			//定义输入参数
			this.inParam = {
	          	id : 'id',
	        };
  			const  data  = yield this.getService('employee').findById(this.inParam.id);
  			this.success(data);
  		}
		* count() {
  			const  data  = yield this.getService('employee').count();
  			this.success(data);
  		}	
		* create() {
			//定义输入参数
			this.inParam = {
	        	name : 'name',
				tel : 'tel'
	        };
  			const  data  = yield this.getService('employee').create(this.inParam);
  			this.success(data);
  		}	
		//批量插入
		* bulkCreate() {
			//定义输入参数
			this.inParam = {
	        	name : 'name',
				tel : 'tel'
	        };
  			const  data  = yield this.getService('employee').bulkCreate(this.inParam);
  			this.success(data);
  		}		  
		* update() {
			//定义输入参数
			this.inParam = {
				id : 'id',
	        	name : 'name',
				tel : 'tel'
	        };
  			const  data  = yield this.getService('employee').update(this.inParam);
  			this.success(data);
  		}		  	  	  
  }
  	return EmployeeController;
}