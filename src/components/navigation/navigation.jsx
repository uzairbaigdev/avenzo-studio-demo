import logo from "../../assets/avenzo-logo-transparent.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const ACTIVE_LINK_CLASSES =
  "relative inline-flex items-center rounded-full px-5 py-2 text-sm font-medium text-[#141008] bg-gradient-to-b from-[#F3CE8E] to-[#C6922E] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_4px_14px_rgba(217,169,78,0.35)] transition-transform duration-200";
const INACTIVE_LINK_CLASSES =
  "relative inline-flex items-center rounded-full px-5 py-2 text-sm font-medium text-neutral-300 transition-all duration-200 hover:text-white hover:bg-white/10 hover:-translate-y-0.5";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Price", path: "/pricing" },
  { label: "Contact", path: "/contact" },
  { label: "Review", path: "/review" },
  { label: "FAQ", path: "/faq" },
];

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeLink =
    NAV_LINKS.find((link) => link.path === location.pathname)?.label ?? "Home";

  return (
    <header className="fixed top-0 left-0 z-50 w-full overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#1c1c1e] via-black to-black shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      {/* glossy sheen highlight */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_140%_at_50%_-40%,rgba(255,255,255,0.10),transparent_60%)]" />

      {/* top bevel highlight, full width */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
        {/* Logo + company name */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
            setMobileMenuOpen(false);
          }}
          className="group relative flex items-center gap-3 shrink-0"
        >
          <span className="absolute -inset-3 rounded-full bg-[#D9A94E]/25 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <img
            src={logo}
            alt="Avenzo Studio"
            className="relative h-10 w-auto drop-shadow-[0_2px_14px_rgba(217,169,78,0.35)]"
          />
          <div className="relative flex flex-col leading-none">
            <span className="text-lg font-bold tracking-wide text-white">
              AVEN<span className="text-[#D9A94E]">ZO</span>
            </span>
            <span className="text-[10px] font-medium tracking-[0.35em] text-[#D9A94E]">
              STUDIO
            </span>
          </div>
        </a>

        {/* Center pill nav */}
        <ul className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] p-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(link.path);
                }}
                className={
                  activeLink === link.label
                    ? ACTIVE_LINK_CLASSES
                    : INACTIVE_LINK_CLASSES
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right cluster */}
        <div className="hidden md:flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 font-mono text-xs text-[#D9A94E]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D9A94E] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#D9A94E]" />
            </span>
            status: available
          </div>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/contact");
            }}
            className="group relative inline-flex h-11 items-center justify-center rounded-full p-[1px] bg-gradient-to-r from-[#F3CE8E] via-[#D9A94E] to-[#8a6a2c] shadow-[0_6px_24px_rgba(217,169,78,0.3)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            <span className="flex h-full w-full items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-[#F0C382] transition-colors duration-200 group-hover:bg-transparent group-hover:text-[#141008]">
              Get in touch
            </span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-200 transition-colors duration-200 hover:border-[#D9A94E]/50"
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/95 px-6 py-6 backdrop-blur-xl transition-all">
          <ul className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(link.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    activeLink === link.label
                      ? "bg-gradient-to-r from-[#F3CE8E] to-[#C6922E] text-[#141008]"
                      : "text-neutral-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 font-mono text-xs text-[#D9A94E] w-fit">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D9A94E] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#D9A94E]" />
              </span>
              status: available
            </div>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/contact");
                setMobileMenuOpen(false);
              }}
              className="flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#F3CE8E] via-[#D9A94E] to-[#8a6a2c] text-sm font-medium text-[#141008] shadow-[0_6px_24px_rgba(217,169,78,0.3)]"
            >
              Get in touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
