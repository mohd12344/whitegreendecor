"use client";

import { useState, useContext } from "react";
import Image from "next/image";
import { NotificationContext } from "@/lib/contexts/serviceContext";

const ContactPage = ({ title }) => {
  const { showNotification } = useContext(NotificationContext);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventDate: "",
    venue: "",
    message: "",
    eventType: title,
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
    !phoneErr;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valid) return;
    setSending(true);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      const err = await res.json();
      showNotification(err.error || "Failed to send", "error");
    }
    setSending(false);
    setSent(true);
  };

  return (
    <section className="py-10 md:py-16 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <div className="p-6 sm:p-10 flex flex-col gap-4">
            <h2 className="font-['Playfair_Display'] text-lg sm:text-xl font-bold text-[#0d2818] leading-snug">
              {`${title} in Delhi NCR – Bright, Joyful & Memorable`}
            </h2>

            <p className="text-zinc-600 text-sm leading-relaxed">
              At White Green Decors, we create vibrant and beautiful{" "}
              {`${title.toLowerCase()}`} setups that bring warmth, positivity
              and unforgettable memories to your special day. From simple home
              functions to grand celebrations, we provide customized themes with
              fresh flowers, traditional props, drapes, lighting and unique
              backdrops.
            </p>

            <p className="text-zinc-600 text-sm leading-relaxed">
              Our expert team ensures on-time setup, premium quality and
              hassle-free experience. Make your function truly special with
              creative decor that matches your style and budget.
            </p>
          </div>

          <div className="bg-stone-50 p-6 sm:p-10 border-t lg:border-t-0 lg:border-l border-gray-100">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
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
                <p className="text-zinc-500 text-sm">
                  We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setFormData({
                      name: "",
                      phone: "",
                      eventDate: "",
                      venue: "",
                      message: "",
                    });
                  }}
                  className="text-sm text-[#1a4d2e] font-medium underline underline-offset-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#0d2818] mb-1">
                  Want a Custom {`${title}`}?
                </h3>
                <p className="text-zinc-500 text-xs sm:text-sm mb-5">
                  Share your details, we'll get back to you with the best idea.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Your Name*"
                      className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a4d2e] transition-all"
                    />
                    <div>
                      <div
                        className={`flex items-center bg-white border rounded-lg overflow-hidden transition-all focus-within:border-[#1a4d2e] ${phoneErr ? "border-red-400" : "border-gray-200"}`}
                      >
                        <span className="px-2 text-xs text-gray-400 border-r border-gray-200 py-2.5 bg-gray-50 shrink-0">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handlePhone(e.target.value)}
                          placeholder="Phone Number*"
                          maxLength={10}
                          className="flex-1 px-2 py-2.5 bg-transparent text-sm focus:outline-none"
                        />
                      </div>
                      {phoneErr && (
                        <p className="text-red-400 text-xs mt-1">{phoneErr}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) =>
                        setFormData({ ...formData, eventDate: e.target.value })
                      }
                      className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-zinc-500 focus:outline-none focus:border-[#1a4d2e] transition-all"
                    />
                    <input
                      type="text"
                      value={formData.venue}
                      onChange={(e) =>
                        setFormData({ ...formData, venue: e.target.value })
                      }
                      placeholder="Venue / Location*"
                      className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a4d2e] transition-all"
                    />
                  </div>

                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us about your requirements..."
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a4d2e] transition-all resize-none"
                  />

                  <button
                    type="submit"
                    disabled={!valid || sending}
                    className={`w-full py-3 flex items-center justify-center gap-2 font-semibold rounded-xl transition-all text-white text-sm ${valid && !sending ? "bg-green-600 hover:bg-green-700 cursor-pointer" : "bg-gray-300 cursor-not-allowed"}`}
                  >
                    {sending ? (
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
                    ) : (
                      <Image
                        src="/svg-icons/whatsapp.svg"
                        width={18}
                        height={18}
                        alt="whatsapp"
                      />
                    )}
                    {sending ? "Sending..." : "Get Quote on WhatsApp"}
                  </button>

                  <p className="text-center text-xs text-zinc-400 flex items-center justify-center gap-2">
                    <span>No Spam</span>
                    <span className="text-amber-400">•</span>
                    <span>Quick Response</span>
                    <span className="text-amber-400">•</span>
                    <span>Best Price</span>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
