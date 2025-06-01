import { Pizza, TrendingUp, Clock, DollarSign, Star, Truck } from "lucide-react"

export function PizzaOverviewDashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-950 via-red-950 to-black">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <Pizza className="w-20 h-20 text-orange-400" />
          </div>
          <h1 className="text-6xl font-bold text-white mb-6">Pizza Analytics Dashboard</h1>
          <p className="text-xl text-orange-200 mb-8 max-w-3xl mx-auto">
            Comprehensive business intelligence for pizza operations - from order patterns to delivery optimization and
            topping preferences
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
              <h3 className="text-2xl font-bold text-white mb-2">50K+</h3>
              <p className="text-orange-200">Orders Analyzed</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
              <h3 className="text-2xl font-bold text-white mb-2">98.5%</h3>
              <p className="text-orange-200">Customer Satisfaction</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
              <h3 className="text-2xl font-bold text-white mb-2">15min</h3>
              <p className="text-orange-200">Avg Delivery Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Key Performance Indicators</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-zinc-900/50 border border-orange-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm">Daily Revenue</p>
                  <p className="text-3xl font-bold text-white">$12,450</p>
                </div>
                <DollarSign className="w-10 h-10 text-green-400" />
              </div>
              <p className="text-xs text-green-400 mt-2">+18% from yesterday</p>
            </div>

            <div className="bg-zinc-900/50 border border-orange-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm">Orders Today</p>
                  <p className="text-3xl font-bold text-white">287</p>
                </div>
                <Pizza className="w-10 h-10 text-orange-400" />
              </div>
              <p className="text-xs text-orange-400 mt-2">Peak: Friday 7-9 PM</p>
            </div>

            <div className="bg-zinc-900/50 border border-orange-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm">Avg Delivery Time</p>
                  <p className="text-3xl font-bold text-white">14.5min</p>
                </div>
                <Clock className="w-10 h-10 text-blue-400" />
              </div>
              <p className="text-xs text-blue-400 mt-2">-2min from last week</p>
            </div>

            <div className="bg-zinc-900/50 border border-orange-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm">Customer Rating</p>
                  <p className="text-3xl font-bold text-white">4.8</p>
                </div>
                <Star className="w-10 h-10 text-yellow-400" />
              </div>
              <p className="text-xs text-yellow-400 mt-2">Based on 1,234 reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Sections Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Analytics Modules</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Volume Preview */}
            <div className="bg-zinc-900/50 border border-orange-700 rounded-lg p-8 hover:bg-zinc-900/70 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Order Volume Analysis</h3>
              </div>
              <p className="text-orange-200 mb-6">
                Track daily order patterns, identify peak hours, and analyze weekly trends to optimize staffing and
                inventory.
              </p>
              <ul className="space-y-2 text-sm text-orange-300 mb-6">
                <li>• Daily order volume by day of week</li>
                <li>• Hourly peak analysis</li>
                <li>• Seasonal trend identification</li>
                <li>• Revenue correlation analysis</li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                View Order Analytics
              </button>
            </div>

            {/* Delivery & Experience Preview */}
            <div className="bg-zinc-900/50 border border-orange-700 rounded-lg p-8 hover:bg-zinc-900/70 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-8 h-8 text-green-400" />
                <h3 className="text-xl font-bold text-white">Delivery & Experience</h3>
              </div>
              <p className="text-orange-200 mb-6">
                Monitor delivery performance, customer satisfaction, and identify areas for service improvement.
              </p>
              <ul className="space-y-2 text-sm text-orange-300 mb-6">
                <li>• Delivery time optimization</li>
                <li>• Customer satisfaction tracking</li>
                <li>• Driver performance metrics</li>
                <li>• Geographic delivery analysis</li>
              </ul>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                View Delivery Analytics
              </button>
            </div>

            {/* Topping Optimization Preview */}
            <div className="bg-zinc-900/50 border border-orange-700 rounded-lg p-8 hover:bg-zinc-900/70 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Pizza className="w-8 h-8 text-orange-400" />
                <h3 className="text-xl font-bold text-white">Topping Optimization</h3>
              </div>
              <p className="text-orange-200 mb-6">
                Analyze topping preferences, optimize inventory, and discover profitable combinations.
              </p>
              <ul className="space-y-2 text-sm text-orange-300 mb-6">
                <li>• Popular topping combinations</li>
                <li>• Inventory optimization</li>
                <li>• Profit margin analysis</li>
                <li>• Seasonal preference trends</li>
              </ul>
              <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors">
                View Topping Analytics
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
