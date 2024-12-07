const { MachineMaterial } = require('../MachineMaterial');

exports.findAll = async (query) => await MachineMaterial.find(query);
exports.findOne = async (query) => await MachineMaterial.findOne(query);
exports.create = async (body) => await MachineMaterial.create(body);

exports.update = async (query, body) => {
  try {
    return await MachineMaterial.findByIdAndUpdate(query, body);
  } catch (error) {
    console.log('error', error);
  }
};
exports.createAndUpdate = async (body) => {
  try {
    if (body?.id) {
      return await this.update(body.id, body);
    } else {
      return await this.create(body);
    }
  } catch (error) {
    console.log('error', error);
  }
};

exports.getAllMachineMaterial = async () => {
  try {
    const query = {
      status: 'active',
    };
    return await this.findAll(query);
  } catch (error) {
    console.log('error', error);
  }
};
