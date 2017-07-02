module.exports = (app, model) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  return model.define('company', {
    // id: INTEGER,
    dbserver: STRING(100),
    dbport: INTEGER(100),        
    dbname: STRING(100),
    dbuser: INTEGER(100),
    dbpwd: INTEGER(100),
  });
};
