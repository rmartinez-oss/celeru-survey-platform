export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Celeru Survey Platform
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Customer experience surveys integrated with Freshworks ecosystem
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-green-100 border border-green-200 rounded-full">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-green-700 font-medium">PoC Phase - Ready for Testing</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Database */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="text-3xl mb-4">🗄️</div>
            <h3 className="text-lg font-semibold mb-2">Multi-Tenant Database</h3>
            <p className="text-gray-600 text-sm">
              SQLite database with organizations, users, surveys, and responses ready for scaling
            </p>
            <div className="mt-3 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
              ✓ Working
            </div>
          </div>

          {/* Templates */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="text-3xl mb-4">📋</div>
            <h3 className="text-lg font-semibold mb-2">Survey Templates</h3>
            <p className="text-gray-600 text-sm">
              Pre-built NPS and CSAT templates using SurveyJS engine
            </p>
            <div className="mt-3 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
              ✓ Ready
            </div>
          </div>

          {/* Webhook */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="text-3xl mb-4">🔗</div>
            <h3 className="text-lg font-semibold mb-2">Freshdesk Integration</h3>
            <p className="text-gray-600 text-sm">
              Webhook receiver for automatic survey triggering from Freshdesk events
            </p>
            <div className="mt-3 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
              → Next Step
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Current Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-sm text-gray-600">Tables Created</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">2</div>
              <div className="text-sm text-gray-600">Survey Templates</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-sm text-gray-600">Test Responses</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">1</div>
              <div className="text-sm text-gray-600">Webhook Endpoint</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">100%</div>
              <div className="text-sm text-gray-600">Ready for Demo</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Test Survey Demo
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
              Test Webhook
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              View Database
            </button>
          </div>
          
          <div className="text-sm text-gray-500">
            <p><strong>Webhook URL:</strong> http://localhost:3000/api/webhooks/freshdesk/[orgId]</p>
            <p><strong>Database:</strong> SQLite ready for PostgreSQL migration</p>
          </div>
        </div>

        {/* Roadmap */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Development Roadmap</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-green-600 mb-2">✅ Phase 1 (PoC) - Complete</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Multi-tenant database</li>
                <li>• Survey templates (NPS, CSAT)</li>
                <li>• Webhook receiver</li>
                <li>• Basic response storage</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-600 mb-2">🚧 Phase 2 (Beta) - Next</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• User authentication</li>
                <li>• Custom branding</li>
                <li>• Email delivery</li>
                <li>• Analytics dashboard</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-purple-600 mb-2">🔮 Phase 3 (Launch)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• White-label complete</li>
                <li>• Custom domains</li>
                <li>• Billing system</li>
                <li>• Go-to-market</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>Built for <strong>Celeru</strong> • Powered by Next.js, Prisma & SurveyJS</p>
        </div>
      </div>
    </div>
  )
}
