import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import Section from "@/lib/models/section";
import Product from "@/lib/models/product";

export async function GET(_, { params }) {
  await connectDB();
  const { type, filter } = await params;
  try {
    const section = await Section.findOne({ slug: type }).lean();
    const products = await Product.find({
      isActive: true,
      sectionId: section._id,
      price: { $lte: filter },
    })
      .sort({ order: 1 })
      .lean();
    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
