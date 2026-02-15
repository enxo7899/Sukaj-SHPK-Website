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
  title: "Sukaj SHPK | Industrial Plastic Pipe Systems",
  description: "Sukaj SHPK supplies and manufactures industrial plastic pipe systems for civil, agricultural, and industrial projects across the Balkans.",
  keywords: ["infrastructure", "pipes", "HDPE", "PVC", "sewage", "Albania", "Balkans", "Konti", "FITT"],
  authors: [{ name: "Sukaj SHPK" }],
  openGraph: {
    title: "Sukaj SHPK | Industrial Plastic Components",
    description: "Supplier and manufacturer of pipe and conduit systems since 1995.",
    type: "website",
    locale: "en_US",
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
                  "@type": "Corporation",
                  "name": "Sukaj SHPK",
                  "description": "Supplier and manufacturer of industrial plastic pipe systems in the Balkans.",
                  "foundingDate": "1995",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Shkoder",
                    "addressCountry": "Albania"
                  }
                },
                {
                  "@type": "WholesaleStore",
                  "name": "Sukaj SHPK",
                  "priceRange": "$$$",
                  "areaServed": "Balkans",
                  "description": "Wholesale and project supply of civil, agricultural, and industrial plastic pipe systems."
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-slate-950 text-slate-50 overflow-x-hidden`}
      >
        <div className="relative min-h-screen">
          <Navigation />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
