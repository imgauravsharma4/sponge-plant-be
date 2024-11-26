const { KilnMaterial } = require('../KilnMaterial');

exports.findAll = async (query) => await KilnMaterial.find(query);
exports.findOne = async (query) => await KilnMaterial.findOne(query);
exports.create = async (body) => await KilnMaterial.create(body);

exports.update = async (query, body) => {
  try {
    return await KilnMaterial.findByIdAndUpdate(query, body);
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
