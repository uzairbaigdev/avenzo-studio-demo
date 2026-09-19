import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/avenzo-logo-transparent.png";
import Navigation from "../../components/navigation/navigation.jsx";
import SecondSection from "../../components/homeComponents/secondSection.jsx";
import Loader from "../../components/loader/loader.jsx";
import SixthSection from "../../components/homeComponents/sixthSection.jsx";

/* ---------- shared icon primitive (matches about.jsx) ---------- */

function Icon({ children, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/* ---------- icons (same set used in about.jsx) ---------- */

const CustomSiteIcon = (props) => (
  <Icon {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18" />
    <path d="M7 14h4" />
  </Icon>
);

const PortfolioIcon = (props) => (
  <Icon {...props}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a4 4 0 0 1 8 0v2" />
  </Icon>
);

const CartIcon = (props) => (
  <Icon {...props}>
    <circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="18" cy="20" r="1.4" fill="currentColor" stroke="none" />
    <path d="M3 4h2l2.4 11.6a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H6" />
  </Icon>
);

const BriefcaseIcon = (props) => (
  <Icon {...props}>
    <rect x="2" y="7" width="20" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M2 12h20" />
  </Icon>
);

const AutomationIcon = (props) => (
  <Icon {...props}>
    <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
  </Icon>
);

const OwnershipIcon = PortfolioIcon;

const ChatIcon = (props) => (
  <Icon {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </Icon>
);

const MaintainIcon = (props) => (
  <Icon {...props}>
    <path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 1 5.4-5.4z" />
  </Icon>
);

const SpeedIcon = AutomationIcon;

const ChevronDown = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" {...props}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

/* ---------- data — sourced directly from about.jsx, nothing invented ---------- */

const STATS = [
  { value: "10+", label: "Projects delivered" },
  { value: "2+", label: "Years building software" },
  { value: "100%", label: "uptime guarantee" },
];

const LOGO_MARQUEE = [
  "Nexus AI", "Apex Digital", "Starlight Media",
  "Hyperion Logistics", "Vortex Commerce", "Crestview Labs",
];

const SERVICE_CATEGORIES = ["All", "Web", "Commerce", "Development", "Data", "Marketing", "Automation"];

const SERVICES = [
  {
    id: "custom",
    title: "Custom Website Development",
    description: "Built around your business, not a template. Every structural and design decision starts from what your users actually need.",
    Icon: CustomSiteIcon,
    category: "Web",
    metric: "100% Custom Code",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
    details: ["Discovery & wireframes before code", "Hand-coded, no page builder", "Full source handed over"],
  },
  {
    id: "portfolio",
    title: "Portfolio Development",
    description: "Clean case studies and fast load times in a design that puts your work front and center.",
    Icon: PortfolioIcon,
    category: "Web",
    metric: "Sub-Second Loads",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
    details: ["Case-study layout templates", "Sub-second load times", "Built-in contact form"],
  },
  {
    id: "ecommerce",
    title: "E-Commerce Website Development",
    description: "Product catalogs, cart, and checkout built to handle real inventory and real customers.",
    Icon: CartIcon,
    category: "Commerce",
    metric: "Secure Checkouts",
    image: "https://images.unsplash.com/photo-1556742049-0a67dd604944?auto=format&fit=crop&w=1000&q=80",
    details: ["Cart & checkout flow", "Inventory-ready product catalog", "Payment gateway integration"],
  },
  {
    id: "business",
    title: "Business Website Development",
    description: "A site your company can point clients to with confidence — services, credibility, contact.",
    Icon: BriefcaseIcon,
    category: "Web",
    metric: "SEO Ready",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
    details: ["Services & credibility pages", "Lead-capture contact forms", "SEO-ready structure"],
  },
  {
    id: "automation",
    title: "Automated Website Solutions",
    description: "Forms that trigger emails, data that syncs to a database — manual steps, wired away.",
    Icon: AutomationIcon,
    category: "Automation",
    metric: "Instant Sync",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    details: ["Form-to-email automation", "Database sync on submit", "Custom admin dashboards"],
  },
  {
    id: "seo",
    title: "SEO Strategy & Implementation",
    description: "Search-focused technical foundations and content structure that help the right audience discover your website.",
    Icon: BriefcaseIcon,
    category: "Marketing",
    metric: "Search Ready",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    details: ["Technical SEO foundations", "Search-friendly page structure", "Performance and visibility review"],
  },
  {
    id: "ai-integration-service",
    title: "AI Integration",
    description: "Useful AI capabilities connected to your website, product, or internal workflow with clear human control.",
    Icon: AutomationIcon,
    category: "Automation",
    metric: "Practical AI",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80",
    details: ["AI feature planning", "Model and API integration", "Reliable output workflows"],
  },
  {
    id: "ai-agents-integration",
    title: "AI Agents Integration",
    description: "Task-focused AI agents that connect tools, follow defined workflows, and support your team without unnecessary complexity.",
    Icon: ChatIcon,
    category: "Automation",
    metric: "Workflow Agents",
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1000&q=80",
    details: ["Agent workflow design", "Tool and data connections", "Guardrails and handoff logic"],
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    description: "Clear digital marketing foundations that connect your website, message, and audience to measurable goals.",
    Icon: BriefcaseIcon,
    category: "Marketing",
    metric: "Growth Focused",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    details: ["Digital presence planning", "Campaign-ready landing pages", "Conversion-focused messaging"],
  },
  {
    id: "database-integration",
    title: "Database Integration",
    description: "Secure connections between your application, data sources, and business workflows for reliable information flow.",
    Icon: MaintainIcon,
    category: "Data",
    metric: "Connected Data",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1000&q=80",
    details: ["Database connection planning", "Secure data synchronization", "Reliable read and write workflows"],
  },
  {
    id: "frontend-development",
    title: "Frontend Development",
    description: "Responsive, accessible interfaces built for clarity, speed, and consistent behavior across modern devices.",
    Icon: CustomSiteIcon,
    category: "Development",
    metric: "Responsive UI",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
    details: ["Component-based interfaces", "Responsive layouts", "Accessible interaction patterns"],
  },
  {
    id: "backend-development",
    title: "Backend Development",
    description: "Dependable server-side systems, APIs, and data workflows designed to support real business operations.",
    Icon: MaintainIcon,
    category: "Development",
    metric: "Reliable Systems",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
    details: ["API and server architecture", "Authentication and permissions", "Database-backed workflows"],
  },
  {
    id: "full-stack-development",
    title: "Full Stack Development",
    description: "End-to-end product development connecting polished interfaces, backend services, databases, and deployment.",
    Icon: AutomationIcon,
    category: "Development",
    metric: "End-to-End Build",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=1000&q=80",
    details: ["Frontend and backend delivery", "Integrated data architecture", "Production deployment support"],
  },
  {
    id: "mern-stack-development",
    title: "MERN Stack Development",
    description: "Modern JavaScript applications built with MongoDB, Express.js, React, and Node.js as one cohesive stack.",
    Icon: CustomSiteIcon,
    category: "Development",
    metric: "MERN Applications",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80",
    details: ["MongoDB data modeling", "Express and Node.js APIs", "React application interfaces"],
  },
  {
    id: "data-optimization",
    title: "Data Optimization",
    description: "Better-organized data and faster workflows through thoughtful modeling, cleanup, indexing, and reporting foundations.",
    Icon: AutomationIcon,
    category: "Data",
    metric: "Efficient Data",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    details: ["Data structure review", "Query and workflow optimization", "Scalable reporting foundations"],
  },
  {
    id: "content-writing",
    title: "Blogging & Content Writing",
    description: "Clear, useful content that explains your value, supports SEO, and gives your audience a reason to trust your brand.",
    Icon: ChatIcon,
    category: "Marketing",
    metric: "Clear Messaging",
    image: "https://images.unsplash.com/photo-1455390582262-044cdevd2b?auto=format&fit=crop&w=1000&q=80",
    details: ["Blog and article writing", "Website service copy", "SEO-aware content structure"],
  },
  {
    id: "ai-automation-tools",
    title: "AI & Automation Tools",
    description: "Practical tool selection and workflow automation that removes repetitive steps while keeping your processes understandable.",
    Icon: AutomationIcon,
    category: "Automation",
    metric: "Smarter Workflows",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    details: ["Tool and workflow audit", "Automation implementation", "Handoff and documentation"],
  },
];

const TECH_CATEGORIES = ["All", "Frontend", "Backend", "Data", "AI & Automation", "Tools & Integration", "Growth & Content"];

const TECH_STACK = [
  { id: "javascript", label: "JavaScript", role: "Interactive logic", category: "Frontend" },
  { id: "python", label: "Python", role: "Application development", category: "Backend" },
  { id: "cpp", label: "C++", role: "High-performance programming", category: "Backend" },
  { id: "react", label: "React", role: "Component UI", category: "Frontend" },
  { id: "ai-integration", label: "AI Integration", role: "Connected AI features", category: "AI & Automation" },
  { id: "nodejs", label: "Node.js", role: "Server-side JavaScript", category: "Backend" },
  { id: "express", label: "Express.js", role: "API development", category: "Backend" },
  { id: "django", label: "Django", role: "Python web framework", category: "Backend" },
  { id: "mongodb", label: "MongoDB", role: "Document database", category: "Data" },
  { id: "firebase", label: "Firebase", role: "Auth & real-time data", category: "Data" },
  { id: "supabase", label: "Supabase", role: "Postgres backend", category: "Data" },
  { id: "database-design", label: "Database Design", role: "Scalable data architecture", category: "Data" },
  { id: "prompt-engineering", label: "Prompt Engineering", role: "Reliable AI instruction design", category: "AI & Automation" },
  { id: "ai-tools-workflows", label: "AI Tools & Workflows", role: "Practical AI automation", category: "AI & Automation" },
  { id: "tailwind-css", label: "Tailwind CSS", role: "Utility-first styling", category: "Tools & Integration" },
  { id: "bootstrap", label: "Bootstrap", role: "Responsive UI framework", category: "Tools & Integration" },
  { id: "postman", label: "Postman", role: "API testing & development", category: "Tools & Integration" },
  { id: "git-github", label: "Git & GitHub", role: "Version control & collaboration", category: "Tools & Integration" },
  { id: "seo", label: "SEO", role: "Search visibility", category: "Growth & Content" },
  { id: "website-optimization", label: "Website Optimization", role: "Speed & conversion", category: "Growth & Content" },
  { id: "website-consulting", label: "Website Consulting", role: "Technical direction", category: "Growth & Content" },
  { id: "blogging-content", label: "Blogging & Content Writing", role: "Clear, useful content", category: "Growth & Content" },
  { id: "html", label: "HTML", role: "Semantic markup", category: "Frontend" },
  { id: "css", label: "CSS", role: "Layout & motion", category: "Frontend" },
];

const WHY_CHOOSE_US = [
  {
    id: "speed",
    title: "Real engineering, not templates",
    description: "Every project is coded from scratch around your actual requirements — not a reskinned theme.",
    Icon: SpeedIcon,
  },
  {
    id: "ownership",
    title: "You own everything",
    description: "Full source code handed over at the end. No vendor lock-in, no withheld files.",
    Icon: OwnershipIcon,
  },
  {
    id: "communication",
    title: "Direct communication",
    description: "You talk to the person actually building your site — not an account manager relaying messages.",
    Icon: ChatIcon,
  },
  {
    id: "maintain",
    title: "Built to last",
    description: "Clean, documented code that's easy for you or anyone else to maintain and extend later.",
    Icon: MaintainIcon,
  },
];

const FAQS = [
  { q: "Who owns the source code once the site is delivered?", a: "You retain 100% full ownership of all source code, design assets, and repository access upon project completion." },
  { q: "How long does a typical project take from start to finish?", a: "Standard business and custom portfolio sites typically range from 2 to 4 weeks. E-commerce and custom web apps take 4 to 8 weeks depending on requirements." },
  { q: "Do you offer post-launch support and ongoing maintenance?", a: "Yes. We offer continuous maintenance retainers for performance checks, security updates, content updates, and feature additions." },
  { q: "How do we get started with a project proposal?", a: "Click 'Book a Call' or reach out through our contact form. We'll set up an initial discovery call to review your scope and provide a fixed quote." },
];

/* ---------- hooks ---------- */

function useCountUp(target, start, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let frame;
    const startTime = performance.now();
    const numeric = parseInt(String(target).replace(/[^0-9]/g, ""), 10) || 0;

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * numeric));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration]);

  return value;
}

/* ---------- helpers ---------- */

/** Slim gold progress bar fixed to the top of the viewport, tracking scroll depth. */
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-50 h-[3px] bg-[#D9A94E] transition-[width] duration-150 ease-out"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}

function PillFilter({ options, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
            active === opt
              ? "bg-[#D9A94E] text-black"
              : "border border-white/15 text-neutral-400 hover:border-[#D9A94E]/50 hover:text-white"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function ServiceCard({ service, isOpen, onToggle }) {
  const { Icon: SvcIcon } = service;
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B0C0E] transition-colors duration-300 hover:border-[#D9A94E]/40">
      <div className="relative h-40 overflow-hidden">
        <img
          src={service.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/60 to-transparent" />
        <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[#D9A94E]/30 bg-black/60 text-[#D9A94E] backdrop-blur-sm">
          <SvcIcon className="h-5 w-5" />
        </div>
        <span className="absolute bottom-4 left-5 text-xs font-semibold uppercase tracking-widest text-[#D9A94E]">
          {service.metric}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-white">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-400">{service.description}</p>

        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-[#D9A94E]"
        >
          {isOpen ? "Show less" : "What's included"}
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        <div className={`grid transition-all duration-300 ${isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <ul className="space-y-2 overflow-hidden border-t border-white/10 pt-4">
            {service.details.map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm text-neutral-300">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-[#D9A94E]" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


/* ---------- page ---------- */

export default function Services() {
  const [loading, setLoading] = useState(true);
  const [serviceFilter, setServiceFilter] = useState("All");
  const [expandedService, setExpandedService] = useState(null);
  const [techFilter, setTechFilter] = useState("All");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [openWhyIndex, setOpenWhyIndex] = useState(0);
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const filteredServices =
    serviceFilter === "All" ? SERVICES : SERVICES.filter((s) => s.category === serviceFilter);

  const filteredTech =
    techFilter === "All" ? TECH_STACK : TECH_STACK.filter((t) => t.category === techFilter);

  useEffect(() => {
    if (loading) return;
    const node = statsRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [loading]);

  /* SEO: set the document title and meta description for this route.
     Uses only real, verified copy already on this page — nothing invented. */
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Services — Avenzo Studio | Custom Web Development";

    const DESCRIPTION =
      "Avenzo Studio builds custom websites, portfolios, e-commerce platforms, business websites, and automated web solutions using React, Tailwind CSS, Firebase, and Supabase. 10+ projects delivered, 2+ years of experience.";

    let meta = document.querySelector('meta[name="description"]');
    const createdMeta = !meta;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    const previousDescription = meta.getAttribute("content");
    meta.setAttribute("content", DESCRIPTION);

    return () => {
      document.title = previousTitle;
      if (createdMeta) {
        meta.remove();
      } else if (previousDescription !== null) {
        meta.setAttribute("content", previousDescription);
      }
    };
  }, []);

  if (loading) {
    return (
      <>
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center space-y-4">
            <Loader />
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A94E]">
              Loading Service Page...
            </p>
          </div>
        </div>
        <Navigation />
      </>
    );
  }

  return (
    <main className="relative w-full overflow-hidden bg-black text-white">
      <style>{`
        @keyframes avenzoBlobDrift {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(30px, -20px) scale(1.1); }
        }
        @keyframes avenzoMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .avenzo-blob { animation: avenzoBlobDrift 14s ease-in-out infinite; }
        .animate-marquee { display: flex; width: max-content; animation: avenzoMarquee 20s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
        html { scroll-behavior: smooth; }
      `}</style>

      <ScrollProgressBar />

      <Navigation />

      {/* ============ HERO ============ */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#0c0d0f] via-[#08090a] to-black pt-32 pb-20">
        <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
          <img
            src={logo}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-[center_30%] opacity-[0.08] mix-blend-screen"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="avenzo-blob pointer-events-none absolute right-0 top-1/4 z-[1] h-[450px] w-[450px] -translate-y-1/2 translate-x-1/4 rounded-full bg-[#D9A94E]/15 blur-[130px]" />
        <div className="avenzo-blob pointer-events-none absolute left-0 bottom-0 z-[1] h-[350px] w-[350px] -translate-x-1/3 rounded-full bg-[#4B4F57]/20 blur-[120px]" style={{ animationDelay: "2s" }} />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A94E]">Our Services</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Websites that get out of your customer's way
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            Avenzo Studio designs and builds custom websites, portfolios, e-commerce stores, and automated
            platforms using modern engineering stacks. Every project ships with complete source code and
            full client ownership.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="group relative inline-flex h-12 items-center justify-center rounded-full p-[1px] bg-gradient-to-r from-[#F3CE8E] via-[#D9A94E] to-[#8a6a2c] shadow-[0_6px_24px_rgba(217,169,78,0.3)] transition-all duration-300 hover:scale-105"
            >
              <span className="flex h-full w-full items-center justify-center rounded-full bg-black px-7 text-sm font-semibold text-[#F0C382] transition-colors duration-300 group-hover:bg-transparent group-hover:text-[#141008]">
                Book a call
              </span>
            </a>
          </div>

          <div ref={statsRef} className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 border-t border-white/10 pt-8">
            {STATS.map((stat) => (
              <StatCounter key={stat.label} value={stat.value} label={stat.label} start={statsInView} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRUSTED BY MARQUEE ============ */}
      <section className="relative w-full border-y border-white/10 bg-[#0B0C0E] py-8 overflow-hidden select-none">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D9A94E] mb-6">
          Trusted By Industry Partners & Enterprise Clients
        </p>
        <div className="w-full overflow-hidden flex">
          <div className="animate-marquee">
            <div className="flex shrink-0 items-center gap-16 px-8">
              {LOGO_MARQUEE.map((brand, i) => (
                <span key={`a-${i}`} className="text-sm font-extrabold uppercase tracking-widest text-neutral-400 hover:text-[#D9A94E] transition-colors whitespace-nowrap">
                  {brand}
                </span>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-16 px-8" aria-hidden="true">
              {LOGO_MARQUEE.map((brand, i) => (
                <span key={`b-${i}`} className="text-sm font-extrabold uppercase tracking-widest text-neutral-400 hover:text-[#D9A94E] transition-colors whitespace-nowrap">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMPANY OVERVIEW ============ */}
      <section className="relative w-full bg-black px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A94E]">Who We Are</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Avenzo Studio, in one paragraph</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            Founded in 2024, Avenzo Studio builds custom websites, portfolios, e-commerce stores, business platforms, and automated digital solutions around each client&apos;s real goals. Our capabilities span JavaScript, Python, C++, React, AI Integration, Node.js, Express.js, MongoDB, Firebase, Supabase, Prompt Engineering, AI Tools &amp; Workflows, Tailwind CSS, Bootstrap, Postman, Git &amp; GitHub, SEO, Website Optimization, Website Consulting, Blogging &amp; Content Writing, HTML, CSS, Django, and Database Design. We have delivered 10+ projects through a focused Discovery, Design, Development, and Launch process, with a 100% uptime guarantee, direct engineering communication, complete source-code ownership, and clean documentation for long-term maintenance.
          </p>
        </div>
      </section>

      {/* ============ SERVICES GRID ============ */}
      <section id="services-grid" className="relative w-full bg-black px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A94E]">What We Build</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">AVENZO STUDIO Services</h2>
            </div>
            <PillFilter options={SERVICE_CATEGORIES} active={serviceFilter} onChange={setServiceFilter} />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                isOpen={expandedService === service.id}
                onToggle={() => setExpandedService(expandedService === service.id ? null : service.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============ TECH STACK ============ */}
      <section className="relative w-full bg-[#0B0C0E] border-y border-white/10 px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A94E]">Our Stack</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">The tools behind every build</h2>
            </div>
            <PillFilter options={TECH_CATEGORIES} active={techFilter} onChange={setTechFilter} />
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTech.map((tech) => (
              <div
                key={tech.id}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-black px-5 py-4 transition-colors duration-200 hover:border-[#D9A94E]/50"
              >
                <span className="text-sm font-semibold text-white">{tech.label}</span>
                <span className="text-xs text-neutral-500">{tech.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ OUR PROCESS (interactive node-graph diagram) ============ */}
      <SecondSection />

      {/* ============ WHY CHOOSE US ============ */}
      <section className="relative w-full bg-[#0B0C0E] border-y border-white/10 px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A94E]">Why Avenzo Studio</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">What working with us actually looks like</h2>

          <div className="mt-10 space-y-3">
            {WHY_CHOOSE_US.map((item, index) => {
              const isOpen = openWhyIndex === index;
              const { Icon: WhyIcon } = item;
              const panelId = `why-panel-${item.id}`;
              return (
                <button
                  key={item.id}
                  onClick={() => setOpenWhyIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full rounded-2xl border border-white/10 bg-black p-6 text-left transition-colors duration-300 hover:border-[#D9A94E]/40"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D9A94E]/30 text-[#D9A94E]">
                        <WhyIcon className="h-4 w-4" />
                      </span>
                      <span className="font-bold text-white">{item.title}</span>
                    </div>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-[#D9A94E] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                  <div id={panelId} className={`grid transition-all duration-300 ${isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <p className="overflow-hidden text-sm leading-relaxed text-neutral-400">{item.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="relative w-full bg-black px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A94E]">Got Questions?</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Frequently Asked Questions</h2>
          </div>

          <div className="mt-14 space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              const panelId = `faq-panel-${index}`;
              return (
                <div key={index} className="rounded-2xl border border-white/10 bg-[#0B0C0E] overflow-hidden transition-all duration-300 hover:border-[#D9A94E]/40">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full p-6 text-left font-bold flex justify-between items-center text-white"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 text-[#D9A94E] transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div id={panelId} className="px-6 pb-6 text-sm text-neutral-300 leading-relaxed border-t border-white/10 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section id="contact" className="relative w-full overflow-hidden bg-gradient-to-b from-black to-[#0c0d0f] px-6 py-24 lg:px-10">
        <div className="avenzo-blob pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9A94E]/15 blur-[140px]" />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Let's build something great together</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-400">
            Tell us about your project and we'll get back to you with next steps.
          </p>
          <button
            type="button"
            className="group relative mt-8 inline-flex h-12 items-center justify-center rounded-full p-[1px] bg-gradient-to-r from-[#F3CE8E] via-[#D9A94E] to-[#8a6a2c] shadow-[0_6px_24px_rgba(217,169,78,0.3)] transition-all duration-300 hover:scale-105"
          >
            <span onClick={()=> navigate("/contact")}
             className="flex h-full w-full items-center justify-center rounded-full bg-black px-8 text-sm font-semibold text-[#F0C382] transition-colors duration-300 group-hover:bg-transparent group-hover:text-[#141008]">
              Book a call
            </span>
          </button>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
            <a href="#services-grid" className="font-medium text-neutral-400 underline-offset-4 transition-colors hover:text-[#D9A94E] hover:underline">
              View services
            </a>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <a href="#contact" className="font-medium text-neutral-400 underline-offset-4 transition-colors hover:text-[#D9A94E] hover:underline">
              Contact us
            </a>
          </div>
        </div>
      </section>

      {/* ============ SIXTH SECTION ============ */}
      <SixthSection />
    </main>
  );
}

function StatCounter({ value, label, start }) {
  const suffix = String(value).replace(/[0-9]/g, "");
  const count = useCountUp(value, start);
  return (
    <div>
      <div className="text-3xl font-extrabold text-[#D9A94E]">
        {count}
        {suffix}
      </div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wider text-neutral-400">{label}</div>
    </div>
  );
}