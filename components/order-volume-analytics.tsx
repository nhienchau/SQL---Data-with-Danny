"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { Calendar, TrendingUp, Clock, Pizza, Database } from "lucide-react"
import { TooltipProps } from 'recharts'
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent'

// Sample data for order volume analysis
const weeklyOrderData = [
  { day: "Monday", orders: 5 },
  { day: "Friday", orders: 5 },
  { day: "Saturday", orders: 3 },
  { day: "Sunday", orders: 1 },
]


const hourlyOrderData = [
  { hour: "11 AM", orders: 1 },
  { hour: "1 PM", orders: 3 },
  { hour: "6 PM", orders: 3 },
  { hour: "7 PM", orders: 1 },
  { hour: "9 PM", orders: 3 },
  { hour: "11 PM", orders: 3 },
]

// const monthlyTrendData = [
//   { month: "Jan", orders: 4250, revenue: 63750 },
//   { month: "Feb", orders: 4180, revenue: 62700 },
//   { month: "Mar", orders: 4890, revenue: 73350 },
//   { month: "Apr", orders: 5120, revenue: 76800 },
//   { month: "May", orders: 5340, revenue: 80100 },
//   { month: "Jun", orders: 5680, revenue: 85200 },
// ]

export function OrderVolumeAnalytics() {
  const [activeQuery, setActiveQuery] = useState(0)

  const queries = [
    {
      title: "Daily Order Volume Analysis",
      description: "Analyze order patterns by day of the week",
      sql: `SELECT
  TO_CHAR(order_time, 'Day') AS day_of_week,
  COUNT(*) AS pizza_count
FROM pizza_runner.customer_orders
GROUP BY 
  day_of_week
ORDER BY day_of_week;`,
    },

    {
      title: "Peak Hours Analysis",
      description: "Identify busiest hours for optimal staffing",
      sql: `SELECT 
  EXTRACT(HOUR FROM order_time) as hour_of_day,
  COUNT(*) as order_count,
  AVG(preparation_time) as avg_prep_time,
  COUNT(CASE WHEN delivery_time > 30 THEN 1 END) as delayed_orders,
  CASE 
    WHEN EXTRACT(DOW FROM order_date) IN (0,6) THEN 'Weekend'
    ELSE 'Weekday'
  END as day_type
FROM orders 
WHERE order_date >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY EXTRACT(HOUR FROM order_time), day_type
ORDER BY hour_of_day;`,
    },
    {
      title: "Total orders",
      description: "Track long-term growth patterns in case this research is upadted more data on numbers of pizza in real-time",
      sql: `SELECT COUNT(*)
FROM pizza_runner.customer_orders;`,
    },
  ]
  //  Error when deploy on Vercel 'ANY' --> Fix
const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900 border border-orange-700 rounded-lg p-3 shadow-lg">
        <p className="text-white font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.dataKey}: ${
              entry.dataKey?.toString().includes('revenue')
                ? `$${entry.value?.toLocaleString()}`
                : entry.value?.toLocaleString()
            }`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-950 via-red-950 to-black">
      {/* Header */}
      <div className="border-b border-orange-700 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-orange-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">Order Analytics</h1>
              <p className="text-orange-200">Daily patterns, peak hours, and growth trends</p>
            </div>
          </div>

          {/* Key Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-zinc-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-orange-200">Busiest Day</span>
              </div>
              <p className="text-xl font-bold text-white">Monday & Friday</p>
              <p className="text-xs text-blue-400">5 orders</p>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-400" />
                <span className="text-sm text-orange-200">Peak Hour</span>
              </div>
              <p className="text-xl font-bold text-white">21-23 PM</p>
              <p className="text-xs text-green-400">3 orders/hour</p>
            </div>
            {/* Reccommendation for future analysis  */}
            {/* <div className="bg-zinc-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-orange-200">Growth Rate</span>
              </div>
              <p className="text-xl font-bold text-white">+12.5%</p>
              <p className="text-xs text-purple-400">Month over month</p>
            </div> */}
            <div className="bg-zinc-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Pizza className="w-5 h-5 text-orange-400" />
                <span className="text-sm text-orange-200">Total</span>
              </div>
              <p className="text-xl font-bold text-white">14</p>
              <p className="text-xs text-orange-400">orders this period</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* SQL Query Panel */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900/50 border border-orange-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
                <Database className="w-5 h-5 text-orange-400" />
                SQL Queries
              </h2>

              <div className="space-y-3">
                {queries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveQuery(index)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${activeQuery === index
                        ? "border-orange-500 bg-orange-500/10"
                        : "border-zinc-700 hover:border-orange-600"
                      }`}
                  >
                    <h3 className="font-medium text-sm text-white">{query.title}</h3>
                    <p className="text-xs text-orange-300 mt-1">{query.description}</p>
                  </button>
                ))}
              </div>

              {/* SQL Code Display */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-white">Query Code</h3>
                  {/* <button className="flex items-center gap-2 px-3 py-1 bg-orange-600 rounded text-sm hover:bg-orange-700 transition-colors text-white">
                    <Play className="w-3 h-3" />
                    Run Query
                  </button> */}
                </div>
                <div className="bg-black border border-zinc-700 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-xs text-green-400 whitespace-pre-wrap">{queries[activeQuery].sql}</pre>
                </div>
              </div>
              {/* Reccommendation */}
              <div>

              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Order Volume */}
            <div className="bg-zinc-900/50 border border-orange-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Weekly Order Volume</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyOrderData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#F97316" />
                  <YAxis stroke="#F97316" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="orders" fill="#F97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Hourly Peak Analysis */}
            <div className="bg-zinc-900/50 border border-orange-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Hourly Order Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={hourlyOrderData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="hour" stroke="#F97316" />
                  <YAxis stroke="#F97316" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="orders" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly Trend */}
            {/* <div className="bg-zinc-900/50 border border-orange-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Monthly Growth Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#F97316" />
                  <YAxis stroke="#F97316" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={3} dot={{ fill: "#3B82F6" }} />
                  <Line type="monotone" dataKey="revenue" stroke="#EF4444" strokeWidth={3} dot={{ fill: "#EF4444" }} />
                </LineChart>
              </ResponsiveContainer>
            </div> */}
          </div>
        </div>
      </div>
    </main>
  )
}
