import logo from "../../assets/avenzo-logo-transparent.png";

const ROTATING_WORDS = ["scalable", "reliable", "modern"];

const STATS = [
  { value: "10+", label: "Projects delivered" },
  { value: "2+", label: "Years building software" },
];

const TECH_STACK = [
  "JavaScript", "Python", "C++", "React", "AI Integration", "Node.js", "Express.js", "MongoDB",
  "Firebase", "Supabase", "Prompt Engineering", "AI Tools & Workflows", "Tailwind CSS", "Bootstrap",
  "Postman", "Git & GitHub", "SEO",
  "Website Optimization", "Website Consulting", "Blogging & Content Writing", "HTML",
  "CSS", "Django", "Database Design"
];

const FLOATING_BADGES = [
  { label: "JavaScript", top: "-6%", left: "62%", duration: 5.5, delay: 0 },
  { label: "Python", top: "68%", left: "-12%", duration: 6, delay: 0.6 },
  { label: "C++", top: "78%", left: "70%", duration: 6.5, delay: 0.3 },
  { label: "React", top: "6%", left: "-8%", duration: 5, delay: 1.1 },
];

const METRIC_BARS = [0.4, 0.75, 0.5, 0.9, 0.35, 0.65];

const SHOWCASE_CARD_BASE_CLASSES =
  "absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0C0E] shadow-[0_30px_60px_rgba(0,0,0,0.6)]";
const SHOWCASE_CARD_HEADER_CLASSES =
  "flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-4 py-3";
const WINDOW_DOT_COLORS = ["#8a6a2c", "#4B4F57", "#2B2E33"];

/** Traffic-light window dots shown at the top of every showcase card. */
function WindowDots() {
  return (
    <div className={SHOWCASE_CARD_HEADER_CLASSES}>
      {WINDOW_DOT_COLORS.map((color) => (
        <span key={color} className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
      ))}
    </div>
  );
}

/** Card 1 — terminal / build log mockup. */
function TerminalCardContent() {
  return (
    <div className="space-y-2 p-5 font-mono text-[13px] leading-relaxed text-neutral-300">
      <p className="text-neutral-500">$ npm run build</p>
      <p>
        compiling modules<span className="text-[#D9A94E]">...</span>
      </p>
      <p className="text-neutral-500">optimizing assets</p>
      <p className="text-[#D9A94E]">build complete ✓</p>
      <p className="text-neutral-500">$ deployed to production</p>
    </div>
  );
}

/** Card 2 — code editor mockup. */
function CodeCardContent() {
  return (
    <div className="grid grid-cols-[2rem_1fr] gap-x-3 p-5 font-mono text-[13px] leading-relaxed">
      <div className="space-y-1.5 text-right text-neutral-600">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
      </div>
      <div className="space-y-1.5 text-neutral-300">
        <p>
          <span className="text-[#8a9dbf]">function</span> <span className="text-[#D9A94E]">deploy</span>() {"{"}
        </p>
        <p className="pl-4">
          <span className="text-[#8a9dbf]">const</span> build = run();
        </p>
        <p className="pl-4">
          <span className="text-[#8a9dbf]">if</span> (build.ok) {"{"}
        </p>
        <p className="pl-8">ship(build);</p>
        <p>{"}"}</p>
      </div>
    </div>
  );
}

/** Card 3 — architecture / network graph mockup. */
function ArchitectureCardContent() {
  return (
    <div className="flex h-[calc(100%-45px)] items-center justify-center p-6">
      <svg viewBox="0 0 220 140" className="h-full w-full">
        <g stroke="#3a3d43" strokeWidth="1.5" fill="none">
          <line x1="30" y1="70" x2="110" y2="30" />
          <line x1="30" y1="70" x2="110" y2="110" />
          <line x1="110" y1="30" x2="190" y2="70" />
          <line x1="110" y1="110" x2="190" y2="70" />
          <line x1="110" y1="30" x2="110" y2="110" />
        </g>
        <circle cx="30" cy="70" r="8" fill="#2B2E33" stroke="#D9A94E" strokeWidth="1.5" />
        <circle cx="110" cy="30" r="8" fill="#D9A94E" />
        <circle cx="110" cy="110" r="8" fill="#2B2E33" stroke="#D9A94E" strokeWidth="1.5" />
        <circle cx="190" cy="70" r="8" fill="#D9A94E" />
      </svg>
    </div>
  );
}

/** Card 4 — animated metrics / bar chart mockup. */
function MetricsCardContent() {
  return (
    <div className="flex h-[calc(100%-45px)] items-end justify-center gap-3 px-8 pb-6">
      {METRIC_BARS.map((height, i) => (
        <span
          key={i}
          className="avenzo-bar w-6 rounded-t-sm bg-gradient-to-t from-[#8a6a2c] to-[#F3CE8E]"
          style={{ height: "100%", transform: `scaleY(${height})`, animationDelay: `${i * 0.25}s` }}
        />
      ))}
    </div>
  );
}

const SHOWCASE_CARDS = [
  { id: "terminal", delay: "0s", Content: TerminalCardContent },
  { id: "code", delay: "3s", Content: CodeCardContent },
  { id: "architecture", delay: "6s", Content: ArchitectureCardContent },
  { id: "metrics", delay: "9s", Content: MetricsCardContent },
];

export default function FirstSection() {
  return (
    <section className="avenzo-hero relative w-full overflow-hidden bg-gradient-to-b from-[#0c0d0f] via-[#08090a] to-black">
      <style>{`
        @keyframes avenzoWordCycle {
          0%   { opacity: 0; transform: translateY(10px); }
          4%   { opacity: 1; transform: translateY(0); }
          28%  { opacity: 1; transform: translateY(0); }
          33%  { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 0; }
        }
        @keyframes avenzoCardFade {
          0%   { opacity: 0; transform: scale(0.97) translateY(10px); }
          3%   { opacity: 1; transform: scale(1) translateY(0); }
          22%  { opacity: 1; transform: scale(1) translateY(0); }
          25%  { opacity: 0; transform: scale(0.97) translateY(-10px); }
          100% { opacity: 0; }
        }
        @keyframes avenzoDot {
          0%   { background-color: rgba(255,255,255,0.15); width: 6px; }
          3%   { background-color: #D9A94E; width: 22px; }
          22%  { background-color: #D9A94E; width: 22px; }
          25%  { background-color: rgba(255,255,255,0.15); width: 6px; }
          100% { background-color: rgba(255,255,255,0.15); width: 6px; }
        }
        @keyframes avenzoFloatTilt {
          0%, 100% { transform: perspective(1400px) rotateY(-6deg) rotateX(3deg) translateY(0); }
          50%      { transform: perspective(1400px) rotateY(-6deg) rotateX(3deg) translateY(-14px); }
        }
        @keyframes avenzoBadgeFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-14px) rotate(2deg); }
        }
        @keyframes avenzoBlobDrift {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(26px,-18px) scale(1.08); }
        }
        @keyframes avenzoBarPulse {
          0%, 100% { transform: scaleY(0.3); }
          50%      { transform: scaleY(1); }
        }
        @keyframes avenzoFadeUp {
          0%   { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes avenzoMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes avenzoLogoShadeBreathe {
          0%, 100% { opacity: 0.07; }
          50%      { opacity: 0.12; }
        }
        .avenzo-logo-shade { animation: avenzoLogoShadeBreathe 9s ease-in-out infinite; }
        .avenzo-word-slide span { opacity: 0; animation: avenzoWordCycle 9s infinite; animation-fill-mode: backwards; }
        .avenzo-dot { animation: avenzoDot 12s infinite; }
        .avenzo-float-tilt { animation: avenzoFloatTilt 6s ease-in-out infinite; will-change: transform; }
        .avenzo-badge { animation: avenzoBadgeFloat 5s ease-in-out infinite; will-change: transform; }
        .avenzo-blob { animation: avenzoBlobDrift 16s ease-in-out infinite; will-change: transform; }
        .avenzo-card-slide > div { opacity: 0; animation: avenzoCardFade 12s infinite; animation-fill-mode: backwards; will-change: opacity, transform; }
        .avenzo-bar { transform-origin: bottom; animation: avenzoBarPulse 2.4s ease-in-out infinite; }
        .avenzo-fade-up { opacity: 0; animation: avenzoFadeUp 0.8s ease-out forwards; }
        .avenzo-marquee-track { animation: avenzoMarquee 22s linear infinite; }
      `}</style>

      {/* full-screen logo shade — covers the entire section, sits behind everything */}
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
        {/* subtle dark vignette on top of the shade so edges stay clean and text stays readable */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.35)_60%,rgba(0,0,0,0.75)_100%)]" />
      </div>

      {/* faint engineering-grid texture */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]" />

      {/* ambient animated glows */}
      <div className="avenzo-blob pointer-events-none absolute right-0 top-1/3 z-[1] h-[520px] w-[520px] -translate-y-1/2 translate-x-1/4 rounded-full bg-[#D9A94E]/10 blur-[120px]" />
      <div
        className="avenzo-blob pointer-events-none absolute left-0 bottom-0 z-[1] h-[420px] w-[420px] -translate-x-1/3 rounded-full bg-[#4B4F57]/20 blur-[110px]"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 pt-24 lg:grid-cols-2 lg:px-10 lg:pt-32">
        {/* Left — company info + rotating headline */}
        <div className="max-w-xl">
          <h1
            className="avenzo-fade-up text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
            style={{ animationDelay: "0.05s" }}
          >
            We build{" "}
            <span
              className="avenzo-word-slide relative inline-block h-[1.15em] w-[10ch] align-bottom overflow-hidden text-[#D9A94E]"
              aria-hidden="true"
            >
              {ROTATING_WORDS.map((word, i) => (
                <span
                  key={word}
                  className="absolute inset-0 flex items-center justify-start"
                  style={{ animationDelay: `${i * 3}s` }}
                >
                  {word}
                </span>
              ))}
            </span>
            <span className="sr-only">{ROTATING_WORDS.join(", ")}</span>
            <br />
            software that scales.
          </h1>

          <p
            className="avenzo-fade-up mt-6 text-base leading-relaxed text-neutral-400 sm:text-lg"
            style={{ animationDelay: "0.2s" }}
          >
            Avenzo Studio is a software engineering company crafting web
            platforms, applications, and digital infrastructure for teams
            that need to move fast without breaking things.
          </p>

          <div
            className="avenzo-fade-up mt-12 flex flex-wrap items-center gap-x-10 gap-y-6"
            style={{ animationDelay: "0.5s" }}
          >
            {STATS.map((stat, i) => (
              <div key={stat.label} className={i > 0 ? "border-l border-white/10 pl-10" : ""}>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-xs tracking-wide text-neutral-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* scrolling tech stack marquee */}
          <div
            className="avenzo-fade-up mt-14 max-w-full overflow-hidden"
            style={{ animationDelay: "0.65s" }}
          >
            <p className="mb-4 text-xs tracking-wide text-neutral-500">Built with the tools teams trust</p>
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="avenzo-marquee-track flex w-max items-center gap-10">
                {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                  <span key={`${tech}-${i}`} className="whitespace-nowrap text-sm font-medium text-neutral-500">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — tech showcase slider */}
        <div className="relative flex justify-center pb-24 lg:justify-end lg:pb-8">
          {/* floating tech badges */}
          {FLOATING_BADGES.map((badge) => (
            <div
              key={badge.label}
              className="avenzo-badge absolute z-10 hidden rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium text-[#F0C382] shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-md sm:block"
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

          {/* slider indicator dots */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 lg:bottom-0">
            {SHOWCASE_CARDS.map((_, i) => (
              <span
                key={i}
                className="avenzo-dot h-1.5 w-1.5 rounded-full bg-white/15"
                style={{ animationDelay: `${i * 3}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}