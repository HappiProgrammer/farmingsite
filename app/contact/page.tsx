import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/seo";
import ContactForm from "@/components/shared/ContactForm";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with the AIVDP/SOWEDA oil-palm farmer development platform — enquire about seedlings, nurseries, partnerships, or the project.",
  path: "/contact",
});

const contactChannels = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    label: "Email",
    value: "[PROJECT EMAIL ADDRESS]",
    href: null,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Phone",
    value: "[PROJECT PHONE NUMBER]",
    href: null,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.559 4.14 1.533 5.878L0 24l6.29-1.51A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.035-1.382l-.36-.214-3.733.896.933-3.625-.235-.372A9.818 9.818 0 0112 2.182c5.427 0 9.818 4.39 9.818 9.818 0 5.427-4.391 9.818-9.818 9.818z" />
      </svg>
    ),
    label: "WhatsApp",
    value: "[WHATSAPP CONTACT NUMBER]",
    href: null, // set to wa.me/[number] when real number is provided
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    label: "Location",
    value: "[PROJECT OFFICE ADDRESS — AREA LEVEL ONLY]",
    href: null,
  },
] as const;

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* ── Page hero ─────────────────────────────────────────────────────── */}
      <section
        className="bg-surface-dark pt-[calc(var(--nav-height)+2rem)] pb-10 sm:pb-16 lg:pb-24 sm:pt-[calc(var(--nav-height)+3rem)] lg:pt-[calc(var(--nav-height)+4rem)]"
        aria-labelledby="contact-hero-heading"
      >
        <div className="container-content max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Get in touch
          </p>
          <h1
            id="contact-hero-heading"
            className="font-display text-display-xl font-bold text-white"
          >
            Contact
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/65">
            Enquire about seedling availability, nursery partnerships, project
            information, or press and media. We will get back to you as quickly
            as possible.
          </p>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <section
        className="section-padding bg-white"
        aria-labelledby="contact-form-heading"
      >
        <div className="container-content grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-16">
          {/* Form column */}
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow="Send a message"
              heading="How can we help?"
              id="contact-form-heading"
            />
            <ContactForm />
          </div>

          {/* Contact details sidebar */}
          <aside aria-label="Contact details">
            <div className="sticky top-28 flex flex-col gap-6">
              <h2 className="font-display text-lg font-bold text-ink">
                Contact details
              </h2>

              <div className="flex flex-col gap-4">
                {contactChannels.map(({ icon, label, value, href }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 rounded-card border border-border bg-off-white p-3 sm:p-4"
                  >
                    <div className="mt-0.5 flex-shrink-0 text-accent">
                      {icon}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold uppercase tracking-widest text-ink-light">
                        {label}
                      </span>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm font-medium text-ink transition-colors hover:text-accent"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-sm font-medium text-ink-mid italic">
                          {value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Seedling buyers note */}
              <div className="rounded-card-lg bg-accent-light p-5 border border-accent/20">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                  Looking for seedlings?
                </p>
                <p className="text-sm leading-relaxed text-ink-mid">
                  Browse the farmer directory to contact nursery producers
                  directly. Each farmer profile includes a WhatsApp contact
                  link where available.
                </p>
                <a
                  href="/nurseries"
                  className="mt-3 inline-block text-sm font-semibold text-accent transition-colors hover:text-accent-dark"
                >
                  Explore nurseries →
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
