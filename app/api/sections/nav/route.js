import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import Section from "@/lib/models/section";

export async function GET() {
  await connectDB();
  const sections = await Section.find({ isActive: true })
    .sort({ order: 1 })
    .limit(15)
    .select("title slug")
    .lean();

  return NextResponse.json(sections);
}
