"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

const navLinks = [
  { href: "/the-project", label: "The Project" },
  { href: "/impact", label: "Impact" },
  { href: "/farmers", label: "Farmers" },
  { href: "/nurseries", label: "Nurseries" },
  { href: "/stories", label: "Stories" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Only use transparent nav on the home page
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
        transparent
          ? "bg-transparent"
          : "bg-white border-b border-border shadow-sm",
      ].join(" ")}
      style={{ height: "var(--nav-height)" }} role="banner"
    >
      <div className="container-content flex h-full items-center justify-between">
        {/* Logo / wordmark */}
        <Link
          href="/"
          className="flex flex-col leading-none"
          aria-label="AIVDP / SOWEDA — Home"
        >
          <span
            className={[
              "hidden text-[0.6rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-400 sm:block",
              transparent ? "text-white/70" : "text-accent",
            ].join(" ")}
          >
            AIVDP / SOWEDA
          </span>
          <span
            className={[
              "font-display text-sm font-bold italic transition-colors duration-400 sm:text-base",
              transparent ? "text-white" : "text-ink",
            ].join(" ")}
          >
            From Support to Growth
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 lg:flex"
        >
          {navLinks.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "relative text-sm font-medium transition-colors duration-300",
                  "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0",
                  "after:bg-accent after:transition-all after:duration-300 hover:after:w-full",
                  transparent
                    ? "text-white/80 hover:text-white"
                    : "text-ink/80 hover:text-ink",
                  active ? "after:w-full !text-accent" : "",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
          <Button href="/nurseries" variant="primary" size="sm">
            Explore Nurseries
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
          className={[
            "flex flex-col gap-1.5 p-3 lg:hidden",
            transparent ? "text-white" : "text-ink",
          ].join(" ")}
        >
          <span
            className={[
              "block h-0.5 w-6 bg-current transition-all duration-300",
              menuOpen ? "translate-y-2 rotate-45" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block h-0.5 w-6 bg-current transition-all duration-300",
              menuOpen ? "opacity-0" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block h-0.5 w-6 bg-current transition-all duration-300",
              menuOpen ? "-translate-y-2 -rotate-45" : "",
            ].join(" ")}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={[
          "absolute top-full left-0 right-0 bg-white border-t border-border",
          "overflow-hidden transition-all duration-400 lg:hidden",
          menuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <nav className="container-content flex flex-col gap-1 py-6">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "rounded-lg px-4 py-4 text-base font-medium transition-colors",
                  active
                    ? "bg-accent-light text-accent"
                    : "text-ink/80 hover:bg-off-white hover:text-ink",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
          <div className="mt-4 px-4">
            <Button href="/nurseries" variant="primary" size="md" className="w-full justify-center">
              Explore Nurseries
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
