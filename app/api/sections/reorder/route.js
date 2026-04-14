import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import Section from "@/lib/models/section";

export async function PATCH(req) {
  await connectDB();
  const { orderedIds } = await req.json();
  await Promise.all(
    orderedIds.map((id, index) =>
      Section.findByIdAndUpdate(id, { order: index + 1 }),
    ),
  );
  return NextResponse.json({ success: true });
}
