const Model = require('./modelFactory');

module.exports = class UserModel extends Model {
  constructor() {
    super('authme');
  }

  createOne(item) {
    item.regdate = Date.now();
    return super.createOne(item);
  }
};
