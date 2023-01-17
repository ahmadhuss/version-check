import mongoose from 'mongoose';

const VersionSchema = new mongoose.Schema(
  {
    version: { type: String, required: true },
    type: { type: String, enum: ['ANDROID'], required: true },
    releaseDate: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Create a model instance
const AppVersionSchema = mongoose.model('version', VersionSchema);
export default AppVersionSchema;
