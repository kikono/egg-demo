const Paginate = require('./app/common/paginate');
const Const = require('./app/common/const');
const Util = require('./app/common/util');
const parse  = require('co-body');
const path = require('path');
const mockDir = path.join(__dirname, './mock');
const assert = require('assert');
module.exports = app => {

  const modelPath = app.config.baseDir+'/app/domain/model';
  app.logger.info('[app] loadToContext model path is :'+modelPath);

  // // 配置自己的model 通过new (this.app.my_model[name])可以获取对象
  // app.loader.loadToApp(modelPaths, 'my_model',{
  //     inject: this.ctx,
  //     call: true,
  // });

  // 通过context形式加载，通过this.ctx.domain.name 获取
  app.loader.loadToContext(modelPath, 'domain',{
      call: true,
  });

  app.beforeStart(function* () {
    // 应用会等待这个函数执行完成才启动
    let name = app.config['cacheRedis'];
    let cacheRedis = name ? app.redis.get(name) : app.redis;
    app.cache = cacheRedis; 
    // // 缓存公司信息
    let host = app.config['auth'].host;
    app.logger.info('[app] start auth , host is :'+host);

    // app.companyCacheName 用于区分不同主机访问的服务，防止错乱
    // 因为company信息是放入redis中，所以不同主机需要定义不同的名称
    app.companyCacheName = 'company_'+host;
    yield Util.cacheCompany(app);



    // app.loader.loadToApp(mockDir, 'mock', {
    //   inject: app.mock,
    // });
  });

  // app.use(function*(next){
  //   console.log('url:'+this.origin+this.originalUrl);
  //   console.log('type:'+this.request.type);
  //   if(this.is('json')){
  //     console.info('parese json');
  //   console.log('request-----------:'+JSON.stringify(this.request));
  //     // var body = yield parse(this, { limit: '10kb' });
  //     // this.request.body = JSON.stringify(this.request.body);
  //   }
  //   yield next;;
  // });
  // 将 static 中间件放到 bodyParser 之前

  // const index = app.config.appMiddleware.indexOf('auth');
  // console.info(JSON.stringify(app.config.appMiddleware));
  // assert(index >= 0, 'auth 中间件必须存在');
  // app.config.appMiddleware.splice(index+1, 0, 'access');


  /**
   * 对controller 进行扩展 ，便于操作
   */
  class BaseController extends app.Controller {

    constructor(ctx){
      super(ctx);
      this.inputParam = {} ;
      if(this.paginate){
        this.inParam.paginate = this.paginate;
      }
      // console.info('paginate:'+JSON.stringify(this.inParam));

    }

    set inParam(inputParam){
      let k , name;
      for(k in inputParam){
        name = inputParam[k];
        let value = this.getParam(name);
         // console.info(name+':'+value);
        this.inputParam[k] = value;
      }
        // console.info('indic:'+JSON.stringify(this.inputParam));
    }


    get inParam(){
      return (!this.inputParam)? {} :this.inputParam ;
    }


    get model() {
      return this.ctx.model;
    } 

    /**
    * 获取 request 参数
    **/
    getParam(name){
      let value = this.ctx.request.body[name];
      if(!value||(value===undefined)){
        value = null;
      }
      return value;
    }


    getService(name){
      return this.ctx.service[name];
    }

    get param(){

    }
    get paginate(){
      if(this.getParam('page')){
        let paginate = new Paginate();
        paginate.page = parseInt(this.getParam('page'));
        paginate.size = parseInt(this.getParam('size'));
        return paginate;
      }
    }

    /**
    *  response 响应 
    */
    success(result) {
      this.ctx.body = {
        status : Const.status.success,
        data : result 
      };
    }
    error(result) {
      this.ctx.body = {
        status : Const.status.error,
        data : result 
      };
    }
    notFound(msg) {
      msg = msg + ' not found!';
      this.ctx.status = 404;
      this.ctx.body = {
        status : Const.status.error,
        data : msg 
      };
    }
  }
  /**
  *  对Service 进行扩展
  */
  class BaseService extends app.Service{
    /**
     * 定义Service的logger的属性，相当于 this.ctx.logger
     */
    get logger () {
      return this.ctx.logger;
    }

    /**
     * 获取model
     * 根据 name 获取 mongo model
     */ 
    getModel(name){
      return this.ctx.getModel(name);
    }

  }

  app.Service     = BaseService;
  app.Controller  = BaseController;
}


