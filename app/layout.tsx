import type { Metadata } from "next";
import { Manrope, Instrument_Serif, Caveat } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BackgroundAscii } from "@/components/BackgroundAscii";
import { site } from "@/lib/site";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vimarsh.design"),
  title: {
    default: "Vimarsh Tiwari — Product Designer",
    template: "%s — Vimarsh Tiwari",
  },
  description: "Product designer for consumer apps used by 20M+ people. Currently at AllEvents.",
  keywords: ["product designer", "growth design", "B2C design", "AllEvents", "Vimarsh Tiwari"],
  authors: [{ name: "Vimarsh Tiwari" }],
  icons: {
    icon: "/images/profile/profile.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${instrumentSerif.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <BackgroundAscii />
        <Nav statusText={site.status.label} />
        <main>{children}</main>
        <Footer 
          email={site.email} 
          socials={site.socials} 
        />
      </body>
    </html>
  );
}
