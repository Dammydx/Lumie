import Layout from '../components/layout/Layout'
import Breadcrumbs from '../components/common/Breadcrumbs'

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Privacy Policy' },
            ]}
          />

          <h1 className="text-4xl font-bold mt-8 mb-2">Privacy Policy</h1>
          <p className="text-gray-600 mb-12">Last updated: February 2026</p>

          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Lumié ("we", "us", "our", or "Company") operates the Lumié e-commerce website (the
                "Service"). This page informs you of our policies regarding the collection, use, and
                disclosure of personal data when you use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Information Collection</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
                  <p className="text-gray-700">
                    We collect information you voluntarily provide, including:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mt-2">
                    <li>Name, email address, and phone number</li>
                    <li>Shipping and billing addresses</li>
                    <li>Payment information (processed by payment providers)</li>
                    <li>Product preferences and reviews</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Automatic Information</h3>
                  <p className="text-gray-700">
                    We automatically collect:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mt-2">
                    <li>Browser type and version</li>
                    <li>IP address and location</li>
                    <li>Pages visited and time spent</li>
                    <li>Referring URL and device information</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Use of Information</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We use collected information to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Process and fulfill orders</li>
                <li>Send transactional and promotional emails</li>
                <li>Improve website functionality and user experience</li>
                <li>Prevent fraud and maintain security</li>
                <li>Comply with legal obligations</li>
                <li>Customer support and communication</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement industry-standard security measures including SSL encryption, secure
                data centers, and access controls. However, no method of internet transmission is
                completely secure. We cannot guarantee absolute security of your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Data Sharing</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We do not sell personal information. We may share data with:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Payment processors (Paystack, Stripe, Flutterwave)
                </li>
                <li>Shipping partners for delivery</li>
                <li>Legal authorities if required by law</li>
                <li>Service providers who assist our operations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Access your personal data</li>
                <li>Request corrections to inaccurate data</li>
                <li>Request deletion of your account and data</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies to enhance your browsing experience. You can disable cookies in
                browser settings, but this may affect website functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have questions about this Privacy Policy, contact us at:
                <br />
                <strong>Email</strong>: privacy@lumie.com
                <br />
                <strong>Address</strong>: Lagos, Nigeria
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  )
}
