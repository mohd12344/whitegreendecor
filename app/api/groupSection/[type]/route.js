import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import Section from "@/lib/models/section";
import Product from "@/lib/models/product";

export async function GET(_, { params }) {
  await connectDB();
  const { type } = await params;

  try {
    const section = await Section.findOne({ slug: type });
    const products = await Product.find({
      sectionId: section._id,
      isActive: true,
    })
      .sort({ order: 1 })
      .lean();

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
