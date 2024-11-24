const { Material } = require('../Material');

exports.findAll = async (query) => await Material.find(query);
exports.findOne = async (query) => await Material.findOne(query);
exports.create = async (body) => await Material.create(body);

exports.update = async (query, body) => {
  try {
    return await Material.findByIdAndUpdate(query, body);
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

exports.getAllMaterial = async () => {
  try {
    const query = {
      status: 'active',
    };
    return await this.findAll(query);
  } catch (error) {
    console.log('error', error);
  }
};
