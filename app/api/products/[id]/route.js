import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import Product from "@/lib/models/product";
import Section from "@/lib/models/section";
import { generateSlug } from "@/components/services/generateSlug";

export async function PATCH(req, { params }) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  if (
    Number(body.price) <= 0 ||
    !body.title?.trim() ||
    body.title.trim() === "New Item"
  )
    return NextResponse.json(
      { error: "Please fill required field" },
      { status: 400 },
    );

  if (typeof body.title === "string") {
    const alreadyExists = await Product.findOne({
      $or: [{ title: body.title }, { slug: generateSlug(body.title) }],
      _id: { $ne: id },
    });
    if (alreadyExists) {
      return NextResponse.json(
        { error: "Title already exists" },
        { status: 400 },
      );
    }
  }

  const card = await Product.findById(id);
  const section = await Section.findById(card.sectionId);

  const updateData = {
    ...body,
    isActive: section.isActive === false ? false : true,
    ...(typeof body.title === "string" && { slug: generateSlug(body.title) }),
  };

  const item = await Product.findByIdAndUpdate(id, updateData, { new: true });

  return NextResponse.json({ success: true, data: item });
}

export async function DELETE(_, { params }) {
  await connectDB();
  const { id } = await params;
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
