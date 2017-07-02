module.exports = app => {
	class CarStorController extends app.Controller {


		* index() {
      // 初始化 请求参数，对request中定义的参数进行封装
        this.inParam = {
          shopid : 'shopid',
          order : 'order',
          wareids : 'wareids',
          qkey : 'qkey',
          brandid : 'brandid',
          typeids : 'typeids',
          ft_model : 'ft_model',
          status : 'status',
          et_start : 'et_start',
          et_end : 'et_end',
          od_c : 'od_c',
          od_st : 'od_st',
          od_et : 'od_et',
          order : 'order',
        };
        // console.info('------------token-----------'+this.ctx.request.token);
        // console.info("user-agent:"+this.ctx.get('user-agent'));
        // console.info("x-request-token:"+this.ctx.get('x-request-token'));
        // console.info("client is PC ?:"+this.config['status'].success);
        // console.info('app:'+new (app.proxyPHP)(app));
        // console.info('-------------'+JSON.stringify(this.inParam));
  			const  data  = yield this.getService('carStock').find(this.inParam);
  			this.success(data);
  		}

  	* create() {
  			const info = {
		        vin: this.getParam('vin'),
		        model_id: this.getParam('modelId'),
		        model_name: this.getParam('modelName'),
		    };
        
  			const result = yield this.getService('carStock').save(info);
		    this.success(result);
  		}
  	}
  	return CarStorController;
}