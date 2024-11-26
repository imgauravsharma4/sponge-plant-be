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
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        // Ensure KilnMaterial is always an array
        ret.KilnMaterial = Array.isArray(ret.KilnMaterial) ? ret.KilnMaterial : (ret.KilnMaterial ? [ret.KilnMaterial] : []);
        return ret;
      },
    },
    toObject: { getters: true, virtuals: true },
  }
);
// Virtual for KilnMaterial
KilnSchema.virtual('KilnMaterial', {
  ref: 'KilnMaterial', // Name of the model to join
  localField: '_id', // Field in the Kiln model
  foreignField: 'kiln_id', // Field in the KilnMaterial model
});
const Kiln = mongoose.model('Kiln', KilnSchema, 'Kiln');

exports.Kiln = Kiln;
