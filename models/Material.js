const mongoose = require('mongoose');
const { defaultStatus } = require('../config/options');
const { Schema } = mongoose;
const MaterialSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      default: null,
      trim: true,
    },
    fet: {
      type: Number,
      required: false,
    },
    yeild: {
      type: Number,
      required: false,
    },
    target_fem: {
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

const Material = mongoose.model('Material', MaterialSchema, 'Material');

exports.Material = Material;
