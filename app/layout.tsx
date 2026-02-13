import type { Metadata } from "next";
import { DM_Sans, Bebas_Neue, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";

// Bold, geometric display font for headings
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Clean, modern sans-serif for body text
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

// Monospace for code/tech aesthetic
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oleksiy Kravtsov - Portfolio",
  description:
    "Portfolio von Oleksiy Kravtsov - Softwareentwickler und Informatik-Student an der Leibniz Universität Hannover",
  keywords: [
    "Softwareentwickler",
    "Portfolio",
    "Informatik",
    "Python",
    "Java",
    "C",
    "Web Development",
  ],
  authors: [{ name: "Oleksiy Kravtsov" }],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#DBD3CA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${dmSans.variable} ${bebasNeue.variable} ${ibmPlexMono.variable}`}>
      <body className="antialiased bg-brand-background text-brand-text font-sans">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
