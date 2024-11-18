import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy - Spend Elon Musk Money',
  description: 'Privacy policy and data collection information for Spend Elon Musk Money simulator game.',
  alternates: {
    canonical: '/privacy-policy'
  }
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-blue-50 text-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold mb-8 text-blue-800">Privacy Policy</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information Collection and Use</h2>
            <p className="mb-4">
              SpendElonMuskMoney.org collects certain information to provide and improve our service.
              This information may include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Device information (browser type, device type, operating system)</li>
              <li>Log data (IP address, access times, pages viewed)</li>
              <li>Usage data (game interactions and preferences)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Advertising</h2>
            <p className="mb-4">
              We use third-party advertising services to display advertisements. These services may use cookies
              and similar technologies to collect information about your browsing activities over time and across different websites.
            </p>
            <p className="mb-4">
              Our advertising partners include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Google AdSense</li>
              <li>Ezoic Ads Network</li>
              <li>Other third-party ad networks</li>
            </ul>
            <p className="mb-4">
              These networks may use cookies, web beacons, and similar technologies to collect information
              for the purpose of providing personalized advertising.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to track activity on our website and store certain information.
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Sharing</h2>
            <p className="mb-4">
              We may share aggregated, non-personally identifiable information with our partners, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Analytics providers</li>
              <li>Advertising networks</li>
              <li>Other trusted partners</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
            <p className="mb-4">
              Our service is not directed to anyone under the age of 13. We do not knowingly collect personal
              information from children under 13. If we discover that a child under 13 has provided us with
              personal information, we will delete it immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting
              the new Privacy Policy on this page and updating the "last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:{' '}
              <a 
                href="mailto:techjits.com@gmail.com" 
                className="text-blue-600 hover:underline"
                rel="noopener noreferrer"
              >
                techjits.com(at)gmail.com
              </a>
            </p>
          </section>
        </div>
        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="text-blue-600 hover:underline"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}