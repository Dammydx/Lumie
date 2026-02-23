import Layout from '../components/layout/Layout'
import Breadcrumbs from '../components/common/Breadcrumbs'

export default function TermsPage() {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Terms & Conditions' },
            ]}
          />

          <h1 className="text-4xl font-bold mt-8 mb-2">Terms & Conditions</h1>
          <p className="text-gray-600 mb-12">Last updated: February 2026</p>

          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Agreement</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Lumié website, you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to abide by the above, please
                do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Use of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                You agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Use the Service only for lawful purposes</li>
                <li>Not engage in any conduct that restricts or inhibits anyone's use or enjoyment</li>
                <li>Not post or transmit fraudulent, defamatory, or harmful content</li>
                <li>Not attempt to gain unauthorized access to the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Product Information</h2>
              <p className="text-gray-700 leading-relaxed">
                We strive to provide accurate product descriptions and pricing. However, we do not
                warrant that product descriptions, pricing, or other content is accurate, complete,
                or error-free. Prices are subject to change without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. User Accounts</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                When creating an account, you are responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Providing accurate and complete information</li>
                <li>Maintaining the confidentiality of your password</li>
                <li>All activities under your account</li>
                <li>Notifying us of unauthorized account access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Payment Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                All payments are processed through third-party payment providers. By completing a
                purchase, you authorize the payment amount. We reserve the right to refuse or cancel
                orders at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                TO THE FULLEST EXTENT PERMITTED BY LAW, LUMIÉ SHALL NOT BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, REGARDLESS OF THE CAUSE OF
                ACTION OR THE THEORY OF LIABILITY.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                Content on Lumié (text, graphics, logos, images) is protected by copyrights and
                other intellectual property laws. You may not reproduce, distribute, or transmit
                without our written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time. Your continued use of the
                Service constitutes acceptance of updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms & Conditions are governed by and construed in accordance with the laws
                of Nigeria, and you irrevocably submit to the exclusive jurisdiction of the courts
                located in Lagos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Contact</h2>
              <p className="text-gray-700 leading-relaxed">
                Questions about these Terms & Conditions should be directed to:
                <br />
                <strong>Email</strong>: legal@lumie.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  )
}
