import { Metadata } from 'next'
import localFont from "next/font/local"
import "./globals.css"
import Script from "next/script"
import SchemaOrg from "./components/SchemaOrg"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.spendelonmuskmoney.org'),
  title: 'Spend Elon Musk Money',
  description: 'Spend Elon Musk money in our interactive simulator! Experience the thrill of allocating billions on luxury items and investments.',
  alternates: {
    canonical: 'https://www.spendelonmuskmoney.org'
  },
  openGraph: {
    title: 'Play Spend Elon Musk Money',
    description: 'Experience the thrill of spending billions through our interactive wealth simulator!',
    url: 'https://www.spendelonmuskmoney.org',
    siteName: 'Spend Elon Musk Money',
    type: 'website',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spend Elon Musk Money',
    description: 'Interactive billionaire fortune simulator',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'G-7RNBNKHZ0C'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <SchemaOrg />
        <link rel="icon" href="/favicon.png" type="image/png" />
        
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}