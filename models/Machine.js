const mongoose = require('mongoose');
const { defaultStatus, working_status } = require('../config/options');
const { Schema } = mongoose;
const MachineSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      default: null,
      trim: true,
    },
    capacity: {
      type: Number,
      required: false,
    },
    working_status: {
      type: String,
      required: false,
      default: working_status.NOT_STARTED
    },
    status: {
      type: String,
      required: false,
      default: defaultStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        // Ensure KilnMaterial is always an array
        ret.MachineMaterial = Array.isArray(ret.MachineMaterial) ? ret.MachineMaterial : (ret.MachineMaterial ? [ret.MachineMaterial] : []);
        return ret;
      },
    },
    toObject: { getters: true, virtuals: true },
  }
);
// Virtual for KilnMaterial
MachineSchema.virtual('MachineMaterial', {
  ref: 'MachineMaterial', // Name of the model to join
  localField: '_id', // Field in the Kiln model
  foreignField: 'machine_id', // Field in the KilnMaterial model
});
const Machine = mongoose.model('Machine', MachineSchema, 'Machine');

exports.Machine = Machine;
