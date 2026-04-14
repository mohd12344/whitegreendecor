import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import Product from "@/lib/models/product";
import Section from "@/lib/models/section";
import { generateSlug } from "@/components/services/generateSlug";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const sectionId = searchParams.get("sectionId");
  const product = await Product.find({ sectionId }).sort({ order: 1 }).lean();
  return NextResponse.json(product);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const count = await Product.countDocuments({ sectionId: body.sectionId });
  const slug = generateSlug(body.title) + "-" + Date.now();
  const item = await Product.create({
    ...body,
    slug,
    order: count + 1,
  });
  return NextResponse.json(item);
}

