import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Finova - Flatmate Expense Manager",
  description: "Manage the expense for flatmates, automatically calculate debts and fairly allocate expenses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
                {/* Add the navigation */}
        <nav className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-indigo-600">Finova</h1>
              </div>

              {/* Navigation Link - Home Add Analytics Requests */}
              <div className="hidden md:flex space-x-8">
                <a href="/" className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                  Home
                </a>
                <a href="/add" className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                  Add
                </a>
                <a href="/analytics" className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                  Analytics
                </a>
                <a href="/requests" className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                  Requests
                </a>
              </div>

              {/* Users menu - Name ▼ */}
              <div className="flex items-center">
                <div className="relative">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
                    <span>Name</span>
                    <span>▼</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* main content part */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
