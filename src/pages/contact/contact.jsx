import React, { useState, useEffect } from "react";
import Navigation from "../../components/navigation/navigation.jsx";
import Loader from "../../components/loader/loader.jsx";
import SixthSection from "../../components/homeComponents/sixthSection.jsx";
import logo from "../../assets/avenzo-logo-transparent.png";
import {
  Phone,
  AlertTriangle,
  Clock,
  ShieldCheck,
  ChevronDown,
  Globe,
  Building2,
  Calculator,
  CheckCircle2,
  Activity,
  Layers
} from "lucide-react";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pkTime, setPkTime] = useState("");

  // Scope Estimator State
  const [selectedServices, setSelectedServices] = useState(["Custom Web Applications"]);
  const [selectedTimeline, setSelectedTimeline] = useState("4 - 8 Weeks");
  const [selectedTier, setSelectedTier] = useState("Standard Growth");

  useEffect(() => {
    document.title = "Contact Us — Avenzo Studio";
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Real-time Karachi Clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setPkTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      title: "Karachi Engineering Headquarters",
      subtitle: "State-of-the-art workspace for software innovation",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    },
    {
      title: "UI/UX & Design Architecture Lab",
      subtitle: "Crafting digital experiences for global platforms",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    },
    {
      title: "Enterprise Server Operations Hub",
      subtitle: "24/7 monitoring and cloud infrastructure maintenance",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== service));
      }
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  // Exact Pricing Matrix
  const SERVICE_PRICES = {
    "Portfolio Websites": { normal: 8.32, standard: 16.63, premium: 27.72 },
    "Business Websites": { normal: 19.4, standard: 38.81, premium: 66.53 },
    "Custom Web Applications": { normal: 33.26, standard: 66.53, premium: 121.81 },
    "E-Commerce Stores": { normal: 24.95, standard: 49.9, premium: 88.7 },
    "Web Automation & Workflows": { normal: 13.86, standard: 27.72, premium: 52.67 },
  };

  const calculateEstimate = () => {
    const tierKey =
      selectedTier === "Standard Growth"
        ? "normal"
        : selectedTier === "Enterprise"
        ? "standard"
        : "premium";

    let total = selectedServices.reduce((acc, service) => {
      const pricing = SERVICE_PRICES[service];
      return acc + (pricing ? pricing[tierKey] : 0);
    }, 0);

    if (selectedTimeline === "< 4 Weeks") total *= 1.25;

    return `$${Math.round(total)} USD`;
  };

  const faqs = [
    {
      q: "What is the typical response time for inquiries?",
      a: "Our enterprise response team reviews all incoming submissions within 2 to 4 business hours. For existing client SLA escalations, our emergency line operates 24/7.",
    },
    {
      q: "Do you offer in-person consultations at the studio?",
      a: "Yes, clients are welcome to visit our studio in Karachi. We recommend scheduling an appointment in advance to ensure the appropriate technical lead is available.",
    },
    {
      q: "What technical services does AVENZO STUDIO provide?",
      a: "We specialize in custom web software development, enterprise UI/UX design, brand identity creation, scalable cloud architecture, and end-to-end digital transformation.",
    },
    {
      q: "How do project contracts and NDA agreements work?",
      a: "We execute mutual Non-Disclosure Agreements (NDAs) prior to detailed project discussions to safeguard all proprietary client data and intellectual property.",
    },
  ];

  if (isLoading) {
    return (
      <>
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center space-y-4">
            <Loader className="h-16 w-16 animate-spin" />
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A94E]">
              Loading Contact Page...
            </p>
          </div>
        </div>
        <Navigation />
      </>
    );
  }

  return (
    <main className="relative w-full overflow-hidden bg-[#050505] text-white selection:bg-[#D9A94E]/30 selection:text-[#D9A94E]">
      <style>{`
        @keyframes avenzoLogoShadeBreathe {
          0%, 100% { opacity: 0.07; }
          50%      { opacity: 0.12; }
        }
        .avenzo-logo-shade { 
          animation: avenzoLogoShadeBreathe 9s ease-in-out infinite; 
        }
      `}</style>

      <Navigation />

      {/* Hero Section with Live Time & Status */}
      <section className="relative w-full overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#0c0d0f] via-[#08090a] to-[#050505] pt-36 pb-20">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
          <img
            src={logo}
            alt=""
            aria-hidden="true"
            width={1046}
            height={1041}
            loading="eager"
            decoding="async"
            className="avenzo-logo-shade absolute inset-0 h-full w-full object-cover object-[center_30%] opacity-[0.09] mix-blend-screen [will-change:opacity]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.35)_60%,rgba(0,0,0,0.75)_100%)]" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.03] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-12">
          {/* Live Studio Status Bar */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-[#D9A94E]/30 bg-[#D9A94E]/10 px-5 py-2 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D9A94E] opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#D9A94E]"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#D9A94E]">
              Studio Active
            </span>
            <span className="text-white/30">•</span>
            <span className="text-xs font-mono font-medium text-neutral-300">
              PKT Local Time: {pkTime || "Loading..."}
            </span>
          </div>

          <h1 className="mt-8 text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Accelerate Your Digital <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#F3CE8E] via-[#D9A94E] to-[#8a6a2c] bg-clip-text text-transparent">
              Transformation
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base text-neutral-400 sm:text-xl">
            Connect directly with engineering leadership or interact with our transparent scoping calculator to explore competitive software rates.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-8 border-t border-white/10 pt-8 text-xs font-semibold uppercase tracking-widest text-neutral-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#D9A94E]" />
              <span>Enterprise-Grade NDAs</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#D9A94E]" />
              <span>4-Hour SLA Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-[#D9A94E]" />
              <span>Global Client Coverage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time SLA & Operations Live Metrics Bar */}
      <section className="relative border-b border-white/10 bg-[#08090b] py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
              <div className="rounded-xl bg-[#D9A94E]/10 p-3 text-[#D9A94E]">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">99.98%</div>
                <div className="text-xs text-neutral-400">Uptime SLA Target</div>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
              <div className="rounded-xl bg-[#D9A94E]/10 p-3 text-[#D9A94E]">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">&lt; 2 Hours</div>
                <div className="text-xs text-neutral-400">Avg First Response</div>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
              <div className="rounded-xl bg-[#D9A94E]/10 p-3 text-[#D9A94E]">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">100%</div>
                <div className="text-xs text-neutral-400">On-Time Delivery</div>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
              <div className="rounded-xl bg-[#D9A94E]/10 p-3 text-[#D9A94E]">
                <Layers className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">10+</div>
                <div className="text-xs text-neutral-400">Shipped Platforms</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Communication Channels Grid */}
      <section className="relative mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Communication Channels</h2>
          <p className="mt-3 text-neutral-400 text-sm">Direct lines to our leadership, technical assistance, and physical operations.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Direct Advisory Line */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0B0C0E] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#D9A94E]/40 hover:shadow-[0_10px_30px_rgba(217,169,78,0.1)]">
            <div>
              <div className="mb-6 inline-flex rounded-2xl bg-[#D9A94E]/10 p-4 border border-[#D9A94E]/20 text-[#D9A94E] group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Direct Advisory Line</h3>
              <p className="mt-2 text-xs text-neutral-400">Direct phone call & consultation support with engineering leads.</p>
            </div>
            <a
              href="tel:+923072274835"
              className="mt-8 text-sm font-semibold text-[#D9A94E] hover:underline"
            >
              +92 307 2274835
            </a>
          </div>

          {/* 24/7 Incident Hotline */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0B0C0E] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#D9A94E]/40 hover:shadow-[0_10px_30px_rgba(217,169,78,0.1)]">
            <div>
              <div className="mb-6 inline-flex rounded-2xl bg-[#D9A94E]/10 p-4 border border-[#D9A94E]/20 text-[#D9A94E] group-hover:scale-110 transition-transform duration-300">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">24/7 Incident Hotline</h3>
              <p className="mt-2 text-xs text-neutral-400">Critical infrastructure, server alerts & 24/7 emergency escalation.</p>
            </div>
            <a
              href="tel:+923142308994"
              className="mt-8 text-sm font-semibold text-[#D9A94E] hover:underline"
            >
              +92 314 2308994
            </a>
          </div>

          {/* Primary Tech Hub */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0B0C0E] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#D9A94E]/40 hover:shadow-[0_10px_30px_rgba(217,169,78,0.1)]">
            <div>
              <div className="mb-6 inline-flex rounded-2xl bg-[#D9A94E]/10 p-4 border border-[#D9A94E]/20 text-[#D9A94E] group-hover:scale-110 transition-transform duration-300">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Primary Tech Hub</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                Office #202, 2nd Floor, M Yousuf Chamber, Shahrah-e-Faisal, Karachi
              </p>
            </div>
            <span className="mt-8 text-xs font-semibold uppercase tracking-wider text-[#D9A94E]">
              Open for Appointments
            </span>
          </div>
        </div>
      </section>

      {/* Synchronized Project Estimator & Scope Calculator */}
      <section className="relative mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="rounded-3xl border border-white/10 bg-[#0B0C0E] p-8 shadow-2xl lg:p-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D9A94E]">
                <Calculator className="h-4 w-4" />
                <span>Transparent Scoping Tool</span>
              </div>
              <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Project Scope & Cost Calculator</h3>
            </div>
            <div className="rounded-2xl border border-[#D9A94E]/30 bg-[#D9A94E]/10 p-4 text-right">
              <div className="text-xs font-semibold uppercase text-neutral-400">Estimated Price</div>
              <div className="text-2xl font-black text-[#D9A94E]">{calculateEstimate()}</div>
            </div>
          </div>

          <div className="mt-8 space-y-8">
            {/* Target Deliverables linked to actual pricing services */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                1. Select Services Needed
              </label>
              <div className="flex flex-wrap gap-3">
                {[
                  "Portfolio Websites",
                  "Business Websites",
                  "Custom Web Applications",
                  "E-Commerce Stores",
                  "Web Automation & Workflows",
                ].map((service) => (
                  <button
                    key={service}
                    onClick={() => toggleService(service)}
                    className={`rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all ${
                      selectedServices.includes(service)
                        ? "border-[#D9A94E] bg-[#D9A94E] text-black"
                        : "border-white/10 bg-black/40 text-neutral-300 hover:border-white/30"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Estimated Timeline */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                2. Target Timeline
              </label>
              <div className="flex flex-wrap gap-3">
                {["< 4 Weeks", "4 - 8 Weeks", "12+ Weeks"].map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTimeline(time)}
                    className={`rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all ${
                      selectedTimeline === time
                        ? "border-[#D9A94E] bg-[#D9A94E] text-black"
                        : "border-white/10 bg-black/40 text-neutral-300 hover:border-white/30"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Deployment Tier matching Pricing Matrix Tiers */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                3. Deployment Tier
              </label>
              <div className="flex flex-wrap gap-3">
                {[
                  { id: "Standard Growth", label: "Normal" },
                  { id: "Enterprise", label: "Standard" },
                  { id: "Mission Critical", label: "Premium" },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all ${
                      selectedTier === tier.id
                        ? "border-[#D9A94E] bg-[#D9A94E] text-black"
                        : "border-white/10 bg-black/40 text-neutral-300 hover:border-white/30"
                    }`}
                  >
                    {tier.id} ({tier.label})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facility Carousel Showcase */}
      <section className="relative border-t border-b border-white/10 bg-black py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="relative h-[380px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl sm:h-[480px]">
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img src={slide.image} alt={slide.title} className="h-full w-full object-cover brightness-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 z-20">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#D9A94E]">
                    Infrastructure & Studio
                  </span>
                  <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">{slide.title}</h3>
                  <p className="mt-1 text-xs text-neutral-300 sm:text-sm">{slide.subtitle}</p>
                </div>
              </div>
            ))}

            <div className="absolute bottom-6 right-8 z-30 flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? "w-8 bg-[#D9A94E]" : "w-2.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="relative mx-auto max-w-4xl px-6 py-24 lg:px-12">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A94E]">FAQ</p>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">Common Inquiries</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-[#0B0C0E] overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="text-base font-bold text-[#FFFFFF]">{faq.q}</span>
                <ChevronDown className={`h-5 w-5 text-[#D9A94E] transition-transform duration-300 ${activeFaq === idx ? "rotate-180" : ""}`} />
              </button>
              {activeFaq === idx && (
                <div className="border-t border-white/5 px-6 pb-6 pt-4 text-sm leading-relaxed text-neutral-400">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <SixthSection />
    </main>
  );
}