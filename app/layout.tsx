import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { organizationJsonLd, websiteJsonLd } from "@/lib/utils/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | AIVDP/SOWEDA Oil-Palm Farmer Platform",
    default: "From Support to Growth | AIVDP/SOWEDA Oil-Palm Farmer Platform",
  },
  description:
    "A documentary platform showcasing the real farmers, nurseries, and measurable impact of the AIVDP/SOWEDA oil-palm farmer development project in the South West Region of Cameroon.",
  metadataBase: new URL("https://aivdp-soweda.org"),
  keywords: [
    "oil palm farmers",
    "AIVDP",
    "SOWEDA",
    "South West Region Cameroon",
    "oil palm nursery",
    "improved seedlings",
    "farmer development",
    "palm oil seedlings for sale",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AIVDP/SOWEDA Oil-Palm Farmer Platform",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgLd = organizationJsonLd();
  const webLd = websiteJsonLd();

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex min-h-dvh flex-col">
        {/* Skip navigation link — keyboard and screen-reader accessible */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-agri-yellow focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-forest-deep"
        >
          Skip to main content
        </a>

        {/* Sitewide JSON-LD — Organization + WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([orgLd, webLd]),
          }}
        />

        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
