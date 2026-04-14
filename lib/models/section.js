import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    isActive: { type: Boolean, default: false },
    slug: { type: String, unique: true },
  },
  { timestamps: true },
);

export default mongoose.models.Section ||
  mongoose.model("Section", SectionSchema);
