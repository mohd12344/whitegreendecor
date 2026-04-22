"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    message: "",
  });

  const [phoneErr, setPhoneErr] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handlePhone = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 10);
    setFormData((p) => ({ ...p, phone: digits }));

    if (digits.length > 0 && digits.length < 10)
      setPhoneErr("Enter valid 10-digit number");
    else if (digits.length === 10 && digits[0] === "0")
      setPhoneErr("Number shouldn't start with 0");
    else setPhoneErr("");
  };

  const valid =
    formData.name.trim() &&
    formData.phone.length === 10 &&
    formData.phone[0] !== "0" &&
    formData.message.trim() &&
    !phoneErr;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valid) return;
    setSending(true);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventType: formData.eventType,
        message: formData.message,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to send");
    }
    setSending(false);
    setSent(true);
  };

  const contactInfo = [
    {
      icon: "📞",
      title: "Call Us",
      info: "+91 63984 84419",
      link: "tel:+916398484419",
    },
    {
      icon: "💬",
      title: "WhatsApp",
      info: "+91 63984 84419",
      link: "https://wa.me/6398484419",
    },
    {
      icon: "✉️",
      title: "Email Us",
      info: "enquiry@whitegreendecors.com",
      link: "mailto:enquiry@whitegreendecors.com",
    },
    { icon: "📍", title: "Location", info: "NCR Delhi, India", link: "#map" },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="bg-[#0d2818] py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-5 text-center">
          <span className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/30 rounded-full px-4 py-2 mb-5">
            <span className="text-[#d4af37]">✦</span>
            <span className="text-white/90 text-sm">Get In Touch</span>
          </span>
          <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Contact <span className="text-[#d4af37]">Us</span>
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-lg mx-auto">
            Have a question or ready to book? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {contactInfo.map((item, i) => (
              <Link
                key={i}
                href={item.link}
                target={item.link.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="bg-[#f8f9fa] hover:bg-[#1a4d2e] rounded-2xl p-5 md:p-6 text-center group transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-[#0d2818] group-hover:text-white font-semibold text-sm md:text-base mb-1 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 group-hover:text-white/80 text-xs md:text-sm transition-colors">
                  {item.info}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Map */}
      <section className="py-12 md:py-16 bg-[#f8f9fa]">
        <div className="max-w-[1400px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Form */}
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm">
              <h2 className="font-['Playfair_Display'] text-xl sm:text-2xl md:text-3xl font-bold text-[#0d2818] mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Fill out the form and we'll get back to you within 24 hours.
              </p>

              {/* ── Success State ── */}
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-[#1a4d2e]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-[#0d2818] font-semibold text-lg">
                    Message Sent!
                  </h3>
                  <p className="text-gray-500 text-sm max-w-xs">
                    Thank you for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        eventType: "",
                        message: "",
                      });
                    }}
                    className="mt-2 text-sm text-[#1a4d2e] font-medium underline underline-offset-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[#0d2818] text-sm font-medium mb-2">
                        Your Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-[#f8f9fa] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a4d2e] focus:ring-2 focus:ring-[#1a4d2e]/10 transition-all"
                        placeholder="Rohit Sharma"
                      />
                    </div>

                    <div>
                      <label className="block text-[#0d2818] text-sm font-medium mb-2">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      {/* +91 prefix */}
                      <div
                        className={`flex items-center bg-[#f8f9fa] border rounded-xl overflow-hidden transition-all focus-within:border-[#1a4d2e] focus-within:ring-2 focus-within:ring-[#1a4d2e]/10 ${phoneErr ? "border-red-400" : "border-gray-200"}`}
                      >
                        <span className="px-3 text-sm text-gray-500 border-r border-gray-200 py-3 bg-gray-100 flex-shrink-0">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handlePhone(e.target.value)}
                          className="flex-1 px-3 py-3 bg-transparent text-sm focus:outline-none"
                          placeholder="98765 43210"
                          maxLength={10}
                        />
                      </div>
                      {phoneErr && (
                        <p className="text-red-400 text-xs mt-1">{phoneErr}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[#0d2818] text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#f8f9fa] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a4d2e] focus:ring-2 focus:ring-[#1a4d2e]/10 transition-all"
                      placeholder="rohit@example.com"
                    />
                  </div>

                  {/* Event Type */}
                  <div>
                    <label className="block text-[#0d2818] text-sm font-medium mb-2">
                      Event Type
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) =>
                        setFormData({ ...formData, eventType: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#f8f9fa] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a4d2e] focus:ring-2 focus:ring-[#1a4d2e]/10 transition-all cursor-pointer"
                    >
                      <option value="">Select event type</option>
                      <option value="mehndi">Mehndi Decor</option>
                      <option value="haldi">Haldi Decor</option>
                      <option value="ring">Ring Ceremony</option>
                      <option value="wedding">Wedding Decor</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[#0d2818] text-sm font-medium mb-2">
                      Your Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#f8f9fa] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a4d2e] focus:ring-2 focus:ring-[#1a4d2e]/10 transition-all resize-none"
                      placeholder="Tell us about your event — date, location, budget..."
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!valid || sending}
                    className={`w-full py-4 font-semibold rounded-xl transition-all text-white ${
                      valid && !sending
                        ? "bg-[#1a4d2e] hover:bg-[#0d2818] hover:shadow-lg cursor-pointer"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    {sending ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="w-4 h-4 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map + WhatsApp */}
            <div className="flex flex-col gap-6">
              <div
                id="map"
                className="bg-white rounded-3xl overflow-hidden shadow-sm flex-1 min-h-[300px]"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.1597002696967!2d77.09792967529228!3d28.71477297561992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d07becaec3587%3A0x61be9fd67d1dc2fe!2sWhite%20Green%20Decors%20-%20Wedding%2C%20Haldi%2C%20Mehndi%20%26%20House%20Flower%20Decoration%2C%20Delhi!5e0!3m2!1sen!2sin!4v1776060015607!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "300px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="bg-[#1a4d2e] rounded-3xl p-6 md:p-8 text-center">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  Prefer WhatsApp?
                </h3>
                <p className="text-white/70 text-sm mb-5">
                  Get instant replies on WhatsApp. We're online 9 AM - 9 PM.
                </p>
                <Link
                  href="https://wa.me/6398484419?text=Hi! I'm interested in your decoration services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20bd5a] hover:shadow-lg transition-all"
                >
                  <svg
                    viewBox="0 0 32 32"
                    className={"w-8 h-8 text-white"}
                    fill="currentColor"
                  >
                    <path d="M16 3C9.372 3 4 8.372 4 15c0 2.386.698 4.61 1.9 6.48L4 29l7.72-1.86A11.94 11.94 0 0 0 16 27c6.628 0 12-5.372 12-12S22.628 3 16 3zm0 21.8c-1.96 0-3.78-.56-5.32-1.52l-.38-.22-4.58 1.1 1.22-4.46-.24-.4A9.77 9.77 0 0 1 6.2 15c0-5.41 4.39-9.8 9.8-9.8s9.8 4.39 9.8 9.8-4.39 9.8-9.8 9.8zm5.38-7.34c-.3-.15-1.76-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.36.22-.66.07-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.5-1.8-1.68-2.1-.18-.3-.02-.46.13-.6.13-.13.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.64-.93-2.25-.24-.58-.48-.5-.68-.5h-.58c-.2 0-.52.07-.8.37-.28.3-1.06 1.04-1.06 2.54s1.09 2.94 1.24 3.15c.15.2 2.14 3.27 5.18 4.58.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.18-1.42-.07-.12-.27-.2-.57-.35z" />
                  </svg>
                  Chat on WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
