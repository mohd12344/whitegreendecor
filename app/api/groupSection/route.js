import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import Section from "@/lib/models/section";
import Product from "@/lib/models/product";

export async function GET() {
  await connectDB();
  try {
    const AllSections = await Section.find({ isActive: true })
      .sort({
        order: 1,
      })
      .lean();

    const sectionWithCard = await Promise.all(
      AllSections.map(async (section) => {
        const card = await Product.findOne({
          sectionId: section._id,
          isActive: true,
          order: 1,
        }).lean();
        return { ...section, image: card.image, href: section.slug };
      }),
    );

    return NextResponse.json({ result: sectionWithCard });
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 404 });
  }
}
