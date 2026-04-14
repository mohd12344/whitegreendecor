import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, phone, email, eventType, message } = body;

    if (!name?.trim() || !phone || !message?.trim()) {
      return NextResponse.json(
        { error: "Please fill required fields" },
        { status: 400 },
      );
    }

    const res = await fetch("https://inputhaven.com/api/v1/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _form_id: "f979916157b7a1c877b8b9dfff48f8a4",
        name,
        email,
        phone: `+91${phone}`,
        eventType,
        message,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("inputhaven error:", err);
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
