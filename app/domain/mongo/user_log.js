/**
 * Created by admin on 2017/5/11.
 */
var Schema = require('../base_mongo');

module.exports = mongoose => {
    const userLogSchema = new Schema({
        user_id : { type: String},
        ip : {type : String},
        url : {type: String},
        content : { type: String},
    });

    return mongoose.model('user_log', userLogSchema);
};




