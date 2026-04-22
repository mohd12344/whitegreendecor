import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import Blog from "@/lib/models/blog";
import { generateSlug } from "@/components/services/generateSlug";

export async function PUT(req, { params }) {
  const { id } = await params;
  await connectDB();
  const body = await req.json();
  console.log("maje krrr");

  try {
    const already = await Blog.findById(id);
    if (!already)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    const slug = body.slug?.trim() || generateSlug(body.title || already.title);

    if (slug !== already.slug) {
      const exists = await Blog.findOne({ slug, _id: { $ne: id } });
      if (exists)
        return NextResponse.json(
          { error: "Slug already exists or title already existed" },
          { status: 400 },
        );
    }

    const res = await Blog.findByIdAndUpdate(
      id,
      { ...body, slug },
      { new: true },
    );

    return NextResponse.json({ result: res });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

export async function DELETE(_, { params }) {
  const { id } = await params;
  await connectDB();
  try {
    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ result: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
