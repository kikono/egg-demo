'use strict';

module.exports = {
  get model() {
    const model = this.app.config.domain.name;
    return this.app[model];
  },
};
