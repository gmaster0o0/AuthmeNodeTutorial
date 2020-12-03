const Model = require('./modelFactory');

module.exports = class UserModel extends Model {
  constructor() {
    super('authme');
  }

  createOne(item) {
    item.regdate = Date.now();
    return super.createOne(item);
  }

  deleteOne(item) {
    return super.deleteOne(item);
  }
  updateOne(item, newValues) {
    return super.updateOne(item, newValues);
  }
};
