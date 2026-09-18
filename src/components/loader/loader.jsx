import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/avenzo-logo-transparent.png";

// Total time the loader stays on screen, and how long before completion
// the fade-out transition begins.
const DEFAULT_DURATION = 3000;
const FADE_LEAD = 300;

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Full-screen branded loading screen.
 *
 * Progress is driven by requestAnimationFrame and written straight to the
 * DOM through refs, so the component re-renders once (when the fade-out
 * starts) instead of on every animation frame — smoother and lighter than
 * driving a 60fps counter through React state.
 *
 * @param {() => void} [onFinish]  called once, when the loader completes
 * @param {number} [duration]      total time on screen, in ms
 * @param {string} [logoSrc]       override for the emblem image
 * @param {string} [brandName]     wordmark / aria-label text
 */
export default function Loader({
  onFinish,
  duration = DEFAULT_DURATION,
  logoSrc = logo,
  brandName = "AVENZO STUDIO",
}) {
  const [fadeOut, setFadeOut] = useState(false);

  const trackRef = useRef(null);
  const barRef = useRef(null);
  const percentRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const fadeDelay = Math.max(duration - FADE_LEAD, 0);

    const tick = (timestamp) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const linear = Math.min(elapsed / Math.max(duration, 1), 1);
      const eased = easeOutCubic(linear) * 100;

      if (barRef.current) barRef.current.style.width = `${eased}%`;
      if (percentRef.current) percentRef.current.textContent = `${Math.round(eased)}%`;
      if (trackRef.current) {
        trackRef.current.setAttribute("aria-valuenow", String(Math.round(eased)));
      }

      if (linear < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    const fadeTimer = setTimeout(() => setFadeOut(true), fadeDelay);
    const finishTimer = setTimeout(() => {
      if (typeof onFinish === "function") onFinish();
    }, duration);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [duration, onFinish]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={!fadeOut}
      aria-label={`Loading ${brandName}`}
      className={`avenzo-loader fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-300 ease-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <style>{`
        .avenzo-loader {
          --avenzo-gold: #D9A94E;
          --avenzo-gold-light: #F3CE8E;
          --avenzo-gold-dark: #8a6a2c;
        }

        @keyframes avenzoEntrance {
          from { opacity: 0; transform: scale(0.86) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes avenzoLogoTilt {
          0%   { transform: perspective(1000px) rotateX(10deg) rotateY(-14deg) rotateZ(-1.5deg) translateZ(0px) translateY(0px); }
          20%  { transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) rotateZ(0.5deg) translateZ(22px) translateY(-5px); }
          40%  { transform: perspective(1000px) rotateX(-9deg) rotateY(12deg) rotateZ(1.5deg) translateZ(6px) translateY(-2px); }
          60%  { transform: perspective(1000px) rotateX(-6deg) rotateY(16deg) rotateZ(-0.5deg) translateZ(-14px) translateY(3px); }
          80%  { transform: perspective(1000px) rotateX(6deg) rotateY(2deg) rotateZ(-1.5deg) translateZ(2px) translateY(1px); }
          100% { transform: perspective(1000px) rotateX(10deg) rotateY(-14deg) rotateZ(-1.5deg) translateZ(0px) translateY(0px); }
        }
        @keyframes avenzoGlareSweep {
          0%   { transform: translateX(-140%) translateY(-140%) rotate(25deg); opacity: 0; }
          12%  { opacity: 0.55; }
          50%  { opacity: 0.28; }
          88%  { opacity: 0; }
          100% { transform: translateX(140%) translateY(140%) rotate(25deg); opacity: 0; }
        }
        @keyframes avenzoContactShadow {
          0%, 100% { transform: scaleX(1) translateY(0); opacity: 0.55; }
          40%      { transform: scaleX(0.78) translateY(6px); opacity: 0.22; }
          60%      { transform: scaleX(0.88) translateY(4px); opacity: 0.3; }
        }
        @keyframes avenzoOrbitRing1 {
          from { transform: perspective(800px) rotateX(65deg) rotateY(25deg) rotateZ(0deg); }
          to   { transform: perspective(800px) rotateX(65deg) rotateY(25deg) rotateZ(360deg); }
        }
        @keyframes avenzoOrbitRing2 {
          from { transform: perspective(800px) rotateX(-60deg) rotateY(35deg) rotateZ(0deg); }
          to   { transform: perspective(800px) rotateX(-60deg) rotateY(35deg) rotateZ(-360deg); }
        }
        @keyframes avenzoShimmer {
          from { background-position: -200% 0; }
          to   { background-position: 200% 0; }
        }

        .avenzo-loader .avenzo-card {
          animation: avenzoEntrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .avenzo-loader .avenzo-emblem-stage {
          perspective: 1000px;
        }
        .avenzo-loader .avenzo-logo-tilt {
          animation: avenzoLogoTilt 6.5s cubic-bezier(0.45, 0, 0.55, 1) infinite;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .avenzo-loader .avenzo-glare {
          position: absolute;
          inset: -60%;
          background: linear-gradient(
            115deg,
            transparent 42%,
            rgba(255, 255, 255, 0.55) 50%,
            transparent 58%
          );
          mix-blend-mode: overlay;
          animation: avenzoGlareSweep 3.6s ease-in-out infinite;
          pointer-events: none;
        }
        .avenzo-loader .avenzo-contact-shadow {
          animation: avenzoContactShadow 6.5s cubic-bezier(0.45, 0, 0.55, 1) infinite;
          transform-origin: center;
        }
        .avenzo-loader .avenzo-ring-1 {
          animation: avenzoOrbitRing1 7s linear infinite;
        }
        .avenzo-loader .avenzo-ring-2 {
          animation: avenzoOrbitRing2 9s linear infinite;
        }
        .avenzo-loader .avenzo-progress-fill {
          background: linear-gradient(
            90deg,
            var(--avenzo-gold-dark) 0%,
            var(--avenzo-gold-light) 50%,
            var(--avenzo-gold-dark) 100%
          );
          background-size: 200% 100%;
          animation: avenzoShimmer 2.2s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .avenzo-loader .avenzo-card,
          .avenzo-loader .avenzo-logo-tilt,
          .avenzo-loader .avenzo-ring-1,
          .avenzo-loader .avenzo-ring-2,
          .avenzo-loader .avenzo-glare,
          .avenzo-loader .avenzo-contact-shadow,
          .avenzo-loader .avenzo-progress-fill {
            animation: none !important;
          }
          .avenzo-loader .avenzo-glare {
            display: none;
          }
        }
      `}</style>

      {/* Engineering grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px]" />

      {/* Ambient depth glow */}
      <div className="pointer-events-none absolute h-[380px] w-[380px] rounded-full bg-[#D9A94E]/15 blur-[120px]" />
      <div className="pointer-events-none absolute h-[280px] w-[280px] rounded-full bg-[#4B4F57]/20 blur-[90px]" />

      {/* 3D emblem */}
      <div className="avenzo-emblem-stage relative flex flex-col items-center justify-center p-12">
        <div className="avenzo-ring-1 absolute h-56 w-56 rounded-full border border-[#D9A94E]/30 border-t-[#D9A94E] border-r-transparent shadow-[0_0_25px_rgba(217,169,78,0.2)]" />
        <div className="avenzo-ring-2 absolute h-64 w-64 rounded-full border border-white/10 border-b-[#F3CE8E] border-l-transparent" />

        <div className="avenzo-card relative z-10 flex h-36 w-36 items-center justify-center overflow-hidden rounded-3xl border border-white/15 bg-black/50 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <img
            src={logoSrc}
            alt={brandName}
            className="avenzo-logo-tilt h-full w-full object-contain drop-shadow-[0_10px_20px_rgba(217,169,78,0.3)]"
          />
          <div className="avenzo-glare" />
        </div>

        {/* Grounded contact shadow — sells the floating 3D depth of the card above */}
        <div className="avenzo-contact-shadow relative z-0 -mt-3 h-3 w-24 rounded-full bg-black/70 blur-md" />
      </div>

      {/* Progress */}
      <div className="relative z-10 mt-6 flex flex-col items-center">
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D9A94E]">
          {brandName}
        </span>

        <div
          ref={trackRef}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
          className="mt-4 h-1.5 w-48 overflow-hidden rounded-full border border-white/10 bg-white/5 p-[1px] shadow-inner"
        >
          <div
            ref={barRef}
            className="avenzo-progress-fill h-full rounded-full shadow-[0_0_12px_#D9A94E]"
            style={{ width: "0%" }}
          />
        </div>

        <span
          ref={percentRef}
          className="mt-2 font-mono text-[11px] text-neutral-400 tabular-nums"
        >
          0%
        </span>
      </div>
    </div>
  );
}