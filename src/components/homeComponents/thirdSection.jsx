import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

/**
 * Enhanced Section — Capabilities View
 * Displays all capabilities continuously without category or item filter buttons.
 */

/* ---------- Shared SVG Icon Primitives ---------- */

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

const Code2Icon = (props) => (
  <Icon {...props}>
    <path d="m18 16 4-4-4-4" />
    <path d="m6 8-4 4 4 4" />
    <path d="m14.5 4-5 16" />
  </Icon>
);

const LayersIcon = (props) => (
  <Icon {...props}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </Icon>
);

const DatabaseIcon = (props) => (
  <Icon {...props}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </Icon>
);

const TableIcon = (props) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M3 9h18" />
    <path d="M3 15h18" />
    <path d="M9 3v18" />
  </Icon>
);

const GitHubIcon = (props) => (
  <Icon {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </Icon>
);

const SparklesIcon = (props) => (
  <Icon {...props}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4M3 5h4M19 17v4M17 19h4" />
  </Icon>
);

const CheckCircleIcon = (props) => (
  <Icon {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </Icon>
);

const ArrowRightIcon = (props) => (
  <Icon {...props}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Icon>
);

const XIcon = (props) => (
  <Icon {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </Icon>
);

/* ---------- Core Services & Specific Stack Data ---------- */

const CORE_ITEMS = [
  {
    id: "business-website",
    name: "Business Website",
    metric: "High Converting",
    Icon: TableIcon,
    color: "text-[#D9A94E]",
    highlight: true,
    description: "Professional corporate and small business websites built to generate leads, convey authority, and elevate brand image.",
    deliverables: ["Custom Layout & Branding", "Contact Form & Lead Capture", "Mobile-Optimized Experience"],
    caseStudy: "Built modern online presence that increased lead generation by 40%."
  },
  {
    id: "ecommerce-website",
    name: "E-Commerce Website",
    metric: "Seamless Checkout",
    Icon: LayersIcon,
    color: "text-[#38BDF8]",
    highlight: true,
    description: "Fully featured online stores tailored for fast product browsing, secure checkout systems, and high conversions.",
    deliverables: ["Product Catalog Management", "Payment Gateway Integration", "Shopping Cart Workflows"],
    caseStudy: "Designed custom store experience with optimized mobile checkout flows."
  },
  {
    id: "custom-website",
    name: "Custom Website",
    metric: "Tailored Logic",
    Icon: Code2Icon,
    color: "text-[#8E75FF]",
    highlight: false,
    description: "Bespoke web development built from scratch to meet unique company requirements and workflows.",
    deliverables: ["Custom Frontend Components", "Scalable System Architecture", "Tailored User Dashboards"],
    caseStudy: "Engineered unique digital platform tailored specifically to client operations."
  },
  {
    id: "personal-portfolio",
    name: "Personal Portfolio",
    metric: "Stand Out Online",
    Icon: SparklesIcon,
    color: "text-[#FC6D26]",
    highlight: false,
    description: "Sleek, interactive portfolio websites designed for creators, executives, and professionals to showcase their work.",
    deliverables: ["Interactive Case Studies", "Custom Animations", "Resume & Project Showcase"],
    caseStudy: "Crafted personal brand site that helped client secure high-ticket deals."
  },
  {
    id: "automated-website",
    name: "Automate Website",
    metric: "Smart Automation",
    Icon: SparklesIcon,
    color: "text-[#18BFFF]",
    highlight: false,
    description: "Automated site features integrating forms, booking tools, webhooks, and third-party workflow triggers.",
    deliverables: ["Automated Form Submissions", "Third-Party Webhook Sync", "CRM & Notification Triggers"],
    caseStudy: "Automated client onboarding workflow directly through custom web forms."
  },
  {
    id: "api-integration",
    name: "API Integration",
    metric: "Real-Time Sync",
    Icon: DatabaseIcon,
    color: "text-[#5E6AD2]",
    highlight: false,
    description: "Connecting web platforms with external REST APIs, backend services, payment providers, and databases.",
    deliverables: ["RESTful API Connections", "Secure Data Fetching", "Dynamic Content Rendering"],
    caseStudy: "Integrated third-party APIs to deliver real-time data sync across platforms."
  },
  {
    id: "html5-css3",
    name: "HTML5 & CSS3",
    metric: "Semantic & Modern",
    Icon: Code2Icon,
    color: "text-[#E34F26]",
    highlight: false,
    description: "Clean, accessible HTML5 structure combined with modern CSS3 layout engines like Flexbox and Grid.",
    deliverables: ["W3C Validated HTML5", "Modern CSS Grid & Flexbox", "Cross-Browser Compatibility"],
    caseStudy: "Delivered lightweight, accessible semantic markup for maximum performance."
  },
  {
    id: "javascript",
    name: "JavaScript ES6+",
    metric: "Dynamic Logic",
    Icon: Code2Icon,
    color: "text-[#F7DF1E]",
    highlight: false,
    description: "Core programming powering interactive elements, DOM manipulation, asynchronous fetching, and complex logic.",
    deliverables: ["ES6+ Modern Syntax", "Async/Await API Requests", "Interactive DOM Scripting"],
    caseStudy: "Created dynamic user interfaces driven by custom client-side scripts."
  },
  {
    id: "react",
    name: "React Development",
    metric: "Component-Based",
    Icon: Code2Icon,
    color: "text-[#61DAFB]",
    highlight: true,
    description: "Building fast, reactive single-page applications and modular UI component libraries with React.",
    deliverables: ["Reusable UI Components", "State Management Setup", "Fast Virtual DOM Rendering"],
    caseStudy: "Built high-speed interactive web dashboard using modular React components."
  },
  {
    id: "tailwind-css",
    name: "Tailwind CSS & Libraries",
    metric: "Utility-First",
    Icon: LayersIcon,
    color: "text-[#38BDF8]",
    highlight: false,
    description: "Rapid, highly customizable UI styling powered by Tailwind CSS alongside modern UI component libraries.",
    deliverables: ["Tailwind Utility Styling", "Custom Theme Config", "UI Library Integration"],
    caseStudy: "Accelerated development timeline while keeping UI code clean and consistent."
  },
  {
    id: "responsive-design",
    name: "Responsive Design",
    metric: "All-Device Support",
    Icon: TableIcon,
    color: "text-[#107C41]",
    highlight: false,
    description: "Ensuring every website looks and functions flawlessly across mobile phones, tablets, and desktop displays.",
    deliverables: ["Mobile-First Approach", "Fluid Breakpoints", "Touch-Friendly Layouts"],
    caseStudy: "Achieved 100% responsive score across mobile, tablet, and desktop viewports."
  },
  {
    id: "firebase-backend",
    name: "Firebase Backend",
    metric: "Realtime Database",
    Icon: DatabaseIcon,
    color: "text-[#FFCA28]",
    highlight: false,
    description: "Backend-as-a-Service integration for user authentication, real-time database storage, and cloud functions.",
    deliverables: ["User Authentication", "Firestore / Realtime DB", "Cloud Hosting Setup"],
    caseStudy: "Configured secure Firebase authentication and real-time database syncing."
  },
  {
    id: "git-github",
    name: "Git & GitHub",
    metric: "Version Control",
    Icon: GitHubIcon,
    color: "text-[#F05032]",
    highlight: false,
    description: "Professional source code management, version control, branching strategies, and repository hosting.",
    deliverables: ["Version Control Tracking", "Clean Branch Management", "GitHub Repository Setup"],
    caseStudy: "Maintained structured, well-documented codebases for seamless collaboration."
  }
];

const SKILL_ITEMS = [
  ["JavaScript", "Dynamic Logic", "Interactive web applications with modern, maintainable JavaScript.", "ES6+ application logic"],
  ["Python", "Versatile Backend", "Reliable Python solutions for automation, data workflows, and web applications.", "Python application development"],
  ["C++", "High Performance", "Efficient C++ development for performance-focused software and systems.", "Performance-focused programming"],
  ["React", "Component UI", "Fast, reusable interfaces and scalable React application architecture.", "Reusable React component systems"],
  ["AI Integration", "Connected AI Features", "Practical AI capabilities integrated into websites, products, and business workflows.", "Purpose-built AI product integration"],
  ["Node.js", "Server-Side JavaScript", "Scalable backend services and real-time application infrastructure with Node.js.", "Production-ready Node.js services"],
  ["Express.js", "API Development", "Clean, secure REST APIs and backend routing built with Express.js.", "Structured Express.js API design"],
  ["MongoDB", "Document Database", "Flexible document data models designed for reliable application growth.", "Scalable MongoDB data structures"],
  ["Firebase", "Realtime Backend", "Authentication, real-time data, cloud functions, and hosting through Firebase.", "Secure Firebase integrations"],
  ["Supabase", "Postgres Backend", "Modern database, authentication, storage, and API workflows with Supabase.", "Supabase-powered application backends"],
  ["Prompt Engineering", "AI Instruction Design", "Clear, reliable prompts designed for consistent and useful AI output.", "Purpose-built prompt systems"],
  ["AI Tools & Workflows", "Practical AI Automation", "AI-assisted workflows that reduce repetitive work and improve delivery speed.", "Connected AI workflow automation"],
  ["Tailwind CSS", "Utility-First Styling", "Fast, consistent, and responsive interface styling with Tailwind CSS.", "Scalable Tailwind design systems"],
  ["Bootstrap", "Responsive UI Framework", "Reliable responsive layouts and interface components built with Bootstrap.", "Responsive Bootstrap interfaces"],
  ["Postman", "API Testing", "Thorough API testing and documentation for dependable integrations and backend services.", "Verified API request workflows"],
  ["Git & GitHub", "Version Control", "Organized source control, collaboration, and delivery workflows with Git and GitHub.", "Structured GitHub repositories"],
  ["SEO", "Search Visibility", "Technical and content foundations that help websites earn relevant search traffic.", "Search-ready website structure"],
  ["Website Optimization", "Speed & Conversion", "Performance, accessibility, and conversion improvements for stronger user experiences.", "Measured website performance improvements"],
  ["Website Consulting", "Technical Direction", "Practical guidance for choosing the right website strategy, tools, and architecture.", "Clear technical recommendations"],
  ["Blogging & Content Writing", "Content That Connects", "Useful, structured content that communicates expertise and supports growth.", "Audience-focused written content"],
  ["HTML", "Semantic Structure", "Accessible, search-friendly markup that gives every page a strong foundation.", "Semantic HTML implementation"],
  ["CSS", "Responsive Styling", "Responsive layouts and polished visual systems built for every screen size.", "Responsive CSS systems"],
  ["Django", "Python Web Framework", "Structured Django applications with maintainable models, views, and workflows.", "Django web application foundations"],
  ["Database Design", "Data Architecture", "Clear, scalable data models designed around real product requirements.", "Future-ready database schemas"],
].map(([name, metric, description, caseStudy], index) => ({
  id: `skill-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  name,
  metric,
  Icon: name === "Database Design" || name === "MongoDB" || name === "Firebase" || name === "Supabase" ? DatabaseIcon : Code2Icon,
  color: index < 4 ? "text-[#D9A94E]" : "text-[#38BDF8]",
  highlight: index < 4,
  description,
  deliverables: ["Professional implementation", "Maintainable architecture", "Production-ready delivery"],
  caseStudy,
}));

const ALL_ITEMS = [...SKILL_ITEMS, ...CORE_ITEMS];

export default function CapabilitiesSection() {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const row1 = ALL_ITEMS.slice(0, Math.ceil(ALL_ITEMS.length / 2));
  const row2 = ALL_ITEMS.slice(Math.ceil(ALL_ITEMS.length / 2));

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-black via-[#08090a] to-[#0c0d0f] py-28 px-6 lg:px-10">
      <style>{`
        @keyframes avenzoMarqueeLeft {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes avenzoMarqueeRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        @keyframes avenzoGlowPulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50%      { opacity: 0.28; transform: scale(1.08); }
        }
        .avenzo-track-left {
          animation: avenzoMarqueeLeft 35s linear infinite;
        }
        .avenzo-track-right {
          animation: avenzoMarqueeRight 35s linear infinite;
        }
        .avenzo-glow-pulse {
          animation: avenzoGlowPulse 8s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .avenzo-track-left, .avenzo-track-right {
            animation: none;
          }
        }
      `}</style>

      {/* Background Grid Pattern & Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none">
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="avenzo-glow-pulse absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9A94E]/15 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D9A94E]/30 bg-[#D9A94E]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#D9A94E]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D9A94E] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D9A94E]"></span>
            </span>
            Capabilities &amp; Expertise
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Custom Web Development Solutions
          </h2>
          <p className="mt-6 text-base text-neutral-400 sm:text-lg lg:text-xl">
            Click on any item below to explore detailed specifications, deliverables, and features.
          </p>
        </div>

        {/* Continuous Marquee Slider */}
        <div className="avenzo-marquee-container relative mt-16 overflow-hidden py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-black via-black/80 to-transparent sm:w-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-black via-black/80 to-transparent sm:w-40" />

          {/* Row 1 — Left Track */}
          <div className="flex w-max overflow-hidden py-3">
            <div className="avenzo-track-left flex gap-4 sm:gap-6">
              {[...row1, ...row1, ...row1, ...row1].map((item, idx) => (
                <button
                  key={`r1-${item.id}-${idx}`}
                  onClick={() => setSelectedItem(item)}
                  className={`group relative flex h-24 w-64 shrink-0 text-left items-center gap-4 rounded-2xl border px-4 transition-all duration-300 sm:h-28 sm:w-72 sm:px-5 ${
                    item.highlight
                      ? "border-[#D9A94E]/50 bg-[#1e1710] shadow-[0_0_25px_rgba(217,169,78,0.25)] hover:scale-[1.02]"
                      : "border-white/10 bg-[#0E0F12]/90 hover:border-[#D9A94E]/40 hover:bg-[#15171C] hover:scale-[1.02]"
                  }`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 sm:h-12 sm:w-12">
                    <item.Icon className={`h-6 w-6 sm:h-7 sm:w-7 ${item.color} transition-transform duration-300 group-hover:scale-110`} />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="truncate text-sm sm:text-base font-semibold text-white group-hover:text-[#D9A94E] transition-colors">
                      {item.name}
                    </h3>
                    <span className="mt-1 inline-block rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-[#D9A94E]">
                      {item.metric}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Row 2 — Right Track */}
          <div className="flex w-max overflow-hidden py-3">
            <div className="avenzo-track-right flex gap-4 sm:gap-6">
              {[...row2, ...row2, ...row2, ...row2].map((item, idx) => (
                <button
                  key={`r2-${item.id}-${idx}`}
                  onClick={() => setSelectedItem(item)}
                  className={`group relative flex h-24 w-64 shrink-0 text-left items-center gap-4 rounded-2xl border px-4 transition-all duration-300 sm:h-28 sm:w-72 sm:px-5 ${
                    item.highlight
                      ? "border-[#D9A94E]/50 bg-[#1e1710] shadow-[0_0_25px_rgba(217,169,78,0.25)] hover:scale-[1.02]"
                      : "border-white/10 bg-[#0E0F12]/90 hover:border-[#D9A94E]/40 hover:bg-[#15171C] hover:scale-[1.02]"
                  }`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 sm:h-12 sm:w-12">
                    <item.Icon className={`h-6 w-6 sm:h-7 sm:w-7 ${item.color} transition-transform duration-300 group-hover:scale-110`} />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="truncate text-sm sm:text-base font-semibold text-white group-hover:text-[#D9A94E] transition-colors">
                      {item.name}
                    </h3>
                    <span className="mt-1 inline-block rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-[#D9A94E]">
                      {item.metric}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action & Conversion Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-[#0e0f12]/80 p-6 sm:flex-row sm:p-8 backdrop-blur-md">
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-bold text-white sm:text-xl">Need a tailored web solution?</h4>
            <p className="mt-1 text-sm text-neutral-400">Let's discuss your project requirements and custom build your vision.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button onClick={()=> navigate("/contact")} className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#D9A94E] px-6 py-3.5 text-sm font-semibold text-black transition-all hover:bg-[#c4953c] shadow-[0_0_20px_rgba(217,169,78,0.3)]">
              <span>Start Your Project</span>
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Detail Modal Drawer */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all">
          <div className="relative w-full max-w-lg rounded-3xl border border-[#D9A94E]/30 bg-[#121318] p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)]">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute right-5 top-5 rounded-full bg-white/5 p-2 text-neutral-400 hover:bg-white/10 hover:text-white"
            >
              <XIcon className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
                <selectedItem.Icon className={`h-7 w-7 ${selectedItem.color}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedItem.name}</h3>
                <span className="text-xs text-[#D9A94E] font-medium">{selectedItem.metric}</span>
              </div>
            </div>

            <p className="mt-4 text-sm text-neutral-300 leading-relaxed">
              {selectedItem.description}
            </p>

            <div className="mt-6 rounded-2xl bg-white/5 p-4 border border-white/5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#D9A94E]">Key Highlight</span>
              <p className="mt-1 text-sm font-medium text-white">{selectedItem.caseStudy}</p>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Core Deliverables</h4>
              <ul className="mt-3 space-y-2">
                {selectedItem.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircleIcon className="h-4 w-4 text-[#D9A94E] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setSelectedItem(null)}
                className="flex-1 rounded-xl bg-[#D9A94E] py-3 text-center text-sm font-semibold text-black transition-all hover:bg-[#c4953c]"
              >
                Inquire About This Capability
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}