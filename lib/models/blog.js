import mongoose from "mongoose";

const BlockSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ["paragraph", "heading", "link_paragraph"], 
    required: true 
  },
  text: String,        // for paragraph + heading
  level: { type: Number, default: 2 }, // for heading: 2 = h2, 3 = h3
  // for link_paragraph: array of segments
  segments: [{
    text: String,
    isLink: { type: Boolean, default: false },
    href: String,      // only if isLink
  }]
}, { _id: false });

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    excerpt: String,
    category: { type: String, required: true },
    date: { type: String, required: true },
    readTime: String,
    image: String,
    content: { type: String }, // keep for backward compat
    blocks: [BlockSchema],     // ← new structured content
    isActive: { type: Boolean, default: false },
    slug: { type: String, unique: true },
  },
  { timestamps: true },
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);