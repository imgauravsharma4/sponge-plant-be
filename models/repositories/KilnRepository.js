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
        },
      });
  } catch (error) {
    console.log('error', error);
  }
};

exports.getAllKilnAndMaterialData = async () => {
  try {
    const data = await this.getAllKiln();
    return calculateTotalProduction(data);
  } catch (error) {
    console.log('error', error);
  }
};

const calculateTotalProduction = (data) => {
  return data && data.length > 0 && data.map((kiln) => {
    // Check if KilnMaterial array exists and is not empty
    if (kiln.KilnMaterial && kiln.KilnMaterial.length > 0) {
      // Sum the yield of all materials in KilnMaterial
      const totalYield = kiln.KilnMaterial.reduce((sum, item) => {
        return sum + (item.material_id?.yeild || 0);
      }, 0);

      // Calculate totalProduction as total yield divided by KilnMaterial length
      kiln.totalProduction = totalYield / kiln.KilnMaterial.length;
    } else {
      // If no materials, totalProduction is 0
      kiln.totalProduction = 0;
    }
    return kiln;
  });
};
