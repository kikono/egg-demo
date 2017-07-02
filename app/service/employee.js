var sequelize = require('sequelize');

module.exports = app => {
  class EmployeeService extends app.Service {

    // 分页查询
    *find(param) {
      // where 查询条件
      let where = {
        buse: 1,
      };
      if (param.name) {
        where.name = {
          $like: '%' + param.name + '%',
        };
      }
      where.id = {
        $gt: 1, // id  > 1
        $lt: 100000, // id < 100000
      }
      let employee = this.getModel('employee');
      let option = {
        attributes: ['id', 'name', 'email', ['tel', 'phone'/*别名*/], 'org_id'],
        where: where,
        limit: param.paginate.size, // 返回数据量
        offset: param.paginate.index, // 数据偏移量    
        order : 'id desc',    
      }
      // 分页查询
      const data = yield employee.findAndCountAll(option).then(result => {
        return result;
      });

      return { count : data.count, list: data.rows };
    }


    *findById(id) {  
      // where 查询条件
      let where = {
        // buse: 1,
      };
      if(id) {
        where.id = id;
      }
      let option = {
        // 查询列名
        attributes: ['id', 'name', 'tel'],
        // where: where  
      }
      let model = this.getModel('employee');
      const data = yield model.findById(id,option);
      return { list: data };
    }   
    
     
    * count() {
      let where = {
        buse: 1,
      };
      let option = {
        // SELECT COUNT(id) AS idCount ...
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'idCount']],
        where: where,
      };
      let model = this.getModel('employee');
      const data = yield model.findAll(option);
      return data;
    }


    // 查询默认结果集
    *scope(param) {
      // where 查询条件
      let where = {
      };
      if (param.name) {
        where.name = {
          $like: '%' + param.name + '%',
        };
      }
      where.id = {
        $gt: 1, // id  > 1
        $lt: 100000, // id < 100000
      }
      let option = {
        // 
        attributes: ['id', 'name', 'email', ['tel', 'phone'/*别名*/], 'org_id'],
        where: where,
        limit: param.paginate.size, // 返回数据量
        offset: param.paginate.index, // 数据偏移量    
        order : 'id desc',    
      }
      let model = this.getModel('employee');
      // 使用scope() 查询默认数据
      const data = yield model.scope('deleted').findAll(option);

      return { list: data };
    }  


    // 新增数据
    *create(param) {
      let fields = {
        fields : ['name', 'tel', 'buse']//定义保存的字段
      }
      let model = this.getModel('employee');
      const data = yield model.create(param, fields).then(function(result){
        console.info(result.name);
        return result;
      });

      return { list: data };
    }  


  // 批量新增数据
    *bulkCreate(param) {
      let fields = {
        fields : ['name', 'tel', 'buse']//定义保存的字段
      }
      let records = [];
      for(let i=0; i<10; i++){
        let employee ={
          name  : param.name + i,
          tel   : param.tel
        }
        records.push(employee)
      }
      let model = this.getModel('employee');
      const data = yield model.bulkCreate(records, fields).then(function(result){
        console.info(result.name);
        return result;
      });

      return { list: data };
    }


    *update(param) {
      let option = {};
      //定义保存的字段
      option.fields =  ['name','tel'];
      option.where = {// 查询条件
        id : param.id,
      }
      let model = this.getModel('employee');
      const data = yield model.update(param, option).then(function(count){
        console.info(count);
        return count;
      });

      return { list: data };
    }    
  }
  return EmployeeService;
};