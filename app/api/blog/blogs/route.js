import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import Blog from "@/lib/models/blog";

export async function GET() {
  await connectDB();
  try {
    const blogs = await Blog.find({ isActive: true });
    return NextResponse.json({ result: blogs });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
