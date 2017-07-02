/**
 * Created by admin on 2017/5/9.
 */
var Schema = require('mongoose').Schema;
var Util = require('../common/util');
var Const = require('../common/const');
/**
 * 自定义schema 避免直接修改mongoose.Schema
 */
class BaseSchema extends Schema{
    constructor(obj, options) {
        // 操作信息
        if(!obj.company_id ){
            obj.company_id = { type: Number, index: true};
        }
        //是否可用
        if(!obj.buse ){
            obj.buse = { type: Number, index: true};
        }
         // 创建时间
        obj.create_date = { type: String};
        // 创建人
        obj.create_user = { type: Number};
        // 更新时间
        obj.update_date = { type: String};
        // 更新人       
        obj.update_user = { type: Number};

        if(!options)options={};
        // options.timestamps = { 
        //     createdAt: 'create_date',
        //     updatedAt: 'update_date'
        // };
        options.versionKey = false;
        options.skipVersioning = { dontVersionMe: true };
        super(obj, options);
        this.field = {
            company_id : null,
            // model : null,
            user_id : null,
            schemaName : null,
        };

    }
}

/**
 * 创建扩展的Schema
 * @param obj
 * @param options
 * @returns {BaseSchema}
 */
function initSchema(obj, options){

    var schema = new BaseSchema(obj,  options);
    //定义中间件
    schema.pre('count', MongooseMiddleware.setCompany);
    schema.pre('find', MongooseMiddleware.setCompany);
    schema.pre('findOne', MongooseMiddleware.setCompany);
    schema.pre('update', MongooseMiddleware.update);
    schema.pre('insertMany', function (next){
        // var err = new Error('暂不支持此方法!');
        // throw err;
        next();
    });
    schema.pre('save', MongooseMiddleware.save);


    // schema.virtual('id').get(function () {
    //   return this.sender_name;
    // });

    //操作成功后的处理
    schema.post('save', function(result, next){
        // console.log('[save : %s] [%s]',schema.field.schemaName,result);
        next();
    });
    schema.post('update',function(result, next){
        // console.log('[update : %s] [%s]',schema.field.schemaName,result);
        next();
    });
    schema.post('insertMany',function(result, next){
        if(result){
            if(result[0]&&!result[0].company_id){
                var err = new Error('暂不支持insertMany方法!');
                // throw err;    
                next(err);
            }
        }
        next();
    });


    //扩展方法
    schema.statics.findById = function(id, cb){
        return this.find().where({_id:id});
    }
    //逻辑删除方法
    schema.statics.delete = function(id, cb){
        return this.update({_id:id},{buse:Const.buse.no},cb);
    }

    //批量添加
    schema.statics.createMany = function(doc, cb){
        var docs = [];
        doc.forEach(function(d){
            d.company_id = schema.field.company_id;
            d.buse = Const.buse.yes;
            d.create_date =  Util.now();
            d.update_date =  Util.now();
            d.create_user = schema.field.user_id;
            d.update_user = schema.field.user_id;
            docs.push(d);
        });
        return this.insertMany(doc,cb);
    }

    return schema;
}
/**
 * 定义mongoose 中间件
 * @type {{setCompany: MongooseMiddleware.setCompany}}
 */
var MongooseMiddleware ={
    // 设置company
    setCompany : function (next){
        if(!this._conditions){
                this._conditions = {};
        }
        if(!this._conditions.company_id){
                this._conditions.company_id = this.schema.field.company_id;
        }
        if(!this._conditions.buse){
                this._conditions.buse = Const.buse.yes;
        }
        // console.log('call find '+ JSON.stringify(this._conditions)); // true
        next();
    },
    // 设置company
    insertMany : function (next){
        var err = new Error('暂不支持此方法!');
        // throw err;
        // console.info(this.model;
        next();
    },    
    // 更新时的过滤设置
    update : function (next){
        if(!this._conditions){
            this._conditions = {};
        }
        if(!this._conditions.company_id){
            this._conditions.company_id = this.schema.field.company_id;
        }
        if(this._update){//记录操作用户信息
            this._update["$set"].update_date =  Util.now(),
            this._update["$set"].create_user = this.schema.field.user_id;
            this._update["$set"].update_user = this.schema.field.user_id; 
        }
        this.options.new = true;
        // console.info(this.options);
        // console.info('call update '+JSON.stringify(this._update)+ ' where :'+JSON.stringify(this._conditions));
        // // console.log(this._conditions  ); // true
        next();
    },
    // 新增时的过滤设置
    save : function (next){
        //记录操作信息
        this.buse = Const.buse.yes;
        this.update_user = this.schema.field.user_id; 
        this.create_user = this.schema.field.user_id;
        this.update_date =  Util.now();
        this.create_date =  Util.now();
        this.company_id = this.schema.field.company_id;
        // console.log('call save '+this  ); // true
        next();
    },

}


module.exports = initSchema;