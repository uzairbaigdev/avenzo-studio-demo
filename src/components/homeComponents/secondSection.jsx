import { useEffect, useRef, useState } from "react";

/**
 * Second homepage section — "Our Process".
 * Visualizes the studio's delivery pipeline as a node-graph diagram
 * (trigger -> core process hub -> sub-stages -> decision -> outcomes),
 * in the spirit of workflow-automation diagrams, restyled with the
 * Avenzo Studio gold/graphite palette.
 *
 * Desktop (lg+): full node-graph diagram with:
 *   - a scroll-triggered, staggered entrance (nodes + connectors "build"
 *     themselves in pipeline order the first time the section comes
 *     into view)
 *   - connector lines that draw themselves in, then hand off to a
 *     continuous flowing-dash "data in motion" loop
 *   - small glowing particles that travel along the main path
 *     (trigger -> hub -> decision -> launch/revise) for a
 *     "live pipeline" feel
 *   - soft ambient background glows and a breathing halo behind the hub
 *   - hover micro-interactions on every node
 * Mobile/tablet: a simplified vertical step list (the graph layout
 * doesn't reflow cleanly on narrow screens), with its own scroll-triggered
 * staggered reveal and hover/tap lift.
 *
 * All motion respects prefers-reduced-motion: animations are skipped and
 * the end state is shown immediately.
 */

/* ---------- theme tokens ---------- */
const THEME = {
  "--avenzo-gold": "#D9A94E",
  "--avenzo-gold-soft": "rgba(217,169,78,0.35)",
  "--avenzo-bg": "#0B0C0E",
  "--avenzo-bg-alt": "#0c0d0f",
  "--avenzo-bg-panel": "#15161a",
};

/* ---------- shared coordinate system for the diagram (0-100 grid) ---------- */
/* Both the SVG connector lines and the absolutely-positioned node divs read
   from this single source of truth, so the lines always meet the nodes. */
const NODES = {
  trigger: { x: 6, y: 46 },
  hub: { x: 29, y: 32 },
  subDiscovery: { x: 14, y: 80 },
  subDesign: { x: 25, y: 85 },
  subDevelopment: { x: 37, y: 85 },
  subTesting: { x: 48, y: 80 },
  decision: { x: 61, y: 46 },
  launch: { x: 85, y: 20 },
  launchPlus: { x: 96, y: 20 },
  revise: { x: 85, y: 70 },
  revisePlus: { x: 96, y: 70 },
};

const HUB_HALF_WIDTH = 9;
const HUB_HALF_HEIGHT = 8;
const DECISION_HALF_WIDTH = 4;

/** Staggered entrance delays (seconds), keyed by pipeline order. */
const NODE_DELAY = {
  trigger: 0,
  hub: 0.16,
  subDiscovery: 0.38,
  subDesign: 0.46,
  subDevelopment: 0.54,
  subTesting: 0.62,
  decision: 0.82,
  launch: 1.02,
  revise: 1.02,
  launchPlus: 1.14,
  revisePlus: 1.14,
};

const CONNECTOR_DELAY = {
  "trigger-hub": 0,
  "hub-discovery": 0.28,
  "hub-design": 0.32,
  "hub-development": 0.36,
  "hub-testing": 0.4,
  "hub-decision": 0.6,
  "decision-launch": 0.86,
  "decision-revise": 0.86,
  "launch-plus": 1.08,
  "revise-plus": 1.08,
};

/** Straight connector between two grid points. */
function linePath(a, b) {
  return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
}

/** Smooth S-curve connector, used for the true/false-style branches. */
function curvePath(a, b) {
  const midX = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x} ${b.y}`;
}

const hubLeftEdge = { x: NODES.hub.x - HUB_HALF_WIDTH, y: NODES.hub.y };
const hubRightEdge = { x: NODES.hub.x + HUB_HALF_WIDTH, y: NODES.hub.y };
const hubBottomEdge = { x: NODES.hub.x, y: NODES.hub.y + HUB_HALF_HEIGHT };
const decisionLeftEdge = { x: NODES.decision.x - DECISION_HALF_WIDTH, y: NODES.decision.y };
const decisionRightEdge = { x: NODES.decision.x + DECISION_HALF_WIDTH, y: NODES.decision.y };

const CONNECTORS = [
  { id: "trigger-hub", d: linePath(NODES.trigger, hubLeftEdge), variant: "solid" },
  { id: "hub-discovery", d: linePath(hubBottomEdge, NODES.subDiscovery), variant: "dashed" },
  { id: "hub-design", d: linePath(hubBottomEdge, NODES.subDesign), variant: "dashed" },
  { id: "hub-development", d: linePath(hubBottomEdge, NODES.subDevelopment), variant: "dashed" },
  { id: "hub-testing", d: linePath(hubBottomEdge, NODES.subTesting), variant: "dashed" },
  { id: "hub-decision", d: linePath(hubRightEdge, decisionLeftEdge), variant: "solid" },
  { id: "decision-launch", d: curvePath(decisionRightEdge, NODES.launch), variant: "solid" },
  { id: "decision-revise", d: curvePath(decisionRightEdge, NODES.revise), variant: "solid" },
  { id: "launch-plus", d: linePath(NODES.launch, NODES.launchPlus), variant: "dashed" },
  { id: "revise-plus", d: linePath(NODES.revise, NODES.revisePlus), variant: "dashed" },
];

/* Paths that get a small glowing particle traveling along them, to sell
   the "live pipeline" feel. Kept to the main trunk so it reads as one
   coherent flow rather than visual noise. */
const PARTICLE_PATHS = [
  { pathId: "trigger-hub", dur: "2.1s", begin: "1.3s", color: "var(--avenzo-gold)" },
  { pathId: "hub-decision", dur: "2.1s", begin: "1.9s", color: "var(--avenzo-gold)" },
  { pathId: "decision-launch", dur: "2.6s", begin: "2.5s", color: "var(--avenzo-gold)" },
  { pathId: "decision-revise", dur: "2.6s", begin: "2.5s", color: "rgba(255,255,255,0.55)" },
];

/* ---------- small inline icon set (generic, decorative line icons) ---------- */
/* Every icon here sits next to a visible text label, so they're marked
   aria-hidden to avoid redundant/noisy screen-reader announcements. */

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

const BoltIcon = (props) => (
  <Icon {...props}>
    <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
  </Icon>
);

const RobotIcon = (props) => (
  <Icon {...props}>
    <rect x="4" y="8" width="16" height="10" rx="2" />
    <path d="M9 8V5a3 3 0 0 1 6 0v3" />
    <circle cx="9" cy="13" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="13" r="1" fill="currentColor" stroke="none" />
  </Icon>
);

const SearchIcon = (props) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </Icon>
);

const LayersIcon = (props) => (
  <Icon {...props}>
    <path d="M12 2 2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </Icon>
);

const CodeIcon = (props) => (
  <Icon {...props}>
    <path d="M8 6 2 12l6 6" />
    <path d="M16 6l6 6-6 6" />
  </Icon>
);

const CheckSquareIcon = (props) => (
  <Icon {...props}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 12l3 3 5-6" />
  </Icon>
);

const DiamondIcon = (props) => (
  <Icon {...props}>
    <path d="M12 2 22 12 12 22 2 12z" />
    <path d="M9 12l2 2 4-4" />
  </Icon>
);

const RocketIcon = (props) => (
  <Icon {...props}>
    <path d="M12 2c3 2 5 6 5 10 0 2-1 4-2 5l-3-3-3 3c-1-1-2-3-2-5 0-4 2-8 5-10z" />
    <circle cx="12" cy="9" r="1.4" fill="currentColor" stroke="none" />
  </Icon>
);

const LoopIcon = (props) => (
  <Icon {...props}>
    <path d="M4 4v6h6" />
    <path d="M20 20v-6h-6" />
    <path d="M5.5 9A8 8 0 0 1 19 8" />
    <path d="M18.5 15A8 8 0 0 1 5 16" />
  </Icon>
);

const PlusIcon = (props) => (
  <Icon {...props}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

/* ---------- step data (shared by the diagram labels and the mobile list) ---------- */

const PROCESS_STEPS = [
  {
    id: "discovery",
    title: "Discovery",
    description: "We map your goals, users, and constraints before writing a line of code.",
    Icon: SearchIcon,
  },
  {
    id: "design",
    title: "Design",
    description: "Wireframes and UI direction get signed off before development starts.",
    Icon: LayersIcon,
  },
  {
    id: "development",
    title: "Development",
    description: "Clean, tested code built in focused sprints with visible progress.",
    Icon: CodeIcon,
  },
  {
    id: "testing",
    title: "Testing & QA",
    description: "Cross-device checks and bug fixes before anything reaches production.",
    Icon: CheckSquareIcon,
  },
];

/* ---------- small hook: track prefers-reduced-motion live ---------- */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange);
    };
  }, []);

  return reduced;
}

/* ---------- reusable node primitive for the desktop diagram ---------- */
/* The outer wrapper only ever carries a *positioning* transform
   (translate(-50%, -50%)), so it's always safe to layer an entrance
   animation (opacity/blur only — never `transform`) directly on it
   without fighting the inline style. */

function DiagramNode({ x, y, delay = 0, children, className = "" }) {
  return (
    <div
      className={`avenzo-node-in absolute flex flex-col items-center ${className}`}
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)", "--node-delay": `${delay}s` }}
    >
      {children}
    </div>
  );
}

function NodeLabel({ title, subtitle }) {
  return (
    <div className="mt-3 text-center">
      <div className="text-xs font-medium text-white">{title}</div>
      {subtitle && <div className="mt-0.5 text-[10px] text-neutral-500">{subtitle}</div>}
    </div>
  );
}

export default function SecondSection() {
  const contentRef = useRef(null);
  const [revealed, setRevealed] = useState(false); // sticky: true forever once seen
  const [active, setActive] = useState(false); // toggles with current visibility
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      // Skip the choreography entirely — show the finished state right away.
      setRevealed(true);
      setActive(true);
      return undefined;
    }

    const node = contentRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      setActive(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          setActive(true);
        } else {
          setActive(false);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const showParticles = active && !prefersReducedMotion;

  return (
    <section
      className="relative w-full overflow-hidden bg-black py-24 px-6 lg:px-10"
      style={THEME}
    >
      <style>{`
        @keyframes avenzoFadeUp {
          0%   { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes avenzoNodeIn {
          0%   { opacity: 0; filter: blur(6px); }
          100% { opacity: 1; filter: blur(0); }
        }
        @keyframes avenzoFlowDash {
          0%   { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes avenzoNodePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(217, 169, 78, 0.28); }
          50%      { box-shadow: 0 0 0 10px rgba(217, 169, 78, 0); }
        }
        @keyframes avenzoHaloBreathe {
          0%, 100% { opacity: 0.35; transform: translate(-50%, -50%) scale(1); }
          50%      { opacity: 0.6; transform: translate(-50%, -50%) scale(1.12); }
        }
        @keyframes avenzoOrbFloatA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(3%, -4%) scale(1.08); }
        }
        @keyframes avenzoOrbFloatB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-4%, 3%) scale(1.1); }
        }

        /* ambient background */
        .avenzo-orb { animation-play-state: paused; }
        .is-active .avenzo-orb { animation-play-state: running; }

        /* scroll-triggered entrance, gated behind .is-revealed */
        .avenzo-fade-up { opacity: 0; }
        .is-revealed .avenzo-fade-up { animation: avenzoFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        .avenzo-node-in { opacity: 0; filter: blur(6px); }
        .is-revealed .avenzo-node-in {
          animation: avenzoNodeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: var(--node-delay, 0s);
        }

        /* solid connectors: self-draw via the pathLength trick */
        .avenzo-connector-solid {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          transition: stroke-dashoffset 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: var(--connector-delay, 0s);
        }
        .is-revealed .avenzo-connector-solid { stroke-dashoffset: 0; }

        /* dashed connectors: fade in, then hand off to a looping flow */
        .avenzo-flow-line {
          opacity: 0;
          transition: opacity 0.6s ease-out;
          transition-delay: var(--connector-delay, 0s);
        }
        .is-revealed .avenzo-flow-line { opacity: 1; }
        .avenzo-flow-line.is-animating {
          stroke-dasharray: 4 3;
          animation: avenzoFlowDash 1.4s linear infinite;
          animation-delay: var(--connector-delay, 0s);
        }

        .avenzo-hub-pulse.is-animating { animation: avenzoNodePulse 2.6s ease-in-out infinite; }
        .avenzo-hub-halo { animation: avenzoHaloBreathe 3.2s ease-in-out infinite; }

        .avenzo-orb-a { animation: avenzoOrbFloatA 14s ease-in-out infinite; }
        .avenzo-orb-b { animation: avenzoOrbFloatB 17s ease-in-out infinite; }

        /* hover micro-interactions */
        .avenzo-hoverable {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .avenzo-hoverable:hover {
          transform: translateY(-3px) scale(1.045);
          border-color: rgba(217, 169, 78, 0.55);
          box-shadow: 0 12px 30px rgba(217, 169, 78, 0.18);
        }
        .avenzo-card-hoverable {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .avenzo-card-hoverable:hover {
          transform: translateY(-4px);
          border-color: rgba(217, 169, 78, 0.4);
          box-shadow: 0 16px 34px rgba(0, 0, 0, 0.45);
        }

        /* Respect the user's OS/browser-level motion preference: disable
           every non-essential animation and just show the end state. */
        @media (prefers-reduced-motion: reduce) {
          .avenzo-fade-up { opacity: 1; animation: none; transform: none; }
          .avenzo-node-in { opacity: 1; filter: blur(0); animation: none; }
          .avenzo-connector-solid { stroke-dashoffset: 0; transition: none; }
          .avenzo-flow-line { opacity: 1; transition: none; }
          .avenzo-flow-line.is-animating,
          .avenzo-hub-pulse.is-animating,
          .avenzo-hub-halo,
          .avenzo-orb-a,
          .avenzo-orb-b {
            animation: none;
          }
          .avenzo-hoverable:hover,
          .avenzo-card-hoverable:hover {
            transform: none;
          }
        }
      `}</style>

      {/* ambient background glow — purely decorative */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="avenzo-orb avenzo-orb-a absolute -left-32 top-10 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--avenzo-gold) 0%, transparent 70%)" }}
        />
        <div
          className="avenzo-orb avenzo-orb-b absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full opacity-[0.12] blur-3xl"
          style={{ background: "radial-gradient(circle, #6d7280 0%, transparent 70%)" }}
        />
      </div>

      <div
        ref={contentRef}
        className={`relative mx-auto max-w-7xl ${revealed ? "is-revealed" : ""} ${active ? "is-active" : ""}`}
      >
        {/* heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="avenzo-fade-up text-xs font-medium uppercase tracking-[0.2em]"
            style={{ color: "var(--avenzo-gold)" }}
          >
            How we work
          </p>
          <h2
            className="avenzo-fade-up mt-3 text-3xl font-bold text-white sm:text-4xl"
            style={{ animationDelay: "0.1s" }}
          >
            A clear process, from brief to launch
          </h2>
          <p
            className="avenzo-fade-up mt-4 text-base leading-relaxed text-neutral-400"
            style={{ animationDelay: "0.2s" }}
          >
            Every project moves through the same disciplined pipeline —
            no guesswork, no scope creep, just steady progress you can see.
          </p>
        </div>

        {/* ---------- desktop node-graph diagram ---------- */}
        <div className="avenzo-fade-up relative mt-16 hidden lg:block" style={{ animationDelay: "0.3s" }} aria-hidden="true">
          <div
            className="relative aspect-[2/1] w-full overflow-hidden rounded-3xl border border-white/10 p-6"
            style={{ background: "linear-gradient(to bottom, var(--avenzo-bg-alt), black)" }}
          >
            {/* faint grid texture */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]" />

            {/* connector lines */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
              {CONNECTORS.map((c) => {
                const delay = CONNECTOR_DELAY[c.id] ?? 0;
                const isSolid = c.variant === "solid";
                return (
                  <path
                    key={c.id}
                    id={`connector-${c.id}`}
                    d={c.d}
                    fill="none"
                    pathLength={isSolid ? 1 : undefined}
                    stroke={isSolid ? "var(--avenzo-gold-soft)" : "rgba(255,255,255,0.18)"}
                    strokeWidth={isSolid ? 0.35 : 0.3}
                    className={isSolid ? "avenzo-connector-solid" : `avenzo-flow-line ${active ? "is-animating" : ""}`}
                    style={{ "--connector-delay": `${delay}s` }}
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}

              {/* traveling particles along the main trunk of the pipeline */}
              {showParticles &&
                PARTICLE_PATHS.map((p) => (
                  <circle key={p.pathId} r="0.9" fill={p.color}>
                    <animateMotion dur={p.dur} begin={p.begin} repeatCount="indefinite" rotate="auto">
                      <mpath xlinkHref={`#connector-${p.pathId}`} />
                    </animateMotion>
                  </circle>
                ))}
            </svg>

            {/* true / false-style branch labels */}
            <div
              className="avenzo-fade-up absolute text-[10px] font-medium"
              style={{
                left: `${(NODES.decision.x + NODES.launch.x) / 2}%`,
                top: `${NODES.decision.y - 10}%`,
                color: "var(--avenzo-gold)",
                animationDelay: "0.95s",
              }}
            >
              approved
            </div>
            <div
              className="avenzo-fade-up absolute text-[10px] font-medium text-neutral-500"
              style={{
                left: `${(NODES.decision.x + NODES.revise.x) / 2}%`,
                top: `${NODES.decision.y + 8}%`,
                animationDelay: "0.95s",
              }}
            >
              needs changes
            </div>

            {/* trigger node */}
            <DiagramNode x={NODES.trigger.x} y={NODES.trigger.y} delay={NODE_DELAY.trigger}>
              <div className="avenzo-hoverable flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-[#0B0C0E] text-[#D9A94E] shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                <BoltIcon className="h-6 w-6" />
              </div>
              <NodeLabel title="New project brief" />
            </DiagramNode>

            {/* hub node */}
            <div
              className="absolute"
              style={{ left: `${NODES.hub.x}%`, top: `${NODES.hub.y}%`, transform: "translate(-50%, -50%)" }}
            >
              {/* soft breathing halo behind the hub */}
              <div
                className="avenzo-hub-halo pointer-events-none absolute left-1/2 top-1/2 h-32 w-56 rounded-full blur-2xl"
                style={{ background: "radial-gradient(circle, var(--avenzo-gold-soft) 0%, transparent 70%)" }}
              />
              <div
                className="avenzo-node-in avenzo-hoverable relative flex h-24 w-44 items-center gap-3 rounded-2xl border border-[#D9A94E]/40 bg-gradient-to-b from-[#15161a] to-[#0B0C0E] px-4 shadow-[0_20px_45px_rgba(0,0,0,0.6)]"
                style={{ "--node-delay": `${NODE_DELAY.hub}s` }}
              >
                <div className={`avenzo-hub-pulse ${active ? "is-animating" : ""} flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0B0C0E] text-[#D9A94E]`}>
                  <RobotIcon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Our Process</div>
                  <div className="text-xs text-neutral-500">Design → Build → Ship</div>
                </div>
              </div>
            </div>

            {/* sub-stage nodes */}
            {[
              { key: "subDiscovery", pos: NODES.subDiscovery, step: PROCESS_STEPS[0] },
              { key: "subDesign", pos: NODES.subDesign, step: PROCESS_STEPS[1] },
              { key: "subDevelopment", pos: NODES.subDevelopment, step: PROCESS_STEPS[2] },
              { key: "subTesting", pos: NODES.subTesting, step: PROCESS_STEPS[3] },
            ].map(({ key, pos, step }) => (
              <DiagramNode key={step.id} x={pos.x} y={pos.y} delay={NODE_DELAY[key]}>
                <div className="avenzo-hoverable flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#111214] text-neutral-300">
                  <step.Icon className="h-5 w-5" />
                </div>
                <NodeLabel title={step.title} />
              </DiagramNode>
            ))}

            {/* decision node */}
            <div
              className="avenzo-node-in avenzo-hoverable absolute flex h-14 w-14 rotate-45 items-center justify-center rounded-lg border border-white/15 bg-[#0B0C0E]"
              style={{
                left: `${NODES.decision.x}%`,
                top: `${NODES.decision.y}%`,
                transform: "translate(-50%, -50%) rotate(45deg)",
                "--node-delay": `${NODE_DELAY.decision}s`,
              }}
            >
              <DiamondIcon className="h-6 w-6 -rotate-45 text-[#D9A94E]" />
            </div>
            <div
              className="avenzo-node-in absolute text-center"
              style={{
                left: `${NODES.decision.x}%`,
                top: `${NODES.decision.y + 11}%`,
                transform: "translate(-50%, 0)",
                "--node-delay": `${NODE_DELAY.decision}s`,
              }}
            >
              <NodeLabel title="Client review" />
            </div>

            {/* launch (true branch) */}
            <DiagramNode x={NODES.launch.x} y={NODES.launch.y} delay={NODE_DELAY.launch}>
              <div className="avenzo-hoverable flex h-14 w-14 items-center justify-center rounded-xl border border-[#D9A94E]/30 bg-[#0B0C0E] text-[#D9A94E] shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                <RocketIcon className="h-6 w-6" />
              </div>
              <NodeLabel title="Launch & deploy" subtitle="go live" />
            </DiagramNode>
            <DiagramNode x={NODES.launchPlus.x} y={NODES.launchPlus.y} delay={NODE_DELAY.launchPlus}>
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-dashed border-white/20 text-neutral-500">
                <PlusIcon className="h-4 w-4" />
              </div>
            </DiagramNode>

            {/* revise (false branch) */}
            <DiagramNode x={NODES.revise.x} y={NODES.revise.y} delay={NODE_DELAY.revise}>
              <div className="avenzo-hoverable flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-[#0B0C0E] text-neutral-300 shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                <LoopIcon className="h-6 w-6" />
              </div>
              <NodeLabel title="Revise & iterate" subtitle="feedback loop" />
            </DiagramNode>
            <DiagramNode x={NODES.revisePlus.x} y={NODES.revisePlus.y} delay={NODE_DELAY.revisePlus}>
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-dashed border-white/20 text-neutral-500">
                <PlusIcon className="h-4 w-4" />
              </div>
            </DiagramNode>
          </div>
        </div>

        {/* ---------- mobile / tablet fallback: simple step list ---------- */}
        <div className="relative mt-16 grid grid-cols-1 gap-6 lg:hidden">
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.id}
              className="avenzo-fade-up avenzo-card-hoverable rounded-2xl border border-white/10 bg-[#0B0C0E] p-6"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] text-[#D9A94E]">
                <step.Icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-sm font-semibold text-white">
                {i + 1}. {step.title}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}