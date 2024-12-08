const { defaultStatus } = require('../../config/options');
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
        path: 'MachineMaterial',
        match: { status: defaultStatus.ACTIVE }, // Reference to the KilnMaterial model
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
  return (
    data &&
    data.length > 0 &&
    data.map((Machine) => {
      // Check if MachineMaterial array exists and is not empty
      if (Machine.MachineMaterial && Machine.MachineMaterial.length > 0) {
        // Calculate average yield
        const totalWeightedYield = Machine.MachineMaterial.reduce(
          (sum, item) => {
            const yieldValue = item?.material_id?.yeild || 0;
            const quantity = item?.quantity || 0;
            return sum + yieldValue * (quantity / 100);
          },
          0
        );

        const averageYield =
          totalWeightedYield / Machine.MachineMaterial.length;
        // Use feed_rate for the machine (default to 0 if not provided)
        const feedRate = Machine.feed_rate || 0;
        // Calculate totalProduction
        Machine.averageYield = averageYield;
        Machine.totalProduction = averageYield * feedRate;
      } else {
        // If no materials, totalProduction is 0
        Machine.averageYield = 0;
        Machine.totalProduction = 0;
      }
      return Machine;
    })
  );
};
