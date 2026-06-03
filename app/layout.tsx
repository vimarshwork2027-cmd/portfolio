import type { Metadata } from "next";
import { Manrope, Instrument_Serif, Caveat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BackgroundAscii } from "@/components/BackgroundAscii";
import { GenerativeSong } from "@/components/GenerativeSong";
import { LiveStatus } from "@/components/LiveStatus";
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
  description: "Product designer obsessed with growth, retention, and consumer apps at scale.",
  keywords: ["product designer", "growth design", "B2C design", "AllEvents", "Vimarsh Tiwari"],
  authors: [{ name: "Vimarsh Tiwari" }],
  icons: {
    icon: "/images/about/about.JPG",
    apple: "/images/about/about.JPG",
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
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wlxn1972vu");
          `}
        </Script>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XF4HV30HJ4" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XF4HV30HJ4');
          `}
        </Script>
        <BackgroundAscii />
        <Nav statusText={site.status.label} />
        <main>{children}</main>
        <Footer 
          email={site.email} 
          socials={site.socials} 
        />
        <GenerativeSong />
        <LiveStatus />
      </body>
    </html>
  );
}
