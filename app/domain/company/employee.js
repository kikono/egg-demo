module.exports = (app, model) => {
  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;
  return model.define('test_employee', {
    // id: {
    //   type: INTEGER,
    //   allowNull: false,
    //   autoIncrement: true
    // },
    name: STRING(45),
    tel: STRING(45),
    email: STRING(45),
    title: STRING(45),
    org_id: INTEGER(8),
    sex: BOOLEAN,
    birthday: DATE,
    group_id: INTEGER(3),
    hiredate: DATE,
    degree: INTEGER(3),
    buse: {
      type: INTEGER(3),
      defaultValue: 1,
    }
  },{
    // defaultScope: {
    //   where: {
    //     buse : 1
    //   }
    // },
    scopes: {
      deleted: {
        where: {
          buse : 1
        }
      },
    }
  });
};
