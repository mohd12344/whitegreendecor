import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import Product from "@/lib/models/product";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("l") || 3;
  try {
    const trending = await Product.find({ isActive: true, order: 1 })
      .limit(limit)
      .lean();
    if (!trending || trending.length < 3) {
      const products = await Product.find({ isActive: true })
        .sort({ order: 1 })
        .limit(limit)
        .lean();
      return NextResponse.json({ success: true, res: products });
    }
    return NextResponse.json({ success: true, res: trending });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
