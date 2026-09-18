import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/avenzo-logo-transparent.png";
import Navigation from "../../components/navigation/navigation.jsx";
import Loader from "../../components/loader/loader.jsx";
import SixthSection from "../../components/homeComponents/sixthSection.jsx";


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
    >
      {children}
    </svg>
  );
}


const ROTATING_WORDS = ["custom", "e-commerce", "business"];

const STATS = [
  { value: "10+", label: "Projects delivered" },
  { value: "2+", label: "Years building software" },
  { value: "99.9%", label: "Uptime guarantee" },
];

const LOGO_MARQUEE = [
  "Nexus AI",
  "Apex Digital",
  "Starlight Media",
  "Hyperion Logistics",
  "Vortex Commerce",
  "Crestview Labs",
];

const FLOATING_BADGES = [
  { label: "React.js", top: "6%", left: "-8%", duration: 5, delay: 0 },
  { label: "Firebase", top: "68%", left: "-12%", duration: 6, delay: 0.6 },
  { label: "Supabase", top: "-6%", left: "62%", duration: 5.5, delay: 1.1 },
  { label: "JavaScript", top: "78%", left: "70%", duration: 6.5, delay: 0.3 },
];

const SHOWCASE_CARD_BASE_CLASSES =
  "absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0C0E] shadow-[0_30px_60px_rgba(0,0,0,0.6)]";
const SHOWCASE_CARD_HEADER_CLASSES =
  "flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-4 py-3";
const WINDOW_DOT_COLORS = ["#8a6a2c", "#4B4F57", "#2B2E33"];

function WindowDots() {
  return (
    <div className={SHOWCASE_CARD_HEADER_CLASSES}>
      {WINDOW_DOT_COLORS.map((color) => (
        <span key={color} className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
      ))}
    </div>
  );
}

function MissionCardContent() {
  return (
    <div className="relative flex h-[calc(100%-45px)] flex-col justify-end p-6 overflow-hidden group">
      <img
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
        alt="Team Collaboration"
        className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/70 to-transparent" />
      <div className="relative z-10 space-y-2">
        <div className="text-xs font-medium uppercase tracking-widest text-[#D9A94E]">Our mission</div>
        <p className="text-sm leading-relaxed text-neutral-200">
          Build websites teams can actually rely on — clean code, honest timelines, and full ownership handed back to the client.
        </p>
      </div>
    </div>
  );
}

function ServicesCardContent() {
  const items = ["Custom sites", "Portfolios", "E-commerce", "Business sites", "Automation"];
  return (
    <div className="relative flex h-[calc(100%-45px)] flex-col justify-end p-6 overflow-hidden group">
      <img
        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
        alt="Dashboard Services"
        className="absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/80 to-transparent" />
      <div className="relative z-10 space-y-2">
        <div className="text-xs font-medium uppercase tracking-widest text-[#D9A94E]">What we build</div>
        <ul className="grid grid-cols-2 gap-1.5">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs text-neutral-200">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D9A94E]" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StackCardContent() {
  const stack = ["HTML5", "CSS3", "JavaScript", "React.js", "Firebase", "Supabase"];
  return (
    <div className="relative flex h-[calc(100%-45px)] flex-col justify-end p-6 overflow-hidden group">
      <img
        src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
        alt="Engineering Stack"
        className="absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/80 to-transparent" />
      <div className="relative z-10 space-y-3">
        <div className="text-xs font-medium uppercase tracking-widest text-[#D9A94E]">Our stack</div>
        <div className="flex flex-wrap gap-1.5">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[#D9A94E]/30 bg-black/50 px-2.5 py-0.5 text-[10px] font-medium text-neutral-200 backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommitmentCardContent() {
  const commitments = ["100% code ownership", "NDA protected", "Direct communication"];
  return (
    <div className="relative flex h-[calc(100%-45px)] flex-col justify-end p-6 overflow-hidden group">
      <img
        src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
        alt="Commitment and Trust"
        className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/80 to-transparent" />
      <div className="relative z-10 space-y-2">
        <div className="text-xs font-medium uppercase tracking-widest text-[#D9A94E]">Our commitment</div>
        <ul className="space-y-1">
          {commitments.map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs text-neutral-200">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-[#D9A94E]" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const SHOWCASE_CARDS = [
  { id: "mission", delay: "0s", Content: MissionCardContent },
  { id: "services", delay: "3s", Content: ServicesCardContent },
  { id: "stack", delay: "6s", Content: StackCardContent },
  { id: "commitment", delay: "9s", Content: CommitmentCardContent },
];

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

const SERVICE_CATEGORIES = ["All", "Web", "Commerce", "Automation"];

const SERVICES = [
  {
    id: "custom",
    title: "Custom Websites",
    description: "Built around your business, not a template. Every structural and design decision starts from what your users actually need.",
    Icon: CustomSiteIcon,
    featured: true,
    category: "Web",
    metric: "100% Custom Code",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
    details: ["Discovery & wireframes before code", "Hand-coded, no page builder", "Full source handed over"],
  },
  {
    id: "portfolio",
    title: "Personal Portfolios",
    description: "Clean case studies and fast load times in a design that puts your work front and center.",
    Icon: PortfolioIcon,
    category: "Web",
    metric: "Sub-Second Loads",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    details: ["Case-study layout templates", "Sub-second load times", "Built-in contact form"],
  },
  {
    id: "ecommerce",
    title: "E-Commerce Websites",
    description: "Product catalogs, cart, and checkout built to handle real inventory and real customers.",
    Icon: CartIcon,
    category: "Commerce",
    metric: "Secure Checkouts",
    image: "https://images.unsplash.com/photo-1556742049-0a67dd604944?auto=format&fit=crop&w=600&q=80",
    details: ["Cart & checkout flow", "Inventory-ready product catalog", "Payment gateway integration"],
  },
  {
    id: "business",
    title: "Business Websites",
    description: "A site your company can point clients to with confidence — services, credibility, contact.",
    Icon: BriefcaseIcon,
    category: "Web",
    metric: "SEO Ready",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    details: ["Services & credibility pages", "Lead-capture contact forms", "SEO-ready structure"],
  },
  {
    id: "automation",
    title: "Automated Websites",
    description: "Forms that trigger emails, data that syncs to a database — manual steps, wired away.",
    Icon: AutomationIcon,
    category: "Automation",
    metric: "Instant Sync",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    details: ["Form-to-email automation", "Database sync on submit", "Custom admin dashboards"],
  },
];

const TECH_CATEGORIES = ["All", "Frontend", "Backend"];

const TECH_STACK = [
  { id: "html5", label: "HTML5", role: "Semantic markup", category: "Frontend" },
  { id: "css3", label: "CSS3", role: "Layout & motion", category: "Frontend" },
  { id: "javascript", label: "JavaScript", role: "Interactive logic", category: "Frontend" },
  { id: "react", label: "React.js", role: "Component UI", category: "Frontend" },
  { id: "firebase", label: "Firebase", role: "Auth & real-time data", category: "Backend" },
  { id: "supabase", label: "Supabase", role: "Postgres backend", category: "Backend" },
];

const FAQS = [
  {
    q: "Who owns the source code once the site is delivered?",
    a: "You retain 100% full ownership of all source code, design assets, and repository access upon project completion.",
  },
  {
    q: "How long does a typical project take from start to finish?",
    a: "Standard business and custom portfolio sites typically range from 2 to 4 weeks. E-commerce and custom web apps take 4 to 8 weeks depending on requirements.",
  },
  {
    q: "Do you offer post-launch support and ongoing maintenance?",
    a: "Yes. We offer continuous maintenance retainers for performance checks, security updates, content updates, and feature additions.",
  },
  {
    q: "How do we get started with a project proposal?",
    a: "Click 'Book a Call' or reach out through our contact form. We'll set up an initial discovery call to review your scope and provide a fixed quote.",
  },
];

const SpeedIcon = (props) => (
  <Icon {...props}>
    <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
  </Icon>
);

const OwnershipIcon = (props) => (
  <Icon {...props}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a4 4 0 0 1 8 0v2" />
  </Icon>
);

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

const WHY_CHOOSE_US = [
  {
    id: "speed",
    title: "Real engineering, not templates",
    description: "Every project is coded from scratch around your actual requirements — not a reskinned theme.",
    detail: "We start from your actual data model and user flows, not a pre-built theme's assumptions — so the site fits how your business really works.",
    Icon: SpeedIcon,
  },
  {
    id: "ownership",
    title: "You own everything",
    description: "Full source code handed over at the end. No vendor lock-in, no withheld files.",
    detail: "You get the full repository, hosting access, and documentation on delivery. Switch developers or hosts anytime with complete freedom.",
    Icon: OwnershipIcon,
  },
  {
    id: "communication",
    title: "Direct communication",
    description: "You talk to the person actually building your site — not an account manager relaying messages.",
    detail: "Questions get answered directly by our developers so project execution remains fast and clear.",
    Icon: ChatIcon,
  },
  {
    id: "maintain",
    title: "Built to last",
    description: "Clean, documented code that's easy for you or anyone else to maintain and extend later.",
    detail: "Structured modular code allows future developers to pick up and build new features without friction.",
    Icon: MaintainIcon,
  },
];

const MILESTONES = [
  {
    id: "founded",
    title: "Founded",
    description: "Started as a specialized development practice taking on custom web applications.",
    detail: "Avenzo Studio began as a dedicated engineering setup focused on delivering clean, hand-coded web applications.",
    stat: "2019",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "first-clients",
    title: "First Clients",
    description: "Delivered web solutions and platforms for growing enterprise clients.",
    detail: "Built early e-commerce stores, custom business platforms, and automated workflow sites.",
    stat: "6 clients",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "process",
    title: "Refined Pipeline",
    description: "Formalized four-stage engineering pipeline: discovery, design, development, launch.",
    detail: "Standardized modern component architectures, automated testing, and seamless continuous deployment pipelines.",
    stat: "4 stages",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "today",
    title: "Today",
    description: "Delivering modern web software for international clients.",
    detail: "Expanding long-term retainers and building custom applications across multiple modern tech stacks.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=400&q=80",
  },
];

const QualityIcon = (props) => (
  <Icon {...props}>
    <path d="M12 2 22 12 12 22 2 12z" />
    <path d="M9 12l2 2 4-4" />
  </Icon>
);

const TransparencyIcon = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v4l3 2" />
  </Icon>
);

const PartnershipIcon = (props) => (
  <Icon {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 1 0 7.75" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Icon>
);

const VALUES = [
  { id: "quality", title: "Quality-first engineering", description: "Clean, tested code — not just something that works once and breaks later.", Icon: QualityIcon, image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=80" },
  { id: "transparency", title: "Full transparency", description: "You always know what's being built, what's next, and why.", Icon: TransparencyIcon, image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=80" },
  { id: "ownership", title: "Complete code ownership", description: "Every line ships to you — no vendor lock-in, no withheld source.", Icon: OwnershipIcon, image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80" },
  { id: "partnership", title: "Long-term partnership", description: "We stick around after launch — support, iteration, and growth.", Icon: PartnershipIcon, image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=500&q=80" },
];


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

export default function About() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [statsInView, setStatsInView] = useState(false);
  const [techFilter, setTechFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [expandedService, setExpandedService] = useState(null);
  const [openWhyIndex, setOpenWhyIndex] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const statsRef = useRef(null);

  const filteredTech =
    techFilter === "All" ? TECH_STACK : TECH_STACK.filter((t) => t.category === techFilter);

  const filteredServices =
    serviceFilter === "All" ? SERVICES : SERVICES.filter((s) => s.category === serviceFilter);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;
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
  }, [isLoading]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prevTab) => (prevTab + 1) % VALUES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  if (isLoading) {
    return (
      <>
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center space-y-4">
            <Loader />
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A94E]">
              Loading About Page...
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
        @keyframes avenzoWordCycle {
          0%   { opacity: 0; transform: translateY(12px); }
          5%   { opacity: 1; transform: translateY(0); }
          28%  { opacity: 1; transform: translateY(0); }
          33%  { opacity: 0; transform: translateY(-12px); }
          100% { opacity: 0; }
        }
        @keyframes avenzoCardFade {
          0%   { opacity: 0; transform: scale(0.96) translateY(12px); z-index: 10; }
          4%   { opacity: 1; transform: scale(1) translateY(0); z-index: 10; }
          21%  { opacity: 1; transform: scale(1) translateY(0); z-index: 10; }
          25%  { opacity: 0; transform: scale(0.96) translateY(-12px); z-index: 0; }
          100% { opacity: 0; z-index: 0; }
        }
        @keyframes avenzoDot {
          0%   { background-color: rgba(255,255,255,0.2); width: 6px; }
          4%   { background-color: #D9A94E; width: 22px; }
          21%  { background-color: #D9A94E; width: 22px; }
          25%  { background-color: rgba(255,255,255,0.2); width: 6px; }
          100% { background-color: rgba(255,255,255,0.2); width: 6px; }
        }
        @keyframes avenzoFloatTilt {
          0%, 100% { transform: perspective(1200px) rotateY(-5deg) rotateX(2deg) translateY(0); }
          50%      { transform: perspective(1200px) rotateY(-5deg) rotateX(2deg) translateY(-12px); }
        }
        @keyframes avenzoBadgeFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes avenzoBlobDrift {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(30px, -20px) scale(1.1); }
        }
        @keyframes avenzoPulseGlow {
          0%, 100% { opacity: 0.4; }
          50%      { opacity: 0.8; }
        }
        @keyframes avenzoProgressBar {
          0%   { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes avenzoMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .avenzo-word-slide span { opacity: 0; animation: avenzoWordCycle 9s infinite; animation-fill-mode: backwards; }
        .avenzo-dot { animation: avenzoDot 12s infinite linear; }
        .avenzo-float-tilt { animation: avenzoFloatTilt 7s ease-in-out infinite; }
        .avenzo-badge { animation: avenzoBadgeFloat 5s ease-in-out infinite; }
        .avenzo-blob { animation: avenzoBlobDrift 14s ease-in-out infinite; }
        .avenzo-card-slide > div { opacity: 0; animation: avenzoCardFade 12s infinite linear; animation-fill-mode: backwards; }
        .avenzo-glow-[#D9A94E] { animation: avenzoPulseGlow 4s ease-in-out infinite; }
        .animate-progress { animation: avenzoProgressBar 4000ms linear infinite; }
        .animate-marquee { display: flex; width: max-content; animation: avenzoMarquee 20s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
      `}</style>

      <Navigation />

      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#0c0d0f] via-[#08090a] to-black pt-32 pb-24">
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

        <div className="avenzo-blob pointer-events-none absolute right-0 top-1/3 z-[1] h-[500px] w-[500px] -translate-y-1/2 translate-x-1/4 rounded-full bg-[#D9A94E]/15 blur-[130px]" />
        <div className="avenzo-blob pointer-events-none absolute left-0 bottom-0 z-[1] h-[400px] w-[400px] -translate-x-1/3 rounded-full bg-[#4B4F57]/20 blur-[120px]" style={{ animationDelay: "2s" }} />

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A94E]">
              About Avenzo Studio
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              We build{" "}
              <span className="avenzo-word-slide relative inline-block h-[1.15em] w-[10ch] align-bottom overflow-hidden text-[#D9A94E]">
                {ROTATING_WORDS.map((word, i) => (
                  <span key={word} className="absolute inset-0 flex items-center justify-start" style={{ animationDelay: `${i * 3}s` }}>
                    {word}
                  </span>
                ))}
              </span>
              <br />
              websites that work.
            </h1>

            <p className="mt-6 text-base leading-relaxed text-neutral-400 sm:text-lg">
              Avenzo Studio designs and builds custom websites, portfolios, e-commerce stores, and automated platforms using modern engineering stacks. Every project ships with complete source code and full client ownership.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group relative inline-flex h-12 items-center justify-center rounded-full p-[1px] bg-gradient-to-r from-[#F3CE8E] via-[#D9A94E] to-[#8a6a2c] shadow-[0_6px_24px_rgba(217,169,78,0.3)] transition-all duration-300 hover:scale-105"
              >
                <span className="flex h-full w-full items-center justify-center rounded-full bg-black px-7 text-sm font-semibold text-[#F0C382] transition-colors duration-300 group-hover:bg-transparent group-hover:text-[#141008]">
                  Get in touch
                </span>
              </a>
              <a
                href="#services"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-7 text-sm font-semibold text-neutral-200 transition-all duration-300 hover:border-[#D9A94E] hover:bg-white/5 hover:text-white"
              >
                See our services
              </a>
            </div>

            <div ref={statsRef} className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6 border-t border-white/10 pt-8">
              {STATS.map((stat) => (
                <StatCounter key={stat.label} value={stat.value} label={stat.label} start={statsInView} />
              ))}
            </div>
          </div>

          <div className="relative flex justify-center pb-20 lg:justify-end lg:pb-0">
            {FLOATING_BADGES.map((badge) => (
              <div
                key={badge.label}
                className="avenzo-badge absolute z-20 hidden rounded-xl border border-white/15 bg-[#0B0C0E]/80 px-4 py-2 text-xs font-bold text-[#F0C382] shadow-2xl backdrop-blur-md sm:block"
                style={{
                  top: badge.top,
                  left: badge.left,
                  animationDuration: `${badge.duration}s`,
                  animationDelay: `${badge.delay}s`,
                }}
              >
                {badge.label}
              </div>
            ))}

            <div className="avenzo-float-tilt relative w-full max-w-md">
              <div className="avenzo-card-slide relative aspect-[4/3] w-full">
                {SHOWCASE_CARDS.map(({ id, delay, Content }) => (
                  <div key={id} className={SHOWCASE_CARD_BASE_CLASSES} style={{ animationDelay: delay }}>
                    <WindowDots />
                    <Content />
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
              {SHOWCASE_CARDS.map((_, i) => (
                <span key={i} className="avenzo-dot h-1.5 w-1.5 rounded-full bg-white/20" style={{ animationDelay: `${i * 3}s` }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full border-y border-white/10 bg-[#0B0C0E] py-8 overflow-hidden select-none">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D9A94E] mb-6">
          Trusted By Industry Partners & Enterprise Clients
        </p>
        <div className="w-full overflow-hidden flex">
          <div className="animate-marquee">
            <div className="flex shrink-0 items-center gap-16 px-8">
              {LOGO_MARQUEE.map((brand, i) => (
                <span key={i} className="text-sm font-extrabold uppercase tracking-widest text-neutral-400 hover:text-[#D9A94E] transition-colors whitespace-nowrap">
                  {brand}
                </span>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-16 px-8" aria-hidden="true">
              {LOGO_MARQUEE.map((brand, i) => (
                <span key={`dup-${i}`} className="text-sm font-extrabold uppercase tracking-widest text-neutral-400 hover:text-[#D9A94E] transition-colors whitespace-nowrap">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="relative w-full bg-black px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A94E]">
              What We Build
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Five kinds of websites, one disciplined process
            </h2>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setServiceFilter(cat);
                  setExpandedService(null);
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                  serviceFilter === cat
                    ? "bg-[#D9A94E] text-black"
                    : "border border-white/15 text-neutral-400 hover:border-[#D9A94E]/50 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
            {filteredServices.map((service) => {
              const isOpen = expandedService === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setExpandedService(isOpen ? null : service.id)}
                  aria-expanded={isOpen}
                  className={
                    "group relative overflow-hidden rounded-2xl border bg-[#0B0C0E] text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(217,169,78,0.15)] " +
                    (isOpen ? "border-[#D9A94E]/70 shadow-[0_15px_35px_rgba(217,169,78,0.2)]" : "border-white/10 hover:border-[#D9A94E]/50") +
                    " " +
                    (service.featured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[380px]" : "min-h-[260px]")
                  }
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-25 transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/80 to-transparent" />

                  <div className="relative z-10 flex h-full flex-col justify-end p-7">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D9A94E]/20 text-[#D9A94E] backdrop-blur-md border border-[#D9A94E]/30">
                        <service.Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full border border-[#D9A94E]/40 bg-black/60 px-3 py-1 text-[10px] font-semibold text-[#F0C382] backdrop-blur-md">
                        {service.metric}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-white group-hover:text-[#D9A94E] transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                      {service.description}
                    </p>

                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <ul className="space-y-1.5 overflow-hidden">
                        {service.details.map((d) => (
                          <li key={d} className="flex items-start gap-2 text-xs text-neutral-300">
                            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[#D9A94E]" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#D9A94E]">
                      {isOpen ? "Hide details" : "See what's included"}
                      <svg
                        viewBox="0 0 24 24"
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative w-full bg-gradient-to-b from-black via-[#0a0b0d] to-black px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A94E]">
              How We Build It
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              A modern, dependable tech stack
            </h2>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {TECH_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setTechFilter(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                  techFilter === cat
                    ? "bg-[#D9A94E] text-black"
                    : "border border-white/15 text-neutral-400 hover:border-[#D9A94E]/50 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {filteredTech.map((tech) => (
              <div
                key={tech.id}
                className="group relative flex flex-col items-center rounded-2xl border border-white/10 bg-[#0B0C0E]/80 p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[#D9A94E]/60 hover:bg-[#12141a]"
              >
                <div className="avenzo-glow-[#D9A94E] flex h-14 w-14 items-center justify-center rounded-full border border-[#D9A94E]/40 bg-[#D9A94E]/10 text-base font-extrabold text-[#D9A94E] shadow-[0_0_20px_rgba(217,169,78,0.2)]">
                  {tech.label.slice(0, 2).toUpperCase()}
                </div>
                <div className="mt-4 text-sm font-bold text-white group-hover:text-[#D9A94E]">{tech.label}</div>
                <div className="mt-1 text-xs text-neutral-400">{tech.role}</div>

                <div className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg border border-[#D9A94E]/30 bg-black px-3 py-1.5 text-[11px] font-medium text-[#F0C382] opacity-0 shadow-xl transition-opacity duration-300 group-hover:opacity-100">
                  {tech.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full bg-gradient-to-b from-black via-[#0a0b0d] to-black px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A94E]">
              How We Got Here
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              A company built one shipped project at a time
            </h2>
          </div>

          <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-white/10 bg-[#0B0C0E] p-8 text-center sm:p-10">
            {MILESTONES[activeMilestone].stat && (
              <span className="text-xs font-mono font-bold text-[#D9A94E]">{MILESTONES[activeMilestone].stat}</span>
            )}
            <h3 className="mt-2 text-2xl font-bold text-white">{MILESTONES[activeMilestone].title}</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-neutral-400">
              {MILESTONES[activeMilestone].detail}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MILESTONES.map((m, i) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setActiveMilestone(i)}
                aria-pressed={activeMilestone === i}
                className={`group relative overflow-hidden rounded-2xl border bg-[#0B0C0E] text-left transition-all duration-300 hover:-translate-y-2 ${
                  activeMilestone === i ? "border-[#D9A94E] shadow-[0_15px_35px_rgba(217,169,78,0.2)]" : "border-white/10 hover:border-[#D9A94E]/50"
                }`}
              >
                <div className="h-40 w-full overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.title}
                    className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                      activeMilestone === i ? "opacity-80" : "opacity-60"
                    }`}
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-mono font-bold text-[#D9A94E]">0{i + 1}.</span>
                  <h3 className="mt-1 text-lg font-bold text-white">{m.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-400">{m.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full bg-black px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A94E]">
              What We Stand For
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              The core principles behind every build
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div
              className="lg:col-span-5 space-y-3"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {VALUES.map((val, idx) => (
                <button
                  key={val.id}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-500 flex items-center justify-between ${
                    activeTab === idx
                      ? "border-[#D9A94E] bg-[#0B0C0E] shadow-[0_0_20px_rgba(217,169,78,0.15)] text-white scale-[1.02]"
                      : "border-white/10 bg-transparent text-neutral-400 hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <val.Icon className="h-5 w-5 text-[#D9A94E]" />
                    <span className="text-sm font-semibold">{val.title}</span>
                  </div>
                  <span className="text-xs text-[#D9A94E] font-mono">0{idx + 1}</span>
                </button>
              ))}
            </div>

            <div
              className="lg:col-span-7"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/15 bg-[#0B0C0E] shadow-2xl">
                <img
                  key={VALUES[activeTab].id}
                  src={VALUES[activeTab].image}
                  alt={VALUES[activeTab].title}
                  className="h-full w-full object-cover opacity-40 transition-all duration-700 ease-in-out scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/60 to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-8 space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D9A94E] text-black">
                    {React.createElement(VALUES[activeTab].Icon, { className: "h-5 w-5" })}
                  </div>
                  <h3 className="text-2xl font-bold text-white transition-opacity duration-500">
                    {VALUES[activeTab].title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-300 max-w-md transition-opacity duration-500">
                    {VALUES[activeTab].description}
                  </p>
                </div>

                <div className="absolute top-0 left-0 h-1 bg-white/10 w-full">
                  <div
                    key={activeTab + (isPaused ? "-paused" : "-active")}
                    className={`h-full bg-[#D9A94E] ${isPaused ? "w-full" : "animate-progress"}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-gradient-to-b from-black via-[#0a0b0d] to-black px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A94E]">
              Why Avenzo Studio
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              What working with us actually looks like
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {WHY_CHOOSE_US.map((item, idx) => {
              const isOpen = openWhyIndex === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setOpenWhyIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className={`flex w-full gap-5 rounded-2xl border p-6 text-left transition-all duration-300 ${
                    isOpen ? "border-[#D9A94E]/60 bg-[#0B0C0E]" : "border-white/10 bg-[#0B0C0E] hover:border-[#D9A94E]/40"
                  }`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D9A94E]/10 text-[#D9A94E]">
                    <item.Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base font-bold text-white">{item.title}</h3>
                      <svg
                        viewBox="0 0 24 24"
                        className={`h-4 w-4 shrink-0 text-[#D9A94E] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-400">{item.description}</p>
                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <p className="overflow-hidden border-t border-white/10 pt-3 text-sm leading-relaxed text-neutral-300">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative w-full bg-black px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A94E]">
              Got Questions?
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-14 space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="rounded-2xl border border-white/10 bg-[#0B0C0E] overflow-hidden transition-all duration-300 hover:border-[#D9A94E]/40">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-6 text-left font-bold flex justify-between items-center text-white"
                  >
                    <span>{faq.q}</span>
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-5 w-5 text-[#D9A94E] transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-neutral-300 leading-relaxed border-t border-white/10 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="relative w-full overflow-hidden bg-gradient-to-b from-black to-[#0c0d0f] px-6 py-24 lg:px-10">
        <div className="avenzo-blob pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9A94E]/15 blur-[140px]" />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Let's build something great together</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-400">
            Tell us about your project and we'll get back to you with next steps.
          </p>
          <a
            href="#"
            className="group relative mt-8 inline-flex h-12 items-center justify-center rounded-full p-[1px] bg-gradient-to-r from-[#F3CE8E] via-[#D9A94E] to-[#8a6a2c] shadow-[0_6px_24px_rgba(217,169,78,0.3)] transition-all duration-300 hover:scale-105"
          >
            <span className="flex h-full w-full items-center justify-center rounded-full bg-black px-8 text-sm font-semibold text-[#F0C382] transition-colors duration-300 group-hover:bg-transparent group-hover:text-[#141008]">
              Book a call
            </span>
          </a>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
            <a href="#services" className="font-medium text-neutral-400 underline-offset-4 transition-colors hover:text-[#D9A94E] hover:underline">
              View pricing
            </a>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <a href="#contact" className="font-medium text-neutral-400 underline-offset-4 transition-colors hover:text-[#D9A94E] hover:underline">
              Contact us
            </a>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <a href="#services" className="font-medium text-neutral-400 underline-offset-4 transition-colors hover:text-[#D9A94E] hover:underline">
              See our work
            </a>
          </div>
        </div>
      </section>

      <SixthSection />
    </main>
  );
}