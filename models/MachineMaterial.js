const mongoose = require('mongoose');
const { defaultStatus } = require('../config/options');
const { Schema } = mongoose;
const MachineMaterialSchema = new Schema(
  {
    machine_id: {
      type: Schema.Types.ObjectId, // ObjectId to reference another collection
      ref: 'Machine', // Reference the Machine collection
      required: true, // Make it mandatory
    },
    material_id: {
      type: Schema.Types.ObjectId, // ObjectId to reference another collection
      ref: 'Material', // Reference the Material collection
      required: true, // Make it mandatory
    },
    quantity: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      required: false,
      default: defaultStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
  }
);

const MachineMaterial = mongoose.model(
  'MachineMaterial',
  MachineMaterialSchema,
  'MachineMaterial'
);

exports.MachineMaterial = MachineMaterial;
