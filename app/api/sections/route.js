import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import Section from "@/lib/models/section";
import { generateSlug } from "@/components/services/generateSlug";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const onlyActive = searchParams.get("onlyActive");
  const filter = onlyActive === "true" ? { isActive: true } : {};
  const sections = await Section.find(filter).sort({ order: 1 });
  return NextResponse.json(sections);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const count = await Section.countDocuments();
  const slug = generateSlug(body.title) + "-" + Date.now();
  const section = await Section.create({
    title: body.title,
    slug: slug,
    order: count + 1,
  });
  return NextResponse.json(section);
}
