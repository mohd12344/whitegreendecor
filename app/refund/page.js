export const metadata = {
  title: "Refund & Cancellation Policy | White Green Decors",
  description:
    "Read the refund and cancellation policy of White Green Decors. Understand our booking terms, refund eligibility, cancellation rules, and service conditions before placing an order.",
  alternates: {
    canonical: "https://whitegreendecors.com/refund",
  },
  openGraph: {
    title: "Refund & Cancellation Policy | White Green Decors",
    description:
      "Learn about White Green Decors refund and cancellation policy, including booking terms, eligibility, and service conditions.",
    url: "https://whitegreendecors.com/refund",
    siteName: "White Green Decors",
    type: "website",
  },
};

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-stone-50 py-6 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <span className="text-xs font-semibold text-amber-500 tracking-widest uppercase">
            Legal
          </span>
          <h1 className="text-3xl font-bold text-stone-900 mt-1">
            Refund Policy
          </h1>
          <p className="text-stone-400 text-sm mt-1">
            Last updated: April 2026
          </p>
        </div>

        <div className="flex flex-col gap-8 text-stone-600 text-sm leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              1. Overview
            </h2>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                Our refund and returns policy lasts 30 days. If 30 days have
                passed since your purchase, we can’t offer you a full refund or
                exchange.
              </li>

              <li>
                To be eligible for a return, your item must be unused and in the
                same condition that you received it. It must also be in the
                original packaging.
              </li>

              <li>
                Several types of goods are exempt from being returned:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>
                    Perishable goods such as food, flowers, newspapers or
                    magazines
                  </li>
                  <li>Intimate or sanitary goods</li>
                  <li>Hazardous materials</li>
                  <li>Flammable liquids or gases</li>
                </ul>
              </li>

              <li>
                Additional non-returnable items:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Gift cards</li>
                  <li>Downloadable software products</li>
                  <li>Some health and personal care items</li>
                </ul>
              </li>

              <li>
                To complete your return, we require a receipt or proof of
                purchase.
              </li>

              <li>
                Please do not send your purchase back to the manufacturer.
              </li>

              <li>
                Partial refunds may be granted in certain situations:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Book with obvious signs of use</li>
                  <li>
                    CD, DVD, VHS tape, software, video game, cassette tape, or
                    vinyl record that has been opened
                  </li>
                  <li>
                    Any item not in its original condition, damaged, or missing
                    parts not due to our error
                  </li>
                  <li>Any item returned more than 30 days after delivery</li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              2. Refunds
            </h2>
            <p>
              Once your return is received and inspected, we will send you an
              email to notify you that we have received your returned item. We
              will also notify you of the approval or rejection of your refund.
              <br />
              If you are approved, then your refund will be processed, and a
              credit will automatically be applied to your credit card or
              original method of payment, within a certain amount of days.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              3. Late or missing refunds
            </h2>
            <p>
              If you haven’t received a refund yet, first check your bank
              account again.
              <br />
              Then contact your credit card company, it may take some time
              before your refund is officially posted. Next contact your bank.{" "}
              <br />
              There is often some processing time before a refund is posted.{" "}
              <br />
              If you’ve done all of this and you still have not received your
              refund yet, please contact us at (email address)
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              4. Sale items
            </h2>
            <p>
              Only regular priced items may be refunded. Sale items cannot be
              refunded.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              5. Exchanges
            </h2>
            <p>
              In some cases, partial refunds may be issued depending on the
              stage of preparation and costs already incurred by our team. This
              will be evaluated on a case-by-case basis.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              6. Shipping returns
            </h2>
            <p>
              To return your product, you should mail your product to: (physical
              address).
              <br />
              You will be responsible for paying for your own shipping costs for
              returning your item. Shipping costs are non-refundable. If you
              receive a refund, the cost of return shipping will be deducted
              from your refund.
              <br />
              Depending on where you live, the time it may take for your
              exchanged product to reach you may vary.
              <br />
              If you are returning more expensive items, you may consider using
              a trackable shipping service or purchasing shipping insurance. We
              don’t guarantee that we will receive your returned item.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mb-2">
              8. Contact Us
            </h2>
            <p>
              For any questions regarding refunds, feel free to contact us at{" "}
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

export default RefundPolicy;
