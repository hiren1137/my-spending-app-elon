import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import SchemaOrg from "./components/SchemaOrg";

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
  title: "Spend Elon Musk Money - Interactive Fortune Simulator",
  description: "Spend Elon Musk money in our interactive simulator! Experience the thrill of allocating billions on luxury items and investments.",
  metadataBase: new URL('https://spendelonmuskmoney.org'),
  keywords: "spend elon musk money, how to spend elon musk money, elon musk money game, elon musk spending simulator",
  openGraph: {
    title: "Spend Elon Musk Money - Interactive Fortune Simulator",
    description: "Spend Elon Musk money in our interactive simulator! Experience the thrill of allocating billions on luxury items and investments.",
    url: 'https://spendelonmuskmoney.org',
    siteName: 'Spend Elon Musk Money',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/spend-elon-musk-money.webp',
        width: 1200,
        height: 630,
        alt: 'Spend Elon Musk Money Simulator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Spend Elon Musk Money - Interactive Fortune Simulator",
    description: "Spend Elon Musk money in our interactive simulator! Experience the thrill of allocating billions on luxury items and investments.",
    images: ['/spend-elon-musk-money.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
      <head>
        <SchemaOrg />
        
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3157767614642943"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7RNBNKHZ0C"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7RNBNKHZ0C');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
