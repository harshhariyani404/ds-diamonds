const mongoose = require('mongoose');

const diamondSchema = new mongoose.Schema({
  shape: {
    type: String,
    required: [true, 'Shape is required'],
    enum: ['ROUND', 'PRINCESS', 'CUSHION', 'EMERALD', 'OVAL', 'PEAR', 'MARQUISE', 'RADIANT', 'HEART', 'ASSCHER'],
    uppercase: true,
  },
  carat: {
    type: Number,
    required: [true, 'Carat is required'],
    min: [0.01, 'Carat must be at least 0.01'],
    max: [50, 'Carat cannot exceed 50'],
  },
  clarity: {
    type: String,
    required: [true, 'Clarity is required'],
    enum: ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'I2', 'I3'],
    uppercase: true,
  },
  color: {
    type: String,
    required: [true, 'Color is required'],
    enum: ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    uppercase: true,
  },
  cut: {
    type: String,
    required: [true, 'Cut is required'],
    enum: ['EXCELLENT', 'VERY GOOD', 'GOOD', 'FAIR', 'POOR'],
    uppercase: true,
  },
  polish: {
    type: String,
    required: [true, 'Polish is required'],
    enum: ['EXCELLENT', 'VERY GOOD', 'GOOD', 'FAIR', 'POOR'],
    uppercase: true,
  },
  symmetry: {
    type: String,
    required: [true, 'Symmetry is required'],
    enum: ['EXCELLENT', 'VERY GOOD', 'GOOD', 'FAIR', 'POOR'],
    uppercase: true,
  },
  fluorescence: {
    type: String,
    required: [true, 'Fluorescence is required'],
    enum: ['NONE', 'FAINT', 'MEDIUM', 'STRONG', 'VERY STRONG'],
    uppercase: true,
  },
  certificate: {
    type: String,
    required: [true, 'Certificate is required'],
    enum: ['GIA', 'IGI', 'HRD', 'AGS', 'EGL', 'OTHER'],
    uppercase: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    uppercase: true,
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
diamondSchema.index({ shape: 1 });
diamondSchema.index({ clarity: 1 });
diamondSchema.index({ color: 1 });
diamondSchema.index({ price: 1 });
diamondSchema.index({ location: 1 });
diamondSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Diamond', diamondSchema);

