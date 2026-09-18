import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

const EASING = 0.08; // pointer smoothing (0–1, lower = smoother)
const DEPTH_LAYERS = Array.from({ length: 16 }, (_, index) => index);
const CUBE_FACES = ["front", "back", "right", "left", "top", "bottom"];

const CUBES = [
	{ x: "11%", y: "24%", size: 54, depth: 46, duration: 18, delay: 0 },
	{ x: "84%", y: "20%", size: 38, depth: 72, duration: 14, delay: -4 },
	{ x: "19%", y: "70%", size: 30, depth: 96, duration: 22, delay: -8, hideOnMobile: true },
	{ x: "80%", y: "66%", size: 62, depth: 34, duration: 20, delay: -11 },
	{ x: "52%", y: "9%", size: 22, depth: 118, duration: 12, delay: -6, hideOnMobile: true },
];

const RINGS = [
	{ scale: "128%", tilt: "74deg", roll: "0deg", duration: "14s", reverse: false },
	{ scale: "152%", tilt: "68deg", roll: "-14deg", duration: "20s", reverse: true },
];

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

/**
 * Writes smoothed pointer values to CSS variables on the given element:
 * --px / --py  → normalized position, -1 to 1
 * --mx / --my  → spotlight position, in %
 * The animation frame loop only runs while the values are still easing.
 */
function usePointerParallax(ref) {
	useEffect(() => {
		const node = ref.current;
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (!node || prefersReducedMotion) return undefined;

		const target = { x: 0, y: 0 };
		const current = { x: 0, y: 0 };
		let frame = 0;

		const render = () => {
			current.x += (target.x - current.x) * EASING;
			current.y += (target.y - current.y) * EASING;

			node.style.setProperty("--px", current.x.toFixed(4));
			node.style.setProperty("--py", current.y.toFixed(4));
			node.style.setProperty("--mx", `${((current.x + 1) * 50).toFixed(2)}%`);
			node.style.setProperty("--my", `${((current.y + 1) * 50).toFixed(2)}%`);

			const settled =
				Math.abs(target.x - current.x) < 0.001 && Math.abs(target.y - current.y) < 0.001;
			frame = settled ? 0 : requestAnimationFrame(render);
		};

		const start = () => {
			if (!frame) frame = requestAnimationFrame(render);
		};

		const handleMove = (event) => {
			target.x = (event.clientX / window.innerWidth) * 2 - 1;
			target.y = (event.clientY / window.innerHeight) * 2 - 1;
			start();
		};

		const handleLeave = () => {
			target.x = 0;
			target.y = 0;
			start();
		};

		window.addEventListener("pointermove", handleMove, { passive: true });
		document.documentElement.addEventListener("pointerleave", handleLeave);

		return () => {
			window.removeEventListener("pointermove", handleMove);
			document.documentElement.removeEventListener("pointerleave", handleLeave);
			cancelAnimationFrame(frame);
		};
	}, [ref]);
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

function Cube({ x, y, size, depth, duration, delay, hideOnMobile }) {
	return (
		<div
			className={`nf-drift${hideOnMobile ? " nf-hide-mobile" : ""}`}
			style={{ "--x": x, "--y": y, "--depth": depth }}
			aria-hidden="true"
		>
			<div
				className="nf-cube"
				style={{ "--size": `${size}px`, "--dur": `${duration}s`, "--delay": `${delay}s` }}
			>
				{CUBE_FACES.map((face) => (
					<span key={face} className={`nf-side nf-side-${face}`} />
				))}
			</div>
		</div>
	);
}

function Digits() {
	return (
		<div className="nf-scene">
			<div className="nf-tilt">
				<div className="nf-float">
					<div className="nf-digits" role="img" aria-label="Error 404">
						<div className="nf-digits-inner" aria-hidden="true">
							{DEPTH_LAYERS.map((index) => (
								<span key={index} className="nf-layer" style={{ "--i": index }}>
									404
								</span>
							))}
							<span className="nf-face">404</span>
						</div>

						{RINGS.map((ring) => (
							<span
								key={ring.scale}
								className={`nf-ring${ring.reverse ? " nf-ring-reverse" : ""}`}
								style={{
									"--ring-size": ring.scale,
									"--tilt": ring.tilt,
									"--roll": ring.roll,
									"--orbit": ring.duration,
								}}
								aria-hidden="true"
							/>
						))}
					</div>
				</div>
			</div>
			<span className="nf-shadow" aria-hidden="true" />
		</div>
	);
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function NotFound() {
	const pageRef = useRef(null);
	usePointerParallax(pageRef);

	return (
		<>
			<style>{styles}</style>

			<main className="nf-page" ref={pageRef}>
				<div className="nf-backdrop" aria-hidden="true">
					<div className="nf-grid" />
					<div className="nf-glow" />
					<div className="nf-spotlight" />
					<div className="nf-horizon">
						<div className="nf-floor" />
					</div>
					{CUBES.map((cube) => (
						<Cube key={`${cube.x}-${cube.y}`} {...cube} />
					))}
				</div>

				<div className="nf-content">
					<p className="nf-kicker nf-reveal" style={{ "--d": 0 }}>
						Avenzo Studio
					</p>

					<Digits />

					<h1 className="nf-title nf-reveal" style={{ "--d": 3 }}>
						This page took an unexpected turn.
					</h1>
					<p className="nf-copy nf-reveal" style={{ "--d": 4 }}>
						The address may be outdated, or the page may have moved. Let&apos;s get you back to
						something useful.
					</p>

					<div className="nf-actions nf-reveal" style={{ "--d": 5 }}>
						<Link className="nf-action nf-action-primary" to="/">
							Return home
						</Link>
						<Link className="nf-action nf-action-secondary" to="/contact">
							Contact company
						</Link>
					</div>
				</div>
			</main>
		</>
	);
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const styles = `
	.nf-page {
		--px: 0;
		--py: 0;
		--mx: 50%;
		--my: 42%;
		--gold: #d9a94e;
		--gold-light: #f3ce8e;

		position: relative;
		min-height: 100vh;
		min-height: 100dvh;
		display: grid;
		place-items: center;
		padding: 7rem 1.5rem 5rem;
		overflow: hidden;
		isolation: isolate;
		color: #f8f7f2;
		background: radial-gradient(ellipse at 50% 30%, #14110b 0%, #090a0b 62%);
	}

	/* ---------- Backdrop ---------- */

	.nf-backdrop {
		position: absolute;
		inset: 0;
		z-index: -1;
		pointer-events: none;
	}

	.nf-grid {
		position: absolute;
		inset: 0;
		opacity: 0.22;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
		background-size: 56px 56px;
		mask-image: linear-gradient(to bottom, #000, transparent 70%);
		transform: translate3d(calc(var(--px) * -8px), calc(var(--py) * -8px), 0);
	}

	.nf-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		width: min(60vw, 720px);
		aspect-ratio: 1;
		margin: calc(min(60vw, 720px) / -2) 0 0 calc(min(60vw, 720px) / -2);
		border-radius: 50%;
		background: radial-gradient(circle, rgba(217, 169, 78, 0.18), transparent 68%);
		filter: blur(10px);
		animation: nf-breathe 6s ease-in-out infinite;
	}

	.nf-spotlight {
		position: absolute;
		inset: 0;
		background: radial-gradient(520px circle at var(--mx) var(--my), rgba(243, 206, 142, 0.09), transparent 65%);
	}

	.nf-horizon {
		position: absolute;
		inset: auto 0 0;
		height: 52%;
		overflow: hidden;
		perspective: 420px;
		perspective-origin: 50% 0;
		mask-image: linear-gradient(to bottom, transparent, #000 45%);
	}

	.nf-floor {
		position: absolute;
		inset: 0 -60% auto;
		height: 220%;
		transform-origin: 50% 0;
		transform: rotateX(68deg);
		background-image:
			linear-gradient(rgba(217, 169, 78, 0.34) 1px, transparent 1px),
			linear-gradient(90deg, rgba(217, 169, 78, 0.34) 1px, transparent 1px);
		background-size: 64px 64px;
		animation: nf-scroll 2.4s linear infinite;
	}

	/* ---------- Floating cubes ---------- */

	.nf-drift {
		position: absolute;
		top: var(--y);
		left: var(--x);
		perspective: 600px;
		transform: translate3d(calc(var(--px) * var(--depth) * -1px), calc(var(--py) * var(--depth) * -1px), 0);
	}

	.nf-cube {
		--half: calc(var(--size) / 2);
		position: relative;
		width: var(--size);
		height: var(--size);
		transform-style: preserve-3d;
		animation:
			nf-spin var(--dur) linear var(--delay) infinite,
			nf-bob calc(var(--dur) / 3) ease-in-out var(--delay) infinite;
	}

	.nf-side {
		position: absolute;
		inset: 0;
		border: 1px solid rgba(217, 169, 78, 0.5);
		background: rgba(217, 169, 78, 0.06);
		box-shadow: inset 0 0 16px rgba(217, 169, 78, 0.14);
	}

	.nf-side-front  { transform: translateZ(var(--half)); }
	.nf-side-back   { transform: rotateY(180deg) translateZ(var(--half)); }
	.nf-side-right  { transform: rotateY(90deg) translateZ(var(--half)); }
	.nf-side-left   { transform: rotateY(-90deg) translateZ(var(--half)); }
	.nf-side-top    { transform: rotateX(90deg) translateZ(var(--half)); }
	.nf-side-bottom { transform: rotateX(-90deg) translateZ(var(--half)); }

	/* ---------- Content ---------- */

	.nf-content {
		width: min(100%, 920px);
		text-align: center;
	}

	.nf-kicker {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		margin: 0;
		color: var(--gold);
		font: 600 0.85rem/1 system-ui, sans-serif;
		letter-spacing: 0.14em;
	}

	.nf-kicker::before,
	.nf-kicker::after {
		content: "";
		width: 28px;
		height: 1px;
		background: currentColor;
		opacity: 0.7;
	}

	/* ---------- 3D "404" ---------- */

	.nf-scene {
		position: relative;
		display: flex;
		justify-content: center;
		margin-top: 2.5rem;
		perspective: 1100px;
		animation: nf-emerge 1.2s cubic-bezier(0.2, 0.9, 0.2, 1) 0.1s both;
	}

	.nf-tilt,
	.nf-float,
	.nf-digits {
		transform-style: preserve-3d;
	}

	.nf-tilt {
		transform:
			rotateX(calc(8deg + var(--py) * -12deg))
			rotateY(calc(-8deg + var(--px) * 18deg));
	}

	.nf-float {
		animation: nf-float 5s ease-in-out infinite;
	}

	.nf-digits {
		position: relative;
		font: 900 clamp(6.5rem, 24vw, 15rem)/0.85 system-ui, sans-serif;
		letter-spacing: -0.06em;
		user-select: none;
	}

	.nf-digits-inner {
		--step: 4px;
		--half: 32px;
		position: relative;
		transform-style: preserve-3d;
	}

	.nf-layer {
		position: absolute;
		inset: 0;
		color: hsl(36 55% calc(46% - var(--i) * 2.2%));
		transform: translateZ(calc(var(--half) - (var(--i) + 1) * var(--step)));
	}

	.nf-face {
		position: relative;
		display: block;
		transform: translateZ(var(--half));
		color: transparent;
		background: linear-gradient(115deg, #fff2cf 0%, var(--gold-light) 30%, var(--gold) 50%, var(--gold-light) 70%, #fff2cf 100%);
		background-size: 250% 100%;
		-webkit-background-clip: text;
		background-clip: text;
		animation: nf-shine 6s ease-in-out infinite;
	}

	.nf-ring {
		position: absolute;
		top: 50%;
		left: 50%;
		width: var(--ring-size);
		aspect-ratio: 1;
		translate: -50% -50%;
		border: 1px solid rgba(217, 169, 78, 0.28);
		border-radius: 50%;
		transform: rotateX(var(--tilt)) rotateY(var(--roll)) rotateZ(0deg);
		animation: nf-orbit var(--orbit) linear infinite;
	}

	.nf-ring-reverse {
		animation-direction: reverse;
	}

	.nf-ring::before {
		content: "";
		position: absolute;
		top: 0;
		left: 50%;
		width: 9px;
		height: 9px;
		translate: -50% -50%;
		border-radius: 50%;
		background: var(--gold-light);
		box-shadow: 0 0 14px 3px rgba(243, 206, 142, 0.65);
	}

	.nf-shadow {
		position: absolute;
		bottom: -2.2rem;
		left: 50%;
		width: 62%;
		height: 26px;
		translate: -50% 0;
		border-radius: 50%;
		background: radial-gradient(ellipse, rgba(0, 0, 0, 0.75), transparent 70%);
		filter: blur(8px);
		animation: nf-shadow 5s ease-in-out infinite;
	}

	/* ---------- Copy & actions ---------- */

	.nf-title {
		max-width: 620px;
		margin: 4rem auto 0;
		color: #fff;
		font: 800 clamp(1.7rem, 4vw, 3.1rem)/1.05 system-ui, sans-serif;
		letter-spacing: -0.04em;
	}

	.nf-copy {
		max-width: 520px;
		margin: 1rem auto 0;
		color: #a9aaad;
		font: 400 1rem/1.7 system-ui, sans-serif;
	}

	.nf-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.85rem;
		margin-top: 2rem;
	}

	.nf-action {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 48px;
		padding: 0 1.5rem;
		overflow: hidden;
		border-radius: 999px;
		font: 700 0.9rem/1 system-ui, sans-serif;
		text-decoration: none;
		transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
	}

	.nf-action:hover,
	.nf-action:focus-visible {
		transform: translateY(-3px);
	}

	.nf-action:focus-visible {
		outline: 3px solid rgba(217, 169, 78, 0.5);
		outline-offset: 4px;
	}

	.nf-action-primary {
		color: #0b0c0e;
		background: linear-gradient(135deg, var(--gold-light), var(--gold));
		box-shadow: 0 8px 24px rgba(217, 169, 78, 0.22);
	}

	.nf-action-primary::after {
		content: "";
		position: absolute;
		inset: 0;
		background: linear-gradient(105deg, transparent 35%, rgba(255, 255, 255, 0.55) 50%, transparent 65%);
		transform: translateX(-120%);
	}

	.nf-action-primary:hover,
	.nf-action-primary:focus-visible {
		box-shadow: 0 14px 32px rgba(217, 169, 78, 0.35);
	}

	.nf-action-primary:hover::after,
	.nf-action-primary:focus-visible::after {
		transform: translateX(120%);
		transition: transform 700ms ease;
	}

	.nf-action-secondary {
		color: #f8f7f2;
		border: 1px solid rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.04);
		backdrop-filter: blur(6px);
	}

	.nf-action-secondary:hover,
	.nf-action-secondary:focus-visible {
		border-color: rgba(217, 169, 78, 0.7);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
	}

	/* ---------- Entrance ---------- */

	.nf-reveal {
		animation: nf-rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) calc(var(--d) * 110ms + 150ms) both;
	}

	/* ---------- Keyframes ---------- */

	@keyframes nf-emerge {
		from { opacity: 0; scale: 0.6; translate: 0 60px; }
	}

	@keyframes nf-rise {
		from { opacity: 0; transform: translateY(24px); filter: blur(6px); }
	}

	@keyframes nf-float {
		0%, 100% { transform: translateY(0) rotateZ(-1deg); }
		50%      { transform: translateY(-14px) rotateZ(1deg); }
	}

	@keyframes nf-shine {
		0%, 100% { background-position: 100% 0; }
		50%      { background-position: 0 0; }
	}

	@keyframes nf-orbit {
		from { transform: rotateX(var(--tilt)) rotateY(var(--roll)) rotateZ(0deg); }
		to   { transform: rotateX(var(--tilt)) rotateY(var(--roll)) rotateZ(360deg); }
	}

	@keyframes nf-spin {
		from { transform: rotateX(20deg) rotateY(0deg); }
		to   { transform: rotateX(380deg) rotateY(360deg); }
	}

	@keyframes nf-bob {
		0%, 100% { translate: 0 0; }
		50%      { translate: 0 -16px; }
	}

	@keyframes nf-scroll {
		to { background-position: 0 64px; }
	}

	@keyframes nf-breathe {
		0%, 100% { transform: scale(0.95); opacity: 0.7; }
		50%      { transform: scale(1.08); opacity: 1; }
	}

	@keyframes nf-shadow {
		0%, 100% { transform: scaleX(1); opacity: 0.9; }
		50%      { transform: scaleX(0.84); opacity: 0.55; }
	}

	/* ---------- Responsive ---------- */

	@media (max-width: 640px) {
		.nf-page { padding-inline: 1rem; }
		.nf-title { margin-top: 3.25rem; }
		.nf-copy { font-size: 0.95rem; }
		.nf-action { width: min(100%, 260px); }
		.nf-hide-mobile { display: none; }
		.nf-digits-inner { --half: 22px; --step: 3px; }
	}

	/* ---------- Reduced motion ---------- */

	@media (prefers-reduced-motion: reduce) {
		.nf-page *,
		.nf-page *::before,
		.nf-page *::after {
			animation: none !important;
			transition: none !important;
		}
	}
`;