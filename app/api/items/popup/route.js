import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import Product from "@/lib/models/product";

export async function GET() {
  await connectDB();
  try {
    const data = await Product.find({ isActive: true })
      .limit(12)
      .sort({ order: 1 })
      .lean();
    if (!data)
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 },
      );

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
