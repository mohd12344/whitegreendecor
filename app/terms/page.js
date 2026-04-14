export const metadata = {
  title: "Terms and Conditions | White Green Decors",
  description:
    "Read the Terms and Conditions of White Green Decors. Understand our policies, user responsibilities, bookings, cancellations, and service guidelines before using our decoration services.",
  keywords: [
    "White Green Decors terms",
    "event decoration terms and conditions",
    "decoration service policy",
    "booking terms decor services",
    "event decoration rules India",
  ],
};

const Terms = () => {
  return (
    <div className="min-h-screen bg-stone-50 py-6 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <span className="text-xs font-semibold text-amber-500 tracking-widest uppercase">
            Legal
          </span>
          <h1 className="text-3xl font-bold text-stone-900 mt-1">
            Terms of Service
          </h1>
          <p className="text-stone-400 text-sm mt-1">
            Last updated: April 2026
          </p>
        </div>

        <div className="flex flex-col gap-8 text-stone-600 text-sm leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              Welcome to White Green Decors. By accessing or using our website
              and services, you agree to comply with and be bound by the
              following terms and conditions:
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              2. Services Offered
            </h2>
            <p>
              We provide decoration services for weddings, events, and related
              functions as described on our website. All bookings are subject to
              availability and confirmation.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              3. Payment and Booking
            </h2>
            <p>
              Advance payment is required to confirm your booking. The balance
              payment must be cleared as per the agreed timeline before the
              event date.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              4. Cancellations and Refunds
            </h2>
            <p>
              Cancellations made 48 hours before the event may be eligible for a
              full refund. Cancellations within 12 hours are non-refundable.
              Refunds are processed at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              5. Liability
            </h2>
            <p>
              We are not responsible for any indirect, incidental, or
              consequential damages resulting from delays or unforeseen issues
              during service delivery.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              6. Changes to Services
            </h2>
            <p>
              Minor adjustments in decoration design may occur due to
              availability of materials or venue restrictions. We strive to
              maintain the overall agreed theme and quality.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              7. Intellectual Property
            </h2>
            <p>
              All images, designs, and content on this website are owned by
              White Green Decors. Unauthorized use or reproduction is prohibited
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              7. Privacy Policy
            </h2>
            <p>
              We respect your privacy and handle your data according to our
              Privacy Policy, which you can review on our website.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              8. Governing Law
            </h2>
            <p>
              These terms are governed by the laws of India. Any disputes shall
              be subject to the jurisdiction of courts in Delhi
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              9. Contact
            </h2>
            <p>
              Questions? Reach us at{" "}
              <span className="text-amber-500">
                enquiry@whitegreendecors.com
              </span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
