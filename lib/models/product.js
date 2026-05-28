import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section" },
    title: String,
    price: { type: Number, required: true },
    type: String,
    image: String, 
    images: [String],
    description: String,
    inclusion: String,
    exclusion: String,
    reviews: { type: Number, default: 128 },
    isActive: { type: Boolean, default: false },
    slug: { type: String, unique: true },
    order: Number,
  },
  { timestamps: true },
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
