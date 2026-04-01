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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic
  };

  const contactInfo = [
    {
      icon: "📞",
      title: "Call Us",
      info: "+91 98765 43210",
      link: "tel:+919876543210",
    },
    {
      icon: "💬",
      title: "WhatsApp",
      info: "+91 98765 43210",
      link: "https://wa.me/919876543210",
    },
    {
      icon: "✉️",
      title: "Email Us",
      info: "hello@whitegreen.in",
      link: "mailto:hello@whitegreen.in",
    },
    {
      icon: "📍",
      title: "Location",
      info: "NCR Delhi, India",
      link: "#map",
    },
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
            Contact <span className="text-[#d4af37]">Us</span>{" "}
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
        </div>{" "}
      </section>

      {/* Form & Map Section */}
      <section className="py-12 md:py-16 bg-[#f8f9fa]">
        <div className="max-w-[1400px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm">
              <h2 className="font-['Playfair_Display'] text-xl sm:text-2xl md:text-3xl font-bold text-[#0d2818] mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Fill out the form and we'll get back to you within 24 hours.
              </p>{" "}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#0d2818] text-sm font-medium mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#f8f9fa] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a4d2e] focus:ring-2 focus:ring-[#1a4d2e]/10 transition-all"
                      placeholder="John Doe"
                    />
                  </div>{" "}
                  <div>
                    <label className="block text-[#0d2818] text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#f8f9fa] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a4d2e] focus:ring-2 focus:ring-[#1a4d2e]/10 transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>{" "}
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
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[#0d2818] text-sm font-medium mb-2">
                    {" "}
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
                </div>{" "}
                <div>
                  <label className="block text-[#0d2818] text-sm font-medium mb-2">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#f8f9fa] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a4d2e] focus:ring-2 focus:ring-[#1a4d2e]/10 transition-all resize-none"
                    placeholder="Tell us about your event..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-[#1a4d2e] text-white font-semibold rounded-xl hover:bg-[#0d2818] hover:shadow-lg transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>
            {/* Map & Quick Contact */}
            <div className="flex flex-col gap-6">
              {/* Map */}
              <div
                id="map"
                className="bg-white rounded-3xl overflow-hidden shadow-sm flex-1 min-h-[300px]"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448196.52633258584!2d76.76abortedt7426456!3d28.643684899999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "300px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Quick WhatsApp CTA */}
              <div className="bg-[#1a4d2e] rounded-3xl p-6 md:p-8 text-center">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  Prefer WhatsApp?
                </h3>
                <p className="text-white/70 text-sm mb-5">
                  {" "}
                  Get instant replies on WhatsApp. We're online 9 AM - 9 PM.
                </p>
                <Link
                  href="https://wa.me/919876543210?text=Hi! I'm interested in your decoration services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20bd5a] hover:shadow-lg transition-all"
                >
                  <Image src={"/svg-icons/Whatsapp.svg"} width={20} height={20} alt="logo"/>
                  Chat on WhatsApp
                </Link>
              </div>
            </div>{" "}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
