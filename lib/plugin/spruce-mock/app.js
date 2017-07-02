'use strict';

const path = require('path');
const assert = require('assert');

module.exports = app => {
  const config = app.config.spruceMock;
  assert(config.dir, '[spruce-mock] url is required on config');

  app.beforeStart(function* () {
    app.coreLogger.info('[spruce-mock] starting...');
    let mockDir = config.dir;
    mockDir = (!mockDir)? 'app/mock':mockDir;
    mockDir = path.join(app.config.baseDir, mockDir);
    app.loader.loadToApp(mockDir, 'mock', {
      inject: app.mock,
    });
    app.coreLogger.info('[spruce-mock] dir is ',mockDir);
    app.coreLogger.info('[spruce-mock] start successfully and server status is ok');
  });
};