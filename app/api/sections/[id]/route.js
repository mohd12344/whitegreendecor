import connectDB from "@/lib/db/connectDB";
import { NextResponse } from "next/server";
import Section from "@/lib/models/section";
import Product from "@/lib/models/product";
import { generateSlug } from "@/components/services/generateSlug";

export async function PATCH(req, { params }) {
  await connectDB();
  const body = await req.json();
  const { id } = await params;

  if (typeof body.title === "string") {
    const alreadyExists = await Section.findOne({
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

  const updateData = {
    ...body,
    ...(typeof body.title === "string" && { slug: generateSlug(body.title) }),
  };

  const section = await Section.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (typeof body.isActive === "boolean") {
    await Product.updateMany(
      { sectionId: id, price: { $ne: 0 } },
      { isActive: body.isActive },
    );
  }
  return NextResponse.json(section);
}

export async function DELETE(_, { params }) {
  await connectDB();
  const { id } = await params;
  await Product.deleteMany({ sectionId: id });
  await Section.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
