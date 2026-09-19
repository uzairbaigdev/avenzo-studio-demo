import { useMemo, useRef, useState } from "react";
import Navigation from "../../components/navigation/navigation.jsx";
import SixthSection from "../../components/homeComponents/sixthSection.jsx";

const FAQS = [
	["What is Avenzo Studio?", "Avenzo Studio is a web development agency founded in 2024 that builds custom websites, digital products, business platforms, and automated solutions."],
	["What services does Avenzo Studio provide?", "Our services include portfolio development, business website development, automated websites, e-commerce development, custom websites, SEO, AI integration, AI agent integration, digital marketing, database integration, frontend development, backend development, full stack development, MERN development, data optimization, content writing, and AI automation tools."],
	["When was Avenzo Studio founded?", "Avenzo Studio was founded in 2024."],
	["How many projects has Avenzo Studio delivered?", "Avenzo Studio has delivered more than 10 projects."],
	["What makes Avenzo Studio different from a template provider?", "We build around your actual requirements, workflows, and audience instead of forcing your business into a pre-built template."],
	["Do you build portfolio websites?", "Yes. We create professional portfolio websites with clear case studies, responsive layouts, fast performance, and contact paths that keep your work central."],
	["Do you build business websites?", "Yes. Business websites can include services pages, credibility sections, lead forms, location information, and SEO-ready structure."],
	["Do you build e-commerce websites?", "Yes. We build e-commerce experiences with product catalogs, shopping carts, checkout flows, payment integrations, and inventory-ready structures."],
	["Can you build a completely custom website?", "Yes. Custom websites are planned and developed around your specific goals, content, user journeys, and business processes."],
	["Do you automate websites and business workflows?", "Yes. We connect forms, notifications, databases, webhooks, booking tools, and other workflow steps to reduce repetitive manual work."],
	["Do you provide SEO services?", "Yes. We provide technical SEO foundations, search-friendly page structures, performance improvements, and content guidance."],
	["What does AI integration include?", "AI integration can connect practical AI capabilities to a website, product, or internal workflow with clear controls and reliable output handling."],
	["Do you integrate AI agents?", "Yes. We design task-focused AI agents that connect approved tools and data sources, follow defined workflows, and support human handoffs."],
	["Do you provide digital marketing services?", "Yes. We help align your website, message, landing pages, and audience journey with clear digital growth goals."],
	["Can you integrate databases with a website?", "Yes. We connect applications with databases and external data sources using secure, reliable read and write workflows."],
	["Do you provide frontend development?", "Yes. Frontend development covers responsive interfaces, reusable components, accessibility, interactions, and polished user experiences."],
	["Do you provide backend development?", "Yes. Backend development can include APIs, authentication, permissions, server logic, database workflows, and integrations."],
	["Do you offer full stack development?", "Yes. Full stack projects connect the frontend, backend, database, integrations, and deployment into one coordinated product."],
	["Do you offer MERN stack development?", "Yes. MERN development combines MongoDB, Express.js, React, and Node.js into a cohesive JavaScript application stack."],
	["Can you optimize existing data systems?", "Yes. Data optimization can include structure reviews, cleanup, indexing, workflow improvements, and scalable reporting foundations."],
	["Do you write blogs and website content?", "Yes. We write clear, useful blogs, service copy, and SEO-aware content that explains your value to the right audience."],
	["What AI and automation tools do you work with?", "We select and connect practical AI and automation tools based on your workflow, data, security needs, and business goals."],
	["Which programming languages do you use?", "Our listed capabilities include JavaScript, Python, C++, HTML, and CSS, along with frameworks and platforms suited to each project."],
	["Do you work with React?", "Yes. React is used for fast, reusable, component-based interfaces and scalable frontend applications."],
	["Do you work with Node.js and Express.js?", "Yes. Node.js and Express.js are used for server-side JavaScript services, APIs, routing, and backend workflows."],
	["Do you work with Django?", "Yes. Django can be used for structured Python web applications with maintainable models, views, and workflows."],
	["Do you work with MongoDB?", "Yes. MongoDB can support flexible document data models when that approach fits the application requirements."],
	["Do you work with Firebase?", "Yes. Firebase can provide authentication, real-time data, cloud functions, hosting, and related backend services."],
	["Do you work with Supabase?", "Yes. Supabase can provide database, authentication, storage, and API capabilities for modern applications."],
	["Do you use Tailwind CSS?", "Yes. Tailwind CSS can be used to build consistent, responsive, and maintainable interface styling."],
	["Do you use Bootstrap?", "Yes. Bootstrap can be used when its responsive components and established layout system suit the project."],
	["Do you use Postman?", "Yes. Postman supports API testing, validation, documentation, and dependable integration workflows."],
	["Do you use Git and GitHub?", "Yes. Git and GitHub support source control, collaboration, organized branches, and repository delivery."],
	["What happens during discovery?", "We clarify your goals, audience, content, workflows, technical requirements, and project scope before development begins."],
	["What happens during design?", "We shape the information structure, interface direction, responsive behavior, and key user journeys around the approved scope."],
	["What happens during development?", "We build the agreed frontend, backend, database, integrations, and content structure in a coordinated implementation process."],
	["What happens before launch?", "We test the experience, review responsive behavior, validate important workflows, resolve issues, and prepare the production release."],
	["How long does a project take?", "The timeline depends on scope. Standard websites commonly take 2 to 4 weeks, while e-commerce and custom applications commonly take 4 to 8 weeks."],
	["Do you provide a fixed project quote?", "Yes. After the scope is understood, we can provide a clear project proposal and quote for the requested work."],
	["Can you work with an existing website?", "Yes. We can review an existing website and recommend focused improvements, integrations, optimization, or a structured rebuild."],
	["Do you improve website performance?", "Yes. Website optimization can address loading speed, responsive behavior, accessibility, code structure, and conversion friction."],
	["Do you create responsive websites?", "Yes. Interfaces are designed to work clearly across mobile phones, tablets, laptops, and desktop displays."],
	["Do you provide post-launch support?", "Yes. Support can include maintenance, performance checks, security updates, content changes, bug fixes, and future features."],
	["Who owns the source code?", "You retain full ownership of the source code, design assets, and repository access after project completion."],
	["Will I receive repository access?", "Yes. Repository access and the relevant project files are provided as part of the delivery process."],
	["Do you communicate directly with clients?", "Yes. Clients communicate directly with the engineers working on their project for clear progress and decisions."],
	["Do you document the delivered work?", "Yes. We provide clean, documented code and practical project information to support future maintenance."],
	["Do you connect third-party APIs?", "Yes. We connect suitable REST APIs, backend services, payment providers, automation tools, and other approved integrations."],
	["Can you add authentication and user accounts?", "Yes. Projects can include secure sign-up, login, permissions, and account workflows when required by the scope."],
	["How do I start a project with Avenzo Studio?", "Contact us with your goals, current situation, desired timeline, and any relevant references. We will use that information to define the next step."],
];

const GOLD = "#D9A94E";
const CUBE_SIZE = 112;
const CUBE_FACES = ["rotateY(0deg)", "rotateY(90deg)", "rotateY(180deg)", "rotateY(-90deg)", "rotateX(90deg)", "rotateX(-90deg)"];

const FLOATING_TAGS = [
	{ label: "Services", x: -170, y: -110, z: 70, delay: "0s" },
	{ label: "Process", x: 96, y: -46, z: 110, delay: "-1.8s" },
	{ label: "Ownership", x: -130, y: 96, z: 90, delay: "-3.4s" },
];

const HIGHLIGHTS = ["Direct access to your engineers", "Full source code ownership", "Post-launch support"];

const ITEMS = FAQS.map(([question, answer], id) => ({ id, question, answer }));

const PAGE_CSS = `
.faq-cube { transform: rotateX(-24deg) rotateY(-30deg); animation: faq-cube-spin 24s linear infinite; }
.faq-ring { animation: faq-ring-spin 18s linear infinite; }
.faq-ring-reverse { animation: faq-ring-spin-reverse 26s linear infinite; }
.faq-float { animation: faq-float 6s ease-in-out infinite; }
@keyframes faq-cube-spin {
	from { transform: rotateX(-24deg) rotateY(0deg); }
	to { transform: rotateX(-24deg) rotateY(360deg); }
}
@keyframes faq-ring-spin {
	from { transform: rotateX(72deg) rotateZ(0deg); }
	to { transform: rotateX(72deg) rotateZ(360deg); }
}
@keyframes faq-ring-spin-reverse {
	from { transform: rotateX(72deg) rotateZ(360deg); }
	to { transform: rotateX(72deg) rotateZ(0deg); }
}
@keyframes faq-float {
	0%, 100% { transform: translateY(0); }
	50% { transform: translateY(-12px); }
}
@media (prefers-reduced-motion: reduce) {
	.faq-cube, .faq-ring, .faq-ring-reverse, .faq-float { animation: none !important; }
}
`;

const prefersReducedMotion = () =>
	typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function SearchIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
			<circle cx="11" cy="11" r="7" />
			<path d="m20 20-3.5-3.5" />
		</svg>
	);
}

function FAQItem({ id, question, answer, isOpen, onToggle }) {
	const cardRef = useRef(null);

	const handlePointerMove = (event) => {
		const card = cardRef.current;
		if (!card || event.pointerType !== "mouse" || prefersReducedMotion()) return;
		const rect = card.getBoundingClientRect();
		const px = (event.clientX - rect.left) / rect.width;
		const py = (event.clientY - rect.top) / rect.height;
		card.style.transform = `rotateX(${((0.5 - py) * 2.4).toFixed(2)}deg) rotateY(${((px - 0.5) * 3.2).toFixed(2)}deg) translateZ(6px)`;
	};

	const handlePointerLeave = () => {
		if (cardRef.current) cardRef.current.style.transform = "";
	};

	return (
		<li style={{ perspective: "1200px" }}>
			<div
				ref={cardRef}
				onPointerMove={handlePointerMove}
				onPointerLeave={handlePointerLeave}
				className="relative rounded-2xl border"
				style={{
					transformStyle: "preserve-3d",
					background: "linear-gradient(145deg, #16181c 0%, #0b0c0e 100%)",
					borderColor: isOpen ? "rgba(217,169,78,0.45)" : "rgba(255,255,255,0.08)",
					boxShadow: isOpen
						? "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(217,169,78,0.12), 0 28px 50px -24px rgba(217,169,78,0.28), 0 30px 40px -24px rgba(0,0,0,0.95)"
						: "inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 4px rgba(0,0,0,0.5), 0 16px 28px -16px rgba(0,0,0,0.9)",
					transition: "transform 220ms ease-out, box-shadow 320ms ease, border-color 320ms ease",
				}}
			>
				<span
					aria-hidden="true"
					className="pointer-events-none absolute bottom-5 left-0 top-5 w-[3px] rounded-full"
					style={{
						background: "linear-gradient(to bottom, #F3D28B, #B8862F)",
						opacity: isOpen ? 1 : 0,
						transition: "opacity 320ms ease",
					}}
				/>

				<button
					type="button"
					id={`faq-trigger-${id}`}
					aria-expanded={isOpen}
					aria-controls={`faq-panel-${id}`}
					onClick={onToggle}
					className="relative flex w-full items-center justify-between gap-6 rounded-2xl px-5 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A94E]/60 sm:px-7"
					style={{ transformStyle: "preserve-3d" }}
				>
					<span className="text-sm font-semibold text-white sm:text-base">{question}</span>
					<span
						aria-hidden="true"
						className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
						style={{
							transform: "translateZ(14px)",
							color: isOpen ? "#1a1204" : GOLD,
							background: isOpen
								? "linear-gradient(145deg, #F3D28B, #B8862F)"
								: "linear-gradient(145deg, #23262c, #121417)",
							borderColor: isOpen ? "rgba(243,210,139,0.7)" : "rgba(217,169,78,0.35)",
							boxShadow: isOpen
								? "inset 0 1px 0 rgba(255,255,255,0.45), 0 8px 16px -6px rgba(217,169,78,0.55)"
								: "inset 0 1px 0 rgba(255,255,255,0.08), 0 6px 12px -6px rgba(0,0,0,0.9)",
							transition: "background 300ms ease, color 300ms ease, box-shadow 300ms ease, border-color 300ms ease",
						}}
					>
						<span className={`text-xl font-light leading-none transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
					</span>
				</button>

				<div
					id={`faq-panel-${id}`}
					className="grid"
					style={{
						gridTemplateRows: isOpen ? "1fr" : "0fr",
						transition: "grid-template-rows 380ms cubic-bezier(0.22, 1, 0.36, 1)",
					}}
				>
					<div className="min-h-0 overflow-hidden" style={{ visibility: isOpen ? "visible" : "hidden", transition: "visibility 380ms" }}>
						<div className="px-5 pb-6 sm:px-7">
							<div
								className="mb-4 h-px"
								style={{ background: "linear-gradient(90deg, rgba(217,169,78,0.5), rgba(255,255,255,0.06) 60%, transparent)" }}
							/>
							<p className="max-w-3xl text-sm leading-relaxed text-neutral-300 sm:text-[15px]">{answer}</p>
						</div>
					</div>
				</div>
			</div>
		</li>
	);
}

export default function FAQ() {
	const [openId, setOpenId] = useState(null);
	const [query, setQuery] = useState("");
	const stageRef = useRef(null);

	const results = useMemo(() => {
		const term = query.trim().toLowerCase();
		if (!term) return ITEMS;
		return ITEMS.filter((item) => item.question.toLowerCase().includes(term) || item.answer.toLowerCase().includes(term));
	}, [query]);

	const isSearching = query.trim().length > 0;

	const handleHeroMove = (event) => {
		const stage = stageRef.current;
		if (!stage || event.pointerType !== "mouse" || prefersReducedMotion()) return;
		const rect = event.currentTarget.getBoundingClientRect();
		const px = (event.clientX - rect.left) / rect.width - 0.5;
		const py = (event.clientY - rect.top) / rect.height - 0.5;
		stage.style.transform = `rotateX(${(-py * 18).toFixed(2)}deg) rotateY(${(px * 26).toFixed(2)}deg)`;
	};

	const handleHeroLeave = () => {
		if (stageRef.current) stageRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
	};

	return (
		<main className="min-h-screen bg-[#050505] text-white">
			<style>{PAGE_CSS}</style>
			<Navigation />

			<section
				onPointerMove={handleHeroMove}
				onPointerLeave={handleHeroLeave}
				className="relative overflow-hidden border-b border-white/10 px-6 pb-24 pt-36 lg:px-10"
				style={{
					background:
						"radial-gradient(ellipse at 18% 0%, rgba(217,169,78,0.12), transparent 55%), linear-gradient(to bottom, #0c0d0f, #08090a 60%, #050505)",
				}}
			>
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-x-0 bottom-0 h-72 overflow-hidden"
					style={{
						WebkitMaskImage: "linear-gradient(to top, black, transparent 90%)",
						maskImage: "linear-gradient(to top, black, transparent 90%)",
					}}
				>
					<div
						className="absolute"
						style={{
							left: "-50%",
							right: "-50%",
							bottom: 0,
							height: "200%",
							backgroundImage:
								"linear-gradient(rgba(217,169,78,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(217,169,78,0.16) 1px, transparent 1px)",
							backgroundSize: "52px 52px",
							transform: "perspective(520px) rotateX(62deg)",
							transformOrigin: "center bottom",
						}}
					/>
				</div>

				<div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
					<div className="text-center lg:text-left">
						<h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">Questions, answered clearly.</h1>
						<p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg lg:mx-0">
							Clear answers about our services, process, technology, pricing, ownership, and support.
						</p>

						<div className="relative mx-auto mt-8 max-w-xl lg:mx-0">
							<label htmlFor="faq-search" className="sr-only">
								Search the FAQ
							</label>
							<span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
								<SearchIcon />
							</span>
							<input
								id="faq-search"
								type="text"
								inputMode="search"
								autoComplete="off"
								value={query}
								onChange={(event) => setQuery(event.target.value)}
								placeholder="Search services, process, technology..."
								className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-4 pl-12 pr-12 text-sm text-white placeholder:text-neutral-500 focus:border-[#D9A94E]/60 focus:outline-none focus:ring-2 focus:ring-[#D9A94E]/20 sm:text-base"
								style={{ boxShadow: "inset 0 2px 6px rgba(0,0,0,0.5), 0 14px 30px -16px rgba(0,0,0,0.9)" }}
							/>
							{isSearching && (
								<button
									type="button"
									onClick={() => setQuery("")}
									aria-label="Clear search"
									className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-lg text-neutral-400 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A94E]/60"
								>
									&times;
								</button>
							)}
						</div>

						<ul className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
							{HIGHLIGHTS.map((label) => (
								<li
									key={label}
									className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-neutral-300"
									style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}
								>
									{label}
								</li>
							))}
						</ul>
					</div>

					<div className="hidden lg:block">
						<div aria-hidden="true" className="relative mx-auto h-[380px] w-[380px]" style={{ perspective: "1000px" }}>
							<div ref={stageRef} className="absolute inset-0" style={{ transformStyle: "preserve-3d", transition: "transform 180ms ease-out" }}>
								<div
									className="absolute rounded-full"
									style={{
										left: "50%",
										top: "50%",
										width: 320,
										height: 320,
										marginLeft: -160,
										marginTop: -160,
										background: "radial-gradient(circle, rgba(217,169,78,0.22), transparent 65%)",
										transform: "translateZ(-80px)",
									}}
								/>
								<div
									className="absolute"
									style={{
										left: "50%",
										bottom: 30,
										width: 190,
										height: 28,
										marginLeft: -95,
										borderRadius: "50%",
										background: "radial-gradient(ellipse, rgba(217,169,78,0.32), transparent 70%)",
										transform: "translateZ(-60px)",
									}}
								/>

								<div
									className="faq-ring absolute rounded-full"
									style={{
										left: "50%",
										top: "50%",
										width: 300,
										height: 300,
										marginLeft: -150,
										marginTop: -150,
										border: "1px solid rgba(217,169,78,0.18)",
										borderTopColor: "rgba(243,210,139,0.95)",
									}}
								/>
								<div
									className="faq-ring-reverse absolute rounded-full"
									style={{
										left: "50%",
										top: "50%",
										width: 220,
										height: 220,
										marginLeft: -110,
										marginTop: -110,
										border: "1px solid rgba(217,169,78,0.14)",
										borderBottomColor: "rgba(217,169,78,0.85)",
									}}
								/>

								<div
									className="faq-cube absolute"
									style={{
										left: "50%",
										top: "50%",
										width: CUBE_SIZE,
										height: CUBE_SIZE,
										marginLeft: -CUBE_SIZE / 2,
										marginTop: -CUBE_SIZE / 2,
										transformStyle: "preserve-3d",
									}}
								>
									{CUBE_FACES.map((rotation) => (
										<div
											key={rotation}
											className="absolute inset-0 flex items-center justify-center text-5xl font-bold"
											style={{
												transform: `${rotation} translateZ(${CUBE_SIZE / 2}px)`,
												backfaceVisibility: "hidden",
												color: "#F3D28B",
												background: "linear-gradient(145deg, rgba(217,169,78,0.3), rgba(20,16,8,0.94))",
												border: "1px solid rgba(217,169,78,0.6)",
												boxShadow: "inset 0 0 26px rgba(217,169,78,0.22)",
											}}
										>
											?
										</div>
									))}
								</div>

								{FLOATING_TAGS.map((tag) => (
									<div
										key={tag.label}
										className="absolute whitespace-nowrap"
										style={{
											left: "50%",
											top: "50%",
											transformStyle: "preserve-3d",
											transform: `translate3d(${tag.x}px, ${tag.y}px, ${tag.z}px)`,
										}}
									>
										<div
											className="faq-float rounded-xl border px-4 py-2 text-xs font-semibold"
											style={{
												animationDelay: tag.delay,
												color: "#F3D28B",
												background: "rgba(14,15,17,0.9)",
												borderColor: "rgba(217,169,78,0.35)",
												boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 14px 24px -10px rgba(0,0,0,0.9)",
											}}
										>
											{tag.label}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-4xl px-6 py-12 lg:px-10 lg:py-20">
				<div className="mb-6 flex items-center justify-between gap-4">
					<p className="text-sm text-neutral-400" aria-live="polite">
						{isSearching ? `${results.length} of ${ITEMS.length} questions` : `${ITEMS.length} questions`}
					</p>
					{openId !== null && (
						<button
							type="button"
							onClick={() => setOpenId(null)}
							className="rounded-lg px-3 py-1.5 text-sm text-neutral-400 transition-colors hover:bg-white/[0.06] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A94E]/60"
						>
							Collapse answer
						</button>
					)}
				</div>

				{results.length > 0 ? (
					<ul className="space-y-4">
						{results.map((item) => (
							<FAQItem
								key={item.id}
								id={item.id}
								question={item.question}
								answer={item.answer}
								isOpen={openId === item.id}
								onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
							/>
						))}
					</ul>
				) : (
					<div
						className="rounded-2xl border border-white/10 px-6 py-14 text-center"
						style={{
							background: "linear-gradient(145deg, #16181c 0%, #0b0c0e 100%)",
							boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 28px -16px rgba(0,0,0,0.9)",
						}}
					>
						<p className="text-base font-semibold text-white">No questions match &ldquo;{query.trim()}&rdquo;</p>
						<p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-neutral-400">
							Try a shorter keyword such as &ldquo;SEO&rdquo;, &ldquo;React&rdquo;, or &ldquo;support&rdquo;, or clear the search to see every question.
						</p>
						<button
							type="button"
							onClick={() => setQuery("")}
							className="mt-6 rounded-xl border border-[#D9A94E]/40 px-5 py-2.5 text-sm font-semibold text-[#F3D28B] transition-colors hover:bg-[#D9A94E]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A94E]/60"
						>
							Clear search
						</button>
					</div>
				)}
			</section>

			<SixthSection />
		</main>
	);
}