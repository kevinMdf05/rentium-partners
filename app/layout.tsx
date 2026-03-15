import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://rentiumpartners.fr"
  ),
  title: {
    default:
      "Rentium Partners — Gestion comptable et fiscale immobilière d'excellence",
    template: "%s | Rentium Partners",
  },
  description:
    "Rentium Partners accompagne les investisseurs immobiliers exigeants dans la gestion comptable et fiscale de leurs biens LMNP et SCI à l'IR. Simple, sécurisé, souverain.",
  keywords: [
    "LMNP",
    "SCI IR",
    "gestion comptable immobilière",
    "fiscalité immobilière",
    "déclaration fiscale LMNP",
    "comptabilité SCI",
    "investissement immobilier",
    "optimisation fiscale",
    "location meublée",
    "expert comptable immobilier",
  ],
  authors: [{ name: "Rentium Partners" }],
  creator: "Rentium Partners",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Rentium Partners",
    title: "Rentium Partners — Gestion immobilière d'excellence",
    description:
      "Gestion comptable et fiscale sur mesure pour investisseurs LMNP et SCI à l'IR.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rentium Partners — Gestion immobilière d'excellence",
    description:
      "Gestion comptable et fiscale sur mesure pour investisseurs LMNP et SCI à l'IR.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Rentium Partners",
  description:
    "Gestion comptable et fiscale immobilière haut de gamme — LMNP et SCI à l'IR",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://rentiumpartners.fr",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    addressCountry: "FR",
  },
  areaServed: {
    "@type": "Country",
    name: "France",
  },
  serviceType: [
    "Gestion comptable LMNP",
    "Comptabilité SCI à l'IR",
    "Déclaration fiscale immobilière",
    "Optimisation fiscale",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="theme-color" content="#080808" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased grain-overlay`}
      >
        <a href="#main-content" className="skip-to-content">
          Aller au contenu principal
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
