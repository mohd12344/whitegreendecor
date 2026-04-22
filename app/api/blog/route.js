import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import connectDB from "@/lib/db/connectDB";
import Blog from "@/lib/models/blog";
import { generateSlug } from "@/components/services/generateSlug";

export async function GET() {
  await connectDB();
  const blogs = await Blog.find({});
  return NextResponse.json({ result: blogs });
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  if (!body)
    return NextResponse.json(
      { success: false, message: "Bad request" },
      { status: 400 },
    );

  try {
    const slug = body.slug || generateSlug(body.title) + "-" + nanoid(5);

    const blog = await Blog.create({ ...body, slug });

    return NextResponse.json({ result: blog });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
