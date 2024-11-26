const { Kiln } = require('../Kiln');

exports.findAll = async (query) => await Kiln.find(query);
exports.findOne = async (query) => await Kiln.findOne(query);
exports.create = async (body) => await Kiln.create(body);

exports.update = async (query, body) => {
  try {
    return await Kiln.findByIdAndUpdate(query, body);
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

exports.getAllKiln = async () => {
  try {
    const query = {
      status: 'active',
    };
    return await this.findAll(query);
  } catch (error) {
    console.log('error', error);
  }
};
