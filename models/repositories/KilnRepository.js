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
    return await Kiln.find(query)
      .lean() // Convert to plain JS objects
      .populate({
        path: 'KilnMaterial', // Reference to the KilnMaterial model
        populate: {
          path: 'material_id', // Reference to the Material model
          // select: 'name', // Include specific fields
        },
      });
  } catch (error) {
    console.log('error', error);
  }
};
