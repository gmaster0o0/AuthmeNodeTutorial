const Model = require('./modelFactory');

module.exports = class UserModel extends Model {
  constructor() {
    super('authme');
  }

  createOne(item) {
    item.regdate = Date.now();
    return super.createOne(item);
  }
<<<<<<< HEAD

  deleteOne(item) {
    return super.deleteOne(item);
  }
=======
>>>>>>> 77da9414b3f2ae621856ad02408ab7be9a487fc9
};
