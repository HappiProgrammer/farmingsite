import Link from "next/link";

const footerLinks = [
  {
    heading: "Platform",
    links: [
      { href: "/the-project", label: "The Project" },
      { href: "/impact", label: "Impact" },
      { href: "/stories", label: "Stories" },
    ],
  },
  {
    heading: "Directory",
    links: [
      { href: "/farmers", label: "Farmers" },
      { href: "/nurseries", label: "Nurseries" },
    ],
  },
  {
    heading: "Connect",
    links: [{ href: "/contact", label: "Contact" }],
  },
] as const;

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-white/80" aria-label="Site footer">
      <div className="container-content py-10 sm:py-14 lg:py-20">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block" aria-label="AIVDP / SOWEDA — Home">
              <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-accent">
                AIVDP / SOWEDA
              </span>
              <span className="block font-display text-lg font-bold italic text-white">
                From Support to Growth
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Supporting oil-palm farmers with access to quality planting
              material, nursery development, and agricultural opportunity.
            </p>
          </div>

          {/* Nav columns */}
          {footerLinks.map(({ heading, links }) => (
            <div key={heading}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">
                {heading}
              </h3>
              <ul className="flex flex-col gap-2.5" role="list">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-white/70 transition-colors duration-300 hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} AIVDP / SOWEDA Oil-Palm Farmer Development Platform.
            All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Showcasing real farmers. Real impact.
          </p>
        </div>
      </div>
    </footer>
  );
}
