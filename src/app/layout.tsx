import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "Sukaj SHPK | Industrial Plastic Pipe Systems - Albania",
  description: "Leading supplier of industrial plastic pipe systems in the Balkans since 1995. Partnering with 12 manufacturers across 7 countries for HDPE, PP, PVC pipes, hoses, and recycling solutions.",
  keywords: [
    "plastic pipes Albania",
    "HDPE pipes Balkans",
    "sewage pipes",
    "corrugated pipes",
    "irrigation systems",
    "industrial hoses",
    "Konti Hidroplast",
    "FITT hoses",
    "Ferplast Kosovo",
    "Teqja International",
    "PE100 pipes",
    "infrastructure solutions",
    "wholesale pipes Albania",
  ],
  authors: [{ name: "Sukaj SHPK" }],
  creator: "Sukaj SHPK",
  publisher: "Sukaj SHPK",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sukaj-shpk.com",
    siteName: "Sukaj SHPK",
    title: "Sukaj SHPK | Industrial Plastic Pipe Systems - Balkans Leader",
    description: "12 manufacturing partners across 7 countries. Complete pipe solutions for civil drainage, agricultural irrigation, and industrial projects since 1995.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sukaj SHPK - Industrial Plastic Pipe Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sukaj SHPK | Industrial Plastic Pipe Systems",
    description: "Leading supplier of HDPE, PP, PVC pipes and hoses across the Balkans since 1995.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://sukaj-shpk.com",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "name": "Sukaj SHPK",
                  "legalName": "Sukaj SHPK",
                  "description": "Leading supplier and distributor of industrial plastic pipe systems, hoses, and recycling solutions across the Balkans since 1995.",
                  "foundingDate": "1995",
                  "url": "https://sukaj-shpk.com",
                  "logo": "https://sukaj-shpk.com/logo.svg",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Shkodër",
                    "addressRegion": "Shkodër County",
                    "addressCountry": "AL"
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "Sales",
                    "areaServed": ["AL", "XK", "MK", "RS", "ME", "GR"],
                    "availableLanguage": ["Albanian", "English"]
                  },
                  "sameAs": [
                    "https://www.linkedin.com/company/sukaj-shpk"
                  ],
                  "numberOfEmployees": {
                    "@type": "QuantitativeValue",
                    "value": "30+"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "reviewCount": "150"
                  }
                },
                {
                  "@type": "WholesaleStore",
                  "name": "Sukaj SHPK",
                  "priceRange": "$$$",
                  "areaServed": {
                    "@type": "GeoCircle",
                    "geoMidpoint": {
                      "@type": "GeoCoordinates",
                      "latitude": "42.0687",
                      "longitude": "19.5033"
                    },
                    "geoRadius": "500000"
                  },
                  "description": "Wholesale distribution of HDPE, PP, PVC pipes, industrial hoses, and plastic recycling solutions for civil, agricultural, and industrial infrastructure projects.",
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Industrial Plastic Pipe Systems",
                    "itemListElement": [
                      {
                        "@type": "OfferCatalog",
                        "name": "Civil Engineering Pipes",
                        "itemListElement": [
                          {
                            "@type": "Offer",
                            "itemOffered": {
                              "@type": "Product",
                              "name": "HDPE Corrugated Pipes",
                              "description": "Double-wall corrugated HDPE pipes for sewage and drainage"
                            }
                          }
                        ]
                      },
                      {
                        "@type": "OfferCatalog",
                        "name": "Agricultural Systems",
                        "itemListElement": [
                          {
                            "@type": "Offer",
                            "itemOffered": {
                              "@type": "Product",
                              "name": "Irrigation Hoses",
                              "description": "Garden and agricultural irrigation hoses"
                            }
                          }
                        ]
                      }
                    ]
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-slate-950 text-slate-50 overflow-x-hidden`}
      >
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <div className="relative min-h-screen">
          <Navigation />
          <main id="main-content" role="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
