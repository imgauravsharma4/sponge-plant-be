const mongoose = require('mongoose');
const { defaultStatus, working_status } = require('../config/options');
const { Schema } = mongoose;
const KilnSchema = new Schema(
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
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
  }
);

const Kiln = mongoose.model('Kiln', KilnSchema, 'Kiln');

exports.Kiln = Kiln;
