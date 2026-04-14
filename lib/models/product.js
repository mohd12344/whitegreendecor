import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section" },
    title: String,
    price: { type: Number, required: true },
    type: String,
    image: String,
    description: String,
    inclusion: String,
    isActive: { type: Boolean, default: false },
    slug: { type: String, unique: true },
    order: Number,
  },
  { timestamps: true },
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
