import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

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
  title: "Spend Elon Musk Money - spendelonmuskmoney.org",
  description: "Spend Elon Musk money in our interactive simulator! Experience the thrill of allocating billions on luxury items and investments.",
  metadataBase: new URL('https://spendelonmuskmoney.org'),
  openGraph: {
    title: "Spend Elon Musk Money - spendelonmuskmoney.org",
    description: "Spend Elon Musk money in our interactive simulator! Experience the thrill of allocating billions on luxury items and investments.",
    url: 'https://spendelonmuskmoney.org',
    siteName: 'Spend Elon Musk Money',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Spend Elon Musk Money - spendelonmuskmoney.org",
    description: "Spend Elon Musk money in our interactive simulator! Experience the thrill of allocating billions on luxury items and investments.",
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
      <head>
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