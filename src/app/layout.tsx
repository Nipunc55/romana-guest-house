import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Romana Guest House | Cozy Garden Oasis in Rome",
  description: "Experience the perfect Roman holiday at Romana Guest House in Infernetto. Nestled in a green residential area close to Ostia Antica ruins, Ostia beach, and Fiumicino Airport.",
  keywords: [
    "Romana Guest House",
    "Rome guest house",
    "Infernetto accommodation",
    "Ostia beach lodging",
    "Rome airport shuttle hotel",
    "Ostia Antica guest house",
    "Rome boutique stay",
  ],
  authors: [{ name: "Romana Guest House" }],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Romana Guest House | Cozy Garden Oasis in Rome",
    description: "Relaxing garden stay near Rome’s historic center, Ostia beach, and Fiumicino Airport.",
    url: "https://romanaguesthouse.net",
    siteName: "Romana Guest House",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
