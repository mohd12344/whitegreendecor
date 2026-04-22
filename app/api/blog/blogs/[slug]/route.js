import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import Blog from "@/lib/models/blog";

export async function GET(_, { params }) {
  const { slug } = await params;
  await connectDB();
  try {
    const blog = await Blog.findOne({ slug }).lean();

    if (!blog)
      return NextResponse.json(
        { success: false, error: "not found" },
        { status: 404 },
      );
    return NextResponse.json({ result: blog });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
