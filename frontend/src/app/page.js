import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick operation button */}
        <div className="flex gap-4 mb-8">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            + Transaction
          </button>
          <button className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
            + Request
          </button>
        </div>

        {/* Flat Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">🏠 Test Apartments</h2>
          <p className="text-gray-600">Members: John, Sarah, Mike, Emma</p>
        </div>

        {/* Budget Status - Two cards side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Budget Remaining */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-gray-500 text-sm mb-2">Budget Remaining</h3>
            <p className="text-3xl font-bold text-green-600">￡350.00</p>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-green-500 rounded-full" style={{ width: '35%' }}></div>
            </div>
          </div>

          {/* Budget Spent */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-gray-500 text-sm mb-2">Budget Spent</h3>
            <p className="text-3xl font-bold text-indigo-600">￡650.00</p>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-indigo-500 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div>
                <p className="font-medium">Electricity Bill</p>
                <p className="text-sm text-gray-500">Paid by John • 2 hours ago</p>
              </div>
              <span className="font-semibold text-red-600">-￡85.50</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div>
                <p className="font-medium">Groceries</p>
                <p className="text-sm text-gray-500">Paid by Sarah • yesterday</p>
              </div>
              <span className="font-semibold text-red-600">-￡120.30</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div>
                <p className="font-medium">Internet</p>
                <p className="text-sm text-gray-500">Paid by Mike • 3 days ago</p>
              </div>
              <span className="font-semibold text-red-600">-￡45.00</span>
            </div>
          </div>
          <button className="mt-4 text-indigo-600 text-sm font-medium hover:text-indigo-800">
            View All →
          </button>
        </div>

        {/* Monthly Budget Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Budget Overview</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Rent</span>
                <span className="font-medium">￡800 / ￡800</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-indigo-600 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Utilities</span>
                <span className="font-medium">￡130 / ￡200</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-indigo-600 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Groceries</span>
                <span className="font-medium">￡245 / ￡300</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-indigo-600 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Overview of Pending Requests */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Pending Requests</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <div>
                <p className="font-medium">Emma requested ￡25.00</p>
                <p className="text-sm text-gray-600">For: Pizza night</p>
              </div>
              <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">Pending</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <div>
                <p className="font-medium">Mike requested ￡15.50</p>
                <p className="text-sm text-gray-600">For: Cleaning supplies</p>
              </div>
              <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">Pending</span>
            </div>
          </div>
          <button className="mt-4 text-indigo-600 text-sm font-medium hover:text-indigo-800">
            View All Requests →
          </button>
        </div>
      </main>
    </div>
  );
}
