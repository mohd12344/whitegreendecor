import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import nodemailer from "nodemailer";

export async function POST(req) {
  const body = await req.json();
  if (!body.name && !body.email)
    return NextResponse.json(
      { success: false, error: "Bad request" },
      { status: 400 },
    );
  await connectDB();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.APP_PASS,
    },
  });

  try {
    await Promise.all([
      transporter.sendMail({
        from: `"White Green Decors" <${process.env.EMAIL_USER}>`,
        to: [
          process.env.EMAIL_USER,
          "enquiry@whitegreendecors.com",
          "mdrihanzaidi1685@gmail.com",
        ],
        replyTo: body.email,
        subject: "We received your message",
        text: "Thanks! We'll get back to you soon.",
        html: `
        <h2>Form Submitted</h2>
        <p><b>Name:</b> ${body.name}</p>
        <p><b>Email:</b> ${body.email}</p>
        <p><b>Phone:</b> ${body.phone}</p>
        <p><b>Time:</b> ${body.eventDate}</p>
        <p><b>Event Type:</b> ${body.eventType}</p>
        <p><b>Event Location:</b> ${body.venue}</p>
        <p><b>Message:</b> ${body?.message}</p>
      `,
      }),
      transporter.sendMail({
        from: `"White Green Decors" <${process.env.EMAIL_USER}>`,
        to: body.email,
        subject: "We received your message",
        html: `
    <h2>Thanks for contacting us!</h2>
    <p>Hi ${body.name},</p>
    <p>We have received your message and will get back to you soon.</p>
    <br/>
    <p><b>Your Event:</b> ${body.eventType} </p>
    <p><b>Your message:</b></p>
    <p>${body?.message}</p>
  `,
      }),
    ]).catch((err) => console.error("email failedd:", err));

    return NextResponse.json({ success: true, error: false }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
