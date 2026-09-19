import React, { useState, useEffect } from "react";
import Navigation from "../../components/navigation/navigation.jsx";
import Loader from "../../components/loader/loader.jsx";
import SixthSection from "../../components/homeComponents/sixthSection.jsx";

/* ---------- SHARED ICON PRIMITIVES ---------- */

function CheckIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0 text-[#D9A94E]"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CrossIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0 text-neutral-600"
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronDown(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" {...props}>
      <path d="M6 9l6 6 6-6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- SERVICE CATEGORIES DATA (USD CONVERTED) ---------- */

const SERVICE_CATEGORIES = [
  {
    id: "portfolio",
    categoryTitle: "1. Portfolio Websites",
    categorySubtitle: "Engineered for creators, artists, models, and executives to present work professionally.",
    tiers: [
      { name: "Normal", price: "$5.40 USD" },
      { name: "Standard", price: "$10.80 USD", recommended: true },
      { name: "Premium", price: "$18 USD" },
    ],
    features: [
      { name: "Delivery Time", normal: "3 Days", standard: "5 Days", premium: "8 Days" },
      { name: "Revisions", normal: "2 Revisions", standard: "5 Revisions", premium: "Unlimited" },
      { name: "Number of Pages", normal: "1 Page", standard: "Up to 5 Pages", premium: "Up to 10 Pages" },
      { name: "Responsive Mobile & Desktop", normal: true, standard: true, premium: true },
      { name: "Contact Form Setup", normal: true, standard: true, premium: true },
      { name: "Interactive Work Gallery", normal: true, standard: true, premium: true },
      { name: "SEO Meta & Speed Tuning", normal: false, standard: true, premium: true },
      { name: "Custom Domain & Hosting Setup", normal: false, standard: true, premium: true },
      { name: "Dynamic Admin CMS / Blog", normal: false, standard: false, premium: true },
      { name: "Priority Support", normal: "14 Days", standard: "30 Days", premium: "60 Days" },
    ],
  },
  {
    id: "business",
    categoryTitle: "2. Business Websites",
    categorySubtitle: "Corporate and service company websites built to build authority and convert leads.",
    tiers: [
      { name: "Normal", price: "$12.60 USD" },
      { name: "Standard", price: "$25.20 USD", recommended: true },
      { name: "Premium", price: "$43.20 USD" },
    ],
    features: [
      { name: "Delivery Time", normal: "5 Days", standard: "10 Days", premium: "18 Days" },
      { name: "Revisions", normal: "3 Revisions", standard: "6 Revisions", premium: "Unlimited" },
      { name: "Number of Pages", normal: "Up to 4 Pages", standard: "Up to 8 Pages", premium: "Up to 15 Pages" },
      { name: "Responsive Mobile-First Design", normal: true, standard: true, premium: true },
      { name: "Lead Contact & Quote Form", normal: true, standard: true, premium: true },
      { name: "Google Maps Location Sync", normal: true, standard: true, premium: true },
      { name: "Lead Email Auto-Routing", normal: false, standard: true, premium: true },
      { name: "Admin CMS Content Manager", normal: false, standard: true, premium: true },
      { name: "Online Calendar Booking Sync", normal: false, standard: false, premium: true },
      { name: "Database Lead Storage", normal: false, standard: false, premium: true },
      { name: "Maintenance & Support", normal: "14 Days", standard: "30 Days", premium: "60 Days" },
    ],
  },
  {
    id: "custom",
    categoryTitle: "3. Custom Web Applications",
    categorySubtitle: "Bespoke React web applications hand-coded from scratch to your exact functional spec.",
    tiers: [
      { name: "Normal", price: "$21.60 USD" },
      { name: "Standard", price: "$43.20 USD", recommended: true },
      { name: "Premium", price: "$79.10 USD" },
    ],
    features: [
      { name: "Delivery Time", normal: "7 Days", standard: "14 Days", premium: "25 Days" },
      { name: "Revisions", normal: "2 Revisions", standard: "5 Revisions", premium: "Unlimited" },
      { name: "Custom Component Architecture", normal: true, standard: true, premium: true },
      { name: "Figma to Code Pixel-Perfect", normal: true, standard: true, premium: true },
      { name: "User Auth (Login / Signup)", normal: false, standard: true, premium: true },
      { name: "REST / GraphQL API Sync", normal: false, standard: true, premium: true },
      { name: "Custom User Dashboard", normal: false, standard: true, premium: true },
      { name: "Backend Database Schema", normal: false, standard: false, premium: true },
      { name: "Role-Based Access Control", normal: false, standard: false, premium: true },
      { name: "Technical Bug-Fix Support", normal: "14 Days", standard: "30 Days", premium: "60 Days" },
    ],
  },
  {
    id: "ecommerce",
    categoryTitle: "4. E-Commerce Stores",
    categorySubtitle: "Conversion-optimized digital storefronts engineered to sell products seamlessly.",
    tiers: [
      { name: "Normal", price: "$16.20 USD" },
      { name: "Standard", price: "$32.40 USD", recommended: true },
      { name: "Premium", price: "$57.60 USD" },
    ],
    features: [
      { name: "Delivery Time", normal: "7 Days", standard: "12 Days", premium: "20 Days" },
      { name: "Revisions", normal: "3 Revisions", standard: "6 Revisions", premium: "Unlimited" },
      { name: "Products Uploaded", normal: "Up to 20", standard: "Up to 60", premium: "Unlimited" },
      { name: "Shopping Cart & Checkout", normal: true, standard: true, premium: true },
      { name: "Payment Gateway (PayFast / JazzCash / EasyPaisa)", normal: true, standard: true, premium: true },
      { name: "Discount Codes & Coupons", normal: false, standard: true, premium: true },
      { name: "Inventory & Stock Tracking", normal: false, standard: true, premium: true },
      { name: "Multi-Currency & Tax Auto", normal: false, standard: false, premium: true },
      { name: "Abandoned Cart Auto Recovery", normal: false, standard: false, premium: true },
      { name: "Store Maintenance Support", normal: "14 Days", standard: "30 Days", premium: "60 Days" },
    ],
  },
  {
    id: "automation",
    categoryTitle: "5. Web Automation & Workflows",
    categorySubtitle: "Automate manual tasks, sync databases, and streamline customer pipelines.",
    tiers: [
      { name: "Normal", price: "$9 USD" },
      { name: "Standard", price: "$18 USD", recommended: true },
      { name: "Premium", price: "$34.20 USD" },
    ],
    features: [
      { name: "Delivery Time", normal: "4 Days", standard: "8 Days", premium: "14 Days" },
      { name: "Revisions", normal: "2 Revisions", standard: "5 Revisions", premium: "Unlimited" },
      { name: "Form-to-Email / Slack Alerts", normal: true, standard: true, premium: true },
      { name: "Google Sheets / CRM Sync", normal: true, standard: true, premium: true },
      { name: "Multi-App Workflow Connections", normal: false, standard: true, premium: true },
      { name: "Database Auto-Sync", normal: false, standard: true, premium: true },
      { name: "Webhook & API Integration", normal: false, standard: true, premium: true },
      { name: "AI Response Bots (OpenAI)", normal: false, standard: false, premium: true },
      { name: "Custom Python / Node Scripts", normal: false, standard: false, premium: true },
      { name: "Monitoring & Maintenance", normal: "14 Days", standard: "30 Days", premium: "60 Days" },
    ],
  },
];

const PRICING_FAQS = [
  {
    q: "How does the feature matrix order process work?",
    a: "Locate your required service category, compare the features on the left with their values in the columns, and click the order button corresponding to your preferred tier.",
  },
  {
    q: "Do I receive 100% ownership of the website?",
    a: "Yes. Once the project is finished, you receive full ownership of all source code, assets, and design files.",
  },
  {
    q: "Are local Pakistani payment gateways supported for E-Commerce?",
    a: "Yes, we integrate local Pakistani gateways like PayFast, JazzCash, and EasyPaisa, alongside international providers like Stripe.",
  },
  {
    q: "What happens if I need additional custom features?",
    a: "If you need a custom combination of features not listed in the matrix, click 'Request Custom Scope' below for a tailored quote.",
  },
];

const CURRENCY_OPTIONS = {
  USD: { name: "US Dollar", rate: 1 },
  PKR: { name: "Pakistani Rupee", rate: 278.5 },
  EUR: { name: "Euro", rate: 0.92 },
  GBP: { name: "British Pound", rate: 0.79 },
  AED: { name: "UAE Dirham", rate: 3.67 },
  SAR: { name: "Saudi Riyal", rate: 3.75 },
  CAD: { name: "Canadian Dollar", rate: 1.37 },
  AUD: { name: "Australian Dollar", rate: 1.53 },
  INR: { name: "Indian Rupee", rate: 83.1 },
  JPY: { name: "Japanese Yen", rate: 150.2 },
  CNY: { name: "Chinese Yuan", rate: 7.24 },
  CHF: { name: "Swiss Franc", rate: 0.88 },
  NZD: { name: "New Zealand Dollar", rate: 1.66 },
  SGD: { name: "Singapore Dollar", rate: 1.34 },
  MYR: { name: "Malaysian Ringgit", rate: 4.72 },
  BDT: { name: "Bangladeshi Taka", rate: 117.5 },
  QAR: { name: "Qatari Riyal", rate: 3.64 },
  KWD: { name: "Kuwaiti Dinar", rate: 0.31 },
  OMR: { name: "Omani Rial", rate: 0.38 },
  TRY: { name: "Turkish Lira", rate: 32.2 },
  ZAR: { name: "South African Rand", rate: 18.3 },
};

function findCurrency(value) {
  const normalizedValue = value.trim().toLowerCase();
  return Object.entries(CURRENCY_OPTIONS).find(([code, currency]) =>
    code.toLowerCase() === normalizedValue || currency.name.toLowerCase() === normalizedValue
  )?.[0] || null;
}

function formatConvertedPrice(price, currencyCode) {
  const basePrice = Number.parseFloat(price.replace(/[^0-9.]/g, ""));
  const convertedPrice = basePrice * CURRENCY_OPTIONS[currencyCode].rate;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "symbol",
    maximumFractionDigits: 2,
  }).format(convertedPrice);
}

/* ---------- MAIN COMPONENT ---------- */

export default function Pricing() {
  const [isLoading, setIsLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [currencyInput, setCurrencyInput] = useState("USD");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  useEffect(() => {
    document.title = "Services & Pricing — Avenzo Studio";

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const renderCellContent = (value) => {
    if (typeof value === "boolean") {
      return value ? (
        <CheckIcon className="mx-auto" />
      ) : (
        <CrossIcon className="mx-auto" />
      );
    }
    return <span className="font-medium text-neutral-200 block text-center">{value}</span>;
  };

  const handleCurrencyChange = (event) => {
    const value = event.target.value;
    setCurrencyInput(value);
    const currencyCode = findCurrency(value);

    if (currencyCode) {
      setSelectedCurrency(currencyCode);
    }
  };

  const currencyIsSupported = Boolean(findCurrency(currencyInput));

  if (isLoading) {
    return (
      <>
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center space-y-4">
            <Loader />
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A94E]">
              Loading Pricing Page...
            </p>
          </div>
        </div>
        <Navigation />
      </>
    );
  }

  return (
    <main className="relative w-full overflow-hidden bg-black text-white">
      <Navigation />

      {/* Hero Header */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#0c0d0f] via-[#08090a] to-black pt-36 pb-16">
        <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A94E]">
            Transparent USD Rates
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Service Specs & Pricing Matrix
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            Compare features on the left against clear values in USD across Normal, Standard, and Premium tiers.
          </p>
          <div className="mx-auto mt-8 max-w-sm text-left">
            <label htmlFor="pricing-currency" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A94E]">
              Display currency
            </label>
            <div className="relative">
              <input
                id="pricing-currency"
                list="pricing-currency-options"
                value={currencyInput}
                onChange={handleCurrencyChange}
                placeholder="Enter currency, e.g. PKR"
                aria-describedby="pricing-currency-status"
                className="h-12 w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 pr-12 text-sm font-medium text-white outline-none transition-colors placeholder:text-neutral-500 focus:border-[#D9A94E] focus:ring-2 focus:ring-[#D9A94E]/20"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#D9A94E]">↗</span>
            </div>
            <datalist id="pricing-currency-options">
              {Object.entries(CURRENCY_OPTIONS).map(([code, currency]) => (
                <option key={code} value={code}>{currency.name}</option>
              ))}
            </datalist>
            <p id="pricing-currency-status" className={`mt-2 text-xs ${currencyIsSupported ? "text-neutral-500" : "text-amber-400"}`}>
              {currencyIsSupported
                ? `Prices shown in ${CURRENCY_OPTIONS[selectedCurrency].name} (${selectedCurrency}).`
                : "Enter a currency code or full currency name from the list."}
            </p>
          </div>
        </div>
      </section>

      {/* 5 SERVICE CATEGORY TABLES */}
      <div className="space-y-24 pb-24">
        {SERVICE_CATEGORIES.map((category) => (
          <section key={category.id} className="relative w-full bg-black px-6 lg:px-10">
            <div className="mx-auto max-w-7xl">
              {/* Category Header */}
              <div className="mb-8 border-b border-white/10 pb-4 text-center">
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {category.categoryTitle}
                </h2>
                <p className="mt-2 text-sm text-neutral-400">{category.categorySubtitle}</p>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0B0C0E]">
                <table className="w-full border-collapse text-center min-w-[700px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02]">
                      <th className="w-2/5 p-5 text-sm font-bold uppercase tracking-wider text-[#D9A94E] text-center">
                        Feature / Deliverable
                      </th>
                      {category.tiers.map((tier, tIdx) => (
                        <th
                          key={tIdx}
                          className={`w-1/5 p-5 text-center transition-colors ${
                            tier.recommended ? "bg-[#D9A94E]/10" : ""
                          }`}
                        >
                          {tier.recommended && (
                            <span className="mb-2 inline-block rounded-full bg-[#D9A94E] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-black">
                              Best Choice
                            </span>
                          )}
                          <div className="text-base font-bold text-white text-center">{tier.name}</div>
                          <div className="mt-1 text-xl font-extrabold text-[#D9A94E] text-center">
                            {formatConvertedPrice(tier.price, selectedCurrency)}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-xs sm:text-sm">
                    {category.features.map((feature, fIdx) => (
                      <tr key={fIdx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-5 font-semibold text-neutral-300 border-r border-white/10 text-center">
                          {feature.name}
                        </td>
                        <td className="p-5 text-center border-r border-white/10">
                          {renderCellContent(feature.normal)}
                        </td>
                        <td className="p-5 text-center border-r border-white/10 bg-[#D9A94E]/[0.02]">
                          {renderCellContent(feature.standard)}
                        </td>
                        <td className="p-5 text-center">
                          {renderCellContent(feature.premium)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* FAQ SECTION */}
      <section className="relative w-full bg-[#0B0C0E] border-t border-white/10 px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A94E]">Order Info</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
          </div>

          <div className="mt-12 space-y-4">
            {PRICING_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-black overflow-hidden transition-colors hover:border-[#D9A94E]/40"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-6 text-left font-bold flex justify-between items-center text-white text-sm sm:text-base"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-[#D9A94E] transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/10 pt-4 text-left">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-black to-[#0c0d0f] px-6 py-20 text-center">
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Need a Custom Scope?</h2>
          <p className="mt-4 text-base text-neutral-400">
            Send us your brief and get a custom quote and timeline within 24 hours.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#F3CE8E] via-[#D9A94E] to-[#8a6a2c] px-8 text-sm font-semibold text-black shadow-[0_6px_24px_rgba(217,169,78,0.3)] transition-transform duration-200 hover:scale-105"
          >
            Request Custom Scope
          </a>
        </div>
      </section>

      <SixthSection />
    </main>
  );
}