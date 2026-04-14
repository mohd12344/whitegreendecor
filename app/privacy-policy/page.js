export const metadata = {
  title: "Privacy Policy | White Green Decors",
  description:
    "Read the Privacy Policy of White Green Decors to understand how we collect, use, and protect your personal information when you use our decoration services and website.",
  alternates: {
    canonical: "https://whitegreendecors.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | White Green Decors",
    description:
      "Learn how White Green Decors handles your data, privacy, and personal information securely and responsibly.",
    url: "https://whitegreendecors.com/privacy-policy",
    siteName: "White Green Decors",
    type: "website",
  },
};

const Privacy = () => {
  return (
    <div className="min-h-screen bg-stone-50 py-6 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <span className="text-xs font-semibold text-amber-500 tracking-widest uppercase">
            Legal
          </span>
          <h1 className="text-3xl font-bold text-stone-900 mt-1">
            Privacy Policy
          </h1>
          <p className="text-stone-400 text-sm mt-1">
            Last updated: April 2026
          </p>
        </div>

        <div className="flex flex-col gap-8 text-stone-600 text-sm leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              1. What We Collect
            </h2>
            <p>
              We may collect the following types of information when you visit
              or interact with our website:
              <br />
              Name, contact number, email address Event details (date, location,
              type of decoration)
              <br />
              Payment and billing information (only for transactions)
              <br />
              Any messages or inquiries you send to us
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              2. How We Use Your Data
            </h2>
            <p>
              Your information is used solely for:
              <br />
              Confirming and managing your bookings
              <br />
              Responding to your inquiries
              <br />
              Sending updates or important event-related communication
              <br />
              Processing payments securely
              <br />
              Improving our services and website experience
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              3. Data Security
            </h2>
            <p>
              We implement industry-standard measures to protect your data
              against unauthorized access, loss, or misuse. We do not store or
              share sensitive payment information.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              4. Sharing of Information
            </h2>
            <p>
              We do not sell or rent your personal information to third parties.
              Your data may only be shared with trusted service providers
              involved in fulfilling your booking (e.g., delivery or setup
              teams), and only as needed.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              5. Cookies and Tracking
            </h2>
            <p>
              Our website may use cookies to improve user experience, track
              performance, and personalize content. You can disable cookies
              through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              6. Your Consent
            </h2>
            <p>
              By using our website or submitting your information, you consent
              to our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              7. Updates to This Policy
            </h2>
            <p>
              We may update this policy from time to time. Any changes will be
              reflected on this page with a revised effective date.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              8. Your Rights
            </h2>
            <p>
              You can update or delete your account at any time. If you want a
              copy of your data or have any privacy concerns, contact us at{" "}
              <span className="text-amber-500">
                enquiry@whitegreendecors.com
              </span>
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              9. Changes
            </h2>
            <p>
              We may update this policy occasionally. We'll notify you of
              significant changes via email or a notice on the platform.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
