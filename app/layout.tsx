import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Spend Elon Musk Money: Ultimate Fortune Simulator Game",
  description: "Experience the thrill of spending Elon Musk's fortune! Play our interactive money simulator and see how you'd spend billions. The ultimate 'Spend Elon Musk Money' game!",
  metadataBase: new URL('https://spendelonmuskmoney.org'),
  openGraph: {
    title: "Spend Elon Musk Money: Ultimate Fortune Simulator Game",
    description: "Experience the thrill of spending Elon Musk's fortune! Play our interactive money simulator and see how you'd spend billions.",
    url: 'https://spendelonmuskmoney.org',
    siteName: 'Spend Elon Musk Money',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Spend Elon Musk Money: Ultimate Fortune Simulator Game",
    description: "Experience the thrill of spending Elon Musk's fortune! Play our interactive money simulator and see how you'd spend billions.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}