module.exports = (app, model) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  return model.define('login', {
    // id: INTEGER,
    loginname: STRING(45),
    password: STRING(32),
    compid: INTEGER(8),
  });
};
