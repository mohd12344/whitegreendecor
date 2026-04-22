import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    excerpt: String,
    category: { type: String, required: true },
    date: { type: String, required: true },
    readTime: String,
    image: String,
    content: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    slug: { type: String, unique: true },
  },
  { timestamps: true },
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
