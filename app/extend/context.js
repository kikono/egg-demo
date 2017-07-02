// context 扩展
const Const = require('../common/const');
// var Model = require('../domain/helper').Model;
module.exports = {

  get isIOS() {
    const iosReg = /iphone|ipad|ipod/i;
    return iosReg.test(this.get('user-agent'));
  },

  get isAndroid() {
    const androidReg = /Android|android/;
    return androidReg.test(this.get('user-agent'));
  },

  get isPC() {
    return !(this.isIOS || this.isAndroid);
  },

  get acceptJSON() {
    // if (this.get('x-request-with') === 'XMLHttpRequest') return 'json';
    // return 'html';
    return 'json'
  },

  set me(user) {
    this.currentUser = user;
  },
  get me() {
    return this.currentUser;
  },

  get meTopId() {
    let shop_obj = this.currentUser.shop_obj;
    let id;
    if (shop_obj) {
      id = shop_obj.id;
    } else {
      id = Const.orgGroup;
    }
    return id;
  },
  get company() {
    if (this.currentUser) {
      return this.currentUser.comp_id;
    }
    return null;
  },

  set dbConfig(config) {
    this.dataBaseConfig = config;
  },
  get dbConfig() {
    return this.dataBaseConfig;
  },
  /**
   * 根据name获取mongo model
   */
  getMongoModel(name) {
    let model = this.app.mongoose.models[name];
    if (model) {
      //这是当前 schema的company
      console.info('company_id:' + this.company);
      let field = {
        company_id: this.company,
        // model : model,
        user_id: this.me.employee_id,
        schemaName: name,
      }
      model.schema.field = field;
    }
      return model;    
  },
  /**
   * 根据name获取world库的model
   */
  getWorldModel(name) {
    const domain = this.getConfig('sequelize').domain;
    return this.app[domain.name][name];
  },
  /**
   * 根据name获取company库的model
   */
  getCompanyModel(name) {
    let domainName = this.getConfig('companyDomain');
    // const config = {
    //   host: '192.168.0.240',
    //   port: '3306',
    //   user: 'root',
    //   password: '123456',
    //   database: 'branch_company',
    //   domain: {
    //     name: domainName,
    //     dir: 'app/domain/company',
    //   },
    // };
        // 设置默认值
    domainName = (!domainName)? 'company':domainName; 
    const companyModel = domainName+"_"+this.company;
    if(!this.app[companyModel]){
      let config = this.dbConfig;
      config.domain = {
          name: companyModel,
          dir: 'app/domain/'+domainName,      
      }
      this.app.createSequelizeInstance(config);
      this.app.coreLogger.info(`[egg-spruce-sequelize] create new domain [${companyModel}] models successfully`);
    }
    return this.app[companyModel][name];
  },

  /**
   * 获取model
   * 根据 name 获取 mongo和mysql model
   * model定义不允许重名，获取顺序mongo、company、world
   */
  getModel(name) {
    // 先从mongo中查找model
    let model = this.getMongoModel(name);
    if (!model) {
      model = this.getCompanyModel(name);
    }
    if (!model) {
      model = this.getWorldModel(name);
    }     
    return model;
  },

  /**
   * 获取 service
   * 根据 name 获取 mongo model
   */
  getConfig(name) {
    // console.info('ctx :'+name);
    return this.app.config[name];
  },

};