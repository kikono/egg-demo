var Schema = require('../base_mongo');

module.exports = mongoose => {
  const messageSchema = new Schema({
    content: { type: String  },
    sender_name: { type: String},
  });
  // 可以单独定义方法
  messageSchema.statics.findById = function(option, cb){
    console.info('call findById ---------------------');
    return 'findById';
  }
  return mongoose.model('message', messageSchema);
};
