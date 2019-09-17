const modelFactory = require('./modelFactory');

const Model = modelFactory.createModel('authme');

exports.createOne = item => {
  item.regdate = Date.now();
  return Model.createOne(item);
};

exports.getAll = Model.getAll;
exports.getOne = Model.getOne;
exports.updateOne = Model.updateOne;
exports.deleteOne = Model.deleteOne;
