const path = require('path');
const mm = require('egg-mock');

describe('some test', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'app/'
    });
    return app.ready();
  })
  after(() => app.close());

});