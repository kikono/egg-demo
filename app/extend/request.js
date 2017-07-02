module.exports = {
  get token() {
  	let token = (this.body['token']) ? this.body['token'] : this.query.token;
    return token;
  },
};