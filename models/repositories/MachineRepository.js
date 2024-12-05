const { Machine } = require('../Machine');

exports.findAll = async (query) => await Machine.find(query);
exports.findOne = async (query) => await Machine.findOne(query);
exports.create = async (body) => await Machine.create(body);

exports.update = async (query, body) => {
  try {
    return await Machine.findByIdAndUpdate(query, body);
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

exports.getAllMachine = async () => {
  try {
    const query = {
      status: 'active',
    };
    return await Machine.find(query)
      .lean() // Convert to plain JS objects
      .populate({
        path: 'MachineMaterial', // Reference to the KilnMaterial model
        populate: {
          path: 'material_id', // Reference to the Material model
        },
      });
  } catch (error) {
    console.log('error', error);
  }
};

exports.getAllMachineAndMaterialData = async () => {
  try {
    const data = await this.getAllMachine();
    return calculateTotalProduction(data);
  } catch (error) {
    console.log('error', error);
  }
};

const calculateTotalProduction = (data) => {
  return data && data.length > 0 && data.map((Machine) => {
    // Check if KilnMaterial array exists and is not empty
    if (Machine.MachineMaterial && Machine.MachineMaterial.length > 0) {
      // Sum the yield of all materials in KilnMaterial
      const totalYield = Machine.MachineMaterial.reduce((sum, item) => {
        return sum + (item?.material_id?.yeild || 0);
      }, 0);

      const totalFeedrate = Machine.MachineMaterial.reduce((sum, item) => {
        return sum + (item?.quantity || 0);
      }, 0);

      const averageYield = totalYield / Machine.MachineMaterial.length
      const averageFeedrate = totalFeedrate / Machine.MachineMaterial.length

      // Calculate totalProduction as total yield divided by KilnMaterial length
      Machine.totalProduction = Number(averageYield) * Number(averageFeedrate) ;
    } else {
      // If no materials, totalProduction is 0
      Machine.totalProduction = 0;
    }
    return Machine;
  });
};
