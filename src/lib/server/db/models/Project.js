import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 128,
    },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    category: { type: String, required: true, trim: true, maxlength: 64 },
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    details: { type: String, required: true, trim: true, maxlength: 8000 },
  },
  { timestamps: true },
);

projectSchema.index({ category: 1 });

export const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
