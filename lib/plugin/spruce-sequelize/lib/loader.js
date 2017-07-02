'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const MODELS = Symbol('loadedModels');
const chalk = require('chalk');
const debug = require('debug')('egg-spruce-sequelize');

Sequelize.prototype.log = function() {
  if (this.options.logging === false) { return; }
  const args = Array.prototype.slice.call(arguments);
  const sql = args[0].replace(/Executed \(.+?\):\s{0,1}/, '');
  this.options.logging.info('[model]', chalk.magenta(sql), `(${args[1]}ms)`);
};

module.exports = app => {
  const defaultConfig = {
    logging: app.logger,
    host: 'localhost',
    port: 3306,
    username: 'root',
    benchmark: true,
    define: {
      freezeTableName: false,
      underscored: true,
    },
    domain: {
      name: 'model',
      dir: 'app/model',
    },
  };

  const customConfig = Object.assign(defaultConfig, app.config.sequelize);

  app.Sequelize = Sequelize;

  // app.createSequelizeInstance
  Object.defineProperty(app, 'createSequelizeInstance', {
    value: function(config){
      const newConfig = Object.assign(customConfig, config);
      return createInstance(app, newConfig);
    },
    writable: false,
    configurable: false,
  });
  debug('load egg-spruce-sequelize plug and add method createSequelizeInstance to app');

  createInstance(app, customConfig);

  app.beforeStart(function* () {
    app.coreLogger.info('[egg-spruce-sequelize] starting...');
    yield app[customConfig.domain.name].authenticate();
    app.coreLogger.info('[egg-spruce-sequelize] start successfully and server status is ok');
  });
};

function createInstance(app, config){
  const domain = config.domain;
  const sequelize = new Sequelize(config.database, config.username, config.password, config);

  // app.sequelize
  Object.defineProperty(app, domain.name, {
    value: sequelize,
    writable: false,
    configurable: false,
  });
  debug(`spruce-sequelize define domain model ${domain}`);

  loadModel(app, domain);
}

function loadModel(app, domain) {
  const modelDir = path.join(app.baseDir, domain.dir || 'app/model');
  const model = domain.name;
  app.loader.loadToApp(modelDir, MODELS, {
    inject: app,
    // caseStyle: 'upper',
    ignore: 'index.js',
    initializer: function(exports, opt) {
      return exports(app, app[model]);
    }
  });

  for (const name of Object.keys(app[MODELS])) {
    const instance = app[MODELS][name];
    // only this Sequelize Model class
    if (!(instance instanceof app.Sequelize.Model)) {
      continue;
    }
    app[model][name] = instance;
  }

  for (const name of Object.keys(app[model])) {
    const instance = app[model][name];
    if ('associate' in instance) {
      instance.associate();
    }
  }
}
