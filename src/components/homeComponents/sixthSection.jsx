import React from 'react';

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

const MapPinIcon = (props) => (
  <Icon {...props}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
);

const HQ_LOCATION = {
  title: "AVENZO STUDIO",
  address: "Office #202, 2nd Floor, M Yousuf Chamber, Shahrah-e-Faisal, Karachi",
  mapSrc: "https://maps.google.com/maps?q=24.8684446,67.08328&hl=en&z=18&output=embed",
  status: "Studio Active",
};

export default function SixthSection() {
  return (
    <section className="relative w-full bg-[#07080a] py-28 px-6 lg:px-10 text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 select-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-[#D9A94E]/10 blur-[170px] animate-pulse duration-[4000ms]" />
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <section className="relative z-10 h-[500px] w-full border-t border-white/10">
        <div className="absolute top-6 left-6 z-10 hidden max-w-md flex-col gap-3 rounded-2xl border border-white/10 bg-black/90 p-5 shadow-2xl backdrop-blur-md sm:flex">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D9A94E]">Our Location</span>
          </div>

          <div className="flex items-start gap-3 pt-1">
            <div className="rounded-xl bg-[#D9A94E] p-2.5 text-black">
              <MapPinIcon className="h-5 w-5 text-black" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{HQ_LOCATION.title}</h4>
              <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                {HQ_LOCATION.address}
              </p>
            </div>
          </div>
        </div>

        <a
          href="https://www.google.com/maps/place/AVENZO+STUDIO+(Software+Company)/@24.8684796,67.0806772,17z/data=!3m1!4b1!4m6!3m5!1s0x3eb33fd81696f527:0xc7778de435ecb796!8m2!3d24.8684748!4d67.0832521!16s%2Fg%2F11zxmq_qdt?entry=ttu&g_ep=EgoyMDI2MDkxNS4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noreferrer"
          className="absolute right-6 top-6 z-10 inline-flex items-center gap-2 rounded-full border border-[#D9A94E]/60 bg-black/90 px-4 py-2.5 text-sm font-semibold text-[#F3CE8E] shadow-2xl backdrop-blur-md transition-colors duration-300 hover:border-[#D9A94E] hover:bg-[#D9A94E] hover:text-black"
        >
          <MapPinIcon className="h-4 w-4" />
          View on map
        </a>

        <iframe
          title="Our Location Map"
          src={HQ_LOCATION.mapSrc}
          className="h-full w-full border-0 grayscale contrast-125 opacity-90 transition-all duration-500 hover:grayscale-0"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>

      <div className="relative z-10 mx-auto max-w-7xl">

        <footer className="mt-24 border-t border-white/10 pt-12 pb-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">

            <div className="col-span-2 space-y-4">
              <span className="text-xl font-bold tracking-wider text-white">
                PLATFORM<span className="text-[#D9A94E]">.</span>
              </span>
              <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                Engineering resilient modern applications with transparent milestones, dedicated engineering talent, and scalable software architecture.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white mb-3">Navigation</p>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li><a href="#" className="hover:text-[#D9A94E] transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-[#D9A94E] transition-colors">Process</a></li>
                <li><a href="#" className="hover:text-[#D9A94E] transition-colors">Work</a></li>
                <li><a href="#" className="hover:text-[#D9A94E] transition-colors">Reviews</a></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white mb-3">Technologies</p>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li><a href="#" className="hover:text-[#D9A94E] transition-colors">React &amp; Next.js</a></li>
                <li><a href="#" className="hover:text-[#D9A94E] transition-colors">Tailwind CSS</a></li>
                <li><a href="#" className="hover:text-[#D9A94E] transition-colors">Node &amp; Express</a></li>
                <li><a href="#" className="hover:text-[#D9A94E] transition-colors">PostgreSQL &amp; Redis</a></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white mb-3">Legal</p>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li><a href="#" className="hover:text-[#D9A94E] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#D9A94E] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#D9A94E] transition-colors">Security Overview</a></li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-6 text-[11px] text-neutral-500 gap-4">
            <p>© {new Date().getFullYear()} Platform Inc. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Engineered with precision &amp; high performance.
            </p>
          </div>
        </footer>

      </div>
    </section>
  );
} 