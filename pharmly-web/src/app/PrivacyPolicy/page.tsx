// app/privacypolicy/page.tsx
export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/40 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-900 to-slate-800 px-6 py-6 sm:px-8 sm:py-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Privacy Policy</h1>
                <p className="text-indigo-200 text-sm mt-1">Pharmly — trust & transparency first</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 inline-flex items-center gap-2 w-fit border border-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m3.172-5.656l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <a href="https://pharmly.co.in" target="_blank" rel="noopener noreferrer" className="text-white text-sm font-medium hover:underline underline-offset-2 transition">
                  pharmly.co.in
                </a>
              </div>
            </div>
            <div className="mt-4 text-indigo-100 text-sm flex flex-wrap gap-x-4 gap-y-1">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block"></span> Effective: 2026-04-08</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block"></span> Last updated: April 08, 2026</span>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8 sm:px-8 sm:py-10 space-y-8 text-slate-700">
            {/* Secret / No sharing pledge */}
            <div className="bg-indigo-50/50 rounded-xl p-5 border-l-4 border-indigo-500">
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <div className="bg-indigo-100 rounded-full p-2 w-10 h-10 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-indigo-900">🔒 Your data is NEVER shared — it&apos;s our secret commitment</h2>
                  <p className="text-slate-700 mt-1">
                    Pharmly operates with a strict <strong>zero data sharing policy</strong>. Any personal information you provide stays 100% confidential, 
                    used only for core app features. No selling, no third‑party marketing, no unauthorized access. We keep your trust sacred.
                  </p>
                </div>
              </div>
            </div>

            {/* Website & Backend Stack */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-indigo-700 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold">Official Website</span>
                </div>
                <a href="https://pharmly.co.in" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-mono text-sm break-all hover:underline">
                  https://pharmly.co.in
                </a>
                <p className="text-xs text-slate-500 mt-2">Visit our web portal for more information about Pharmly services.</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-emerald-700 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  <span className="font-semibold">Backend stack</span>
                </div>
                <p className="text-sm">
                  <strong>MongoDB · Node.js · Express</strong> — all user information is securely stored in MongoDB, with a robust Node.js + Express backend. 
                  Data is encrypted in transit and at rest, never accessible to outside parties.
                </p>
              </div>
            </div>

            {/* Information Collection & Permissions */}
            <div>
              <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-6 bg-indigo-500 rounded-full"></span> Information collection & permissions
              </h2>
              <p className="mt-2">
                To provide the full Pharmly experience, the Application requires certain personally identifiable information with your explicit permission. 
                This includes:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 marker:text-indigo-500">
                <li>Full name & customer details</li>
                <li>Phone number & WhatsApp number</li>
                <li>Age, address, and medical shop information (if applicable)</li>
                <li>Device identifiers (IP address, OS version, anonymized usage analytics)</li>
              </ul>
              <p className="mt-3 bg-gray-50 p-3 rounded-lg text-sm">
                ✅ All collected data is stored in <strong>MongoDB (NoSQL database)</strong>, managed via a secure Node.js/Express API. 
                The service provider does <strong>NOT</strong> use AI technologies to process your information, and your data is never sold, rented, 
                or shared with any third party — it remains a secret between you and Pharmly.
              </p>
            </div>

            {/* No sharing highlight */}
            <div className="rounded-xl border border-red-100 bg-red-50/40 p-5">
              <div className="flex gap-3 items-start">
                <div className="text-red-600 text-xl">🤐</div>
                <div>
                  <h3 className="font-bold text-red-800">Absolute confidentiality: No data sharing with anyone</h3>
                  <p className="text-slate-700 text-sm mt-1">
                    Your personal information (name, phone, address, medical shop details) will never be disclosed to external individuals, companies, 
                    or organizations. Unlike many apps, Pharmly does not share data with advertisers, data brokers, or any third-party services. 
                    Even trusted partners only receive anonymized, aggregated data that cannot identify you. 
                    The backend (Node/Express + MongoDB) is secured and isolated. <strong>Your privacy is our secret contract.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Third-party services (only aggregated) */}
            <div>
              <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-6 bg-indigo-500 rounded-full"></span> Third-party services & anonymized data
              </h2>
              <p>
                The Application integrates with essential services to improve performance and stability. However, these third parties 
                <strong> do not receive your personal identifiable information</strong>. Only non-identifiable, aggregated data is transmitted. 
                Below are the privacy policies of integrated services:
              </p>
              <div className="flex flex-wrap gap-3 mt-3">
                <a href="https://www.google.com/policies/privacy/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 text-sm bg-indigo-50 px-3 py-1 rounded-full hover:bg-indigo-100 transition">
                  Google Play Services
                </a>
                <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 text-sm bg-indigo-50 px-3 py-1 rounded-full hover:bg-indigo-100 transition">
                  Firebase Analytics
                </a>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                *Firebase & Google Play Services may collect device-level metrics (crash reports, anonymized usage). No name, phone number, address, 
                or medical data is ever shared with these platforms.
              </p>
            </div>

            {/* Data retention, children, security, opt-out */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              <div className="border border-gray-100 rounded-xl p-4 bg-white">
                <span className="font-bold text-indigo-800">📦 Data retention</span>
                <p className="mt-1">User data is retained as long as you use Pharmly + reasonable period afterward. You can request deletion anytime via <span className="font-mono text-xs">niteshr070104@gmail.com</span>.</p>
              </div>
              <div className="border border-gray-100 rounded-xl p-4 bg-white">
                <span className="font-bold text-indigo-800">👶 Children under 13</span>
                <p className="mt-1">Pharmly does not knowingly collect data from children under 13. If identified, we immediately delete information from servers.</p>
              </div>
              <div className="border border-gray-100 rounded-xl p-4 bg-white">
                <span className="font-bold text-indigo-800">🔐 Security measures</span>
                <p className="mt-1">Physical, electronic & procedural safeguards (encrypted storage, secure API endpoints, limited access) protect your information.</p>
              </div>
              <div className="border border-gray-100 rounded-xl p-4 bg-white">
                <span className="font-bold text-indigo-800">✋ Opt-out right</span>
                <p className="mt-1">You can stop all data collection easily by uninstalling the Application via standard device uninstall process.</p>
              </div>
            </div>

            {/* Legal, changes, consent */}
            <div className="text-sm space-y-3 border-t border-gray-200 pt-6 mt-2">
              <p><strong>Legal disclosure:</strong> The Service Provider may disclose information if required by law (subpoena, fraud investigation, government request) but only under strict legal obligations.</p>
              <p><strong>Changes to this policy:</strong> Any updates will be reflected on this page. Continued use of Pharmly implies acceptance of the updated terms.</p>
              <p><strong>Your consent:</strong> By using Pharmly, you consent to this privacy policy and the handling of your information as described — with the absolute guarantee that your data remains secret, unshared, and used exclusively within the Pharmly ecosystem (MongoDB, Node.js, Express).</p>
              
              <div className="bg-slate-100 rounded-lg p-3 mt-3 text-center text-slate-600 text-sm">
                📧 Contact the Service Provider (Nitesh Rai) for any privacy questions: <a href="mailto:niteshr070104@gmail.com" className="text-indigo-700 font-medium underline">niteshr070104@gmail.com</a>
              </div>
              <p className="text-center text-xs text-slate-400 pt-2">
                Pharmly — Built with privacy at its core. No AI, no data selling, just pure confidentiality.
              </p>
            </div>

            <div className="text-[11px] text-center text-slate-400 border-t border-gray-100 pt-5 mt-2">
              Privacy policy enhanced for Pharmly | Original template via App Privacy Policy Generator
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}