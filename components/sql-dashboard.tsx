"use client"

import { useState } from "react"
import {
  BarChart3,
  Database,
  Download,
  Filter,
  Play,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Calendar,
} from "lucide-react"


type QueryResult = {
  id: number
  product_name: string
  category: string
  sales: number
  revenue: number
  growth: string
}

const sampleData: QueryResult[] = [
  { id: 1, product_name: "iPhone 15", category: "Electronics", sales: 1250, revenue: 1125000, growth: "+15%" },
  { id: 2, product_name: "MacBook Pro", category: "Electronics", sales: 890, revenue: 2225000, growth: "+8%" },
  { id: 3, product_name: "AirPods Pro", category: "Electronics", sales: 2100, revenue: 525000, growth: "+22%" },
  { id: 4, product_name: "Nike Air Max", category: "Fashion", sales: 1680, revenue: 252000, growth: "+12%" },
  { id: 5, product_name: "Levi's Jeans", category: "Fashion", sales: 950, revenue: 95000, growth: "+5%" },
]

export function SQLDashboard() {
  const [activeQuery, setActiveQuery] = useState(0)
  const [isExecuting, setIsExecuting] = useState(false)

  const queries = [
    {
      title: "Top Selling Products by Revenue",
      description: "Analyze which products generate the most revenue",
      sql: `SELECT 
  p.product_name,
  p.category,
  COUNT(o.order_id) as sales,
  SUM(o.total_amount) as revenue,
  ROUND(
    ((SUM(o.total_amount) - LAG(SUM(o.total_amount)) 
      OVER (ORDER BY DATE_TRUNC('month', o.order_date))) 
     / LAG(SUM(o.total_amount)) 
      OVER (ORDER BY DATE_TRUNC('month', o.order_date))) * 100, 2
  ) as growth_rate
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
JOIN orders o ON oi.order_id = o.order_id
WHERE o.order_date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY p.product_name, p.category
ORDER BY revenue DESC
LIMIT 10;`,
    },
    {
      title: "Monthly Sales Trend Analysis",
      description: "Track sales performance over time",
      sql: `WITH monthly_sales AS (
  SELECT 
    DATE_TRUNC('month', order_date) as month,
    COUNT(*) as total_orders,
    SUM(total_amount) as monthly_revenue,
    COUNT(DISTINCT customer_id) as unique_customers
  FROM orders 
  WHERE order_date >= CURRENT_DATE - INTERVAL '12 months'
  GROUP BY DATE_TRUNC('month', order_date)
)
SELECT 
  month,
  total_orders,
  monthly_revenue,
  unique_customers,
  LAG(monthly_revenue) OVER (ORDER BY month) as prev_month_revenue,
  ROUND(
    ((monthly_revenue - LAG(monthly_revenue) OVER (ORDER BY month)) 
     / LAG(monthly_revenue) OVER (ORDER BY month)) * 100, 2
  ) as growth_percentage
FROM monthly_sales
ORDER BY month DESC;`,
    },
    {
      title: "Customer Segmentation Analysis",
      description: "Segment customers based on purchase behavior",
      sql: `WITH customer_metrics AS (
  SELECT 
    c.customer_id,
    c.customer_name,
    COUNT(o.order_id) as total_orders,
    SUM(o.total_amount) as total_spent,
    AVG(o.total_amount) as avg_order_value,
    MAX(o.order_date) as last_purchase_date,
    CURRENT_DATE - MAX(o.order_date) as days_since_last_purchase
  FROM customers c
  LEFT JOIN orders o ON c.customer_id = o.customer_id
  GROUP BY c.customer_id, c.customer_name
)
SELECT 
  customer_name,
  total_orders,
  total_spent,
  avg_order_value,
  days_since_last_purchase,
  CASE 
    WHEN total_spent > 5000 AND days_since_last_purchase <= 30 THEN 'VIP Active'
    WHEN total_spent > 2000 AND days_since_last_purchase <= 60 THEN 'High Value'
    WHEN total_orders > 5 AND days_since_last_purchase <= 90 THEN 'Regular'
    WHEN days_since_last_purchase > 180 THEN 'At Risk'
    ELSE 'New/Low Value'
  END as customer_segment
FROM customer_metrics
ORDER BY total_spent DESC;`,
    },
  ]

  const executeQuery = async () => {
    setIsExecuting(true)
    // Simulate query execution
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsExecuting(false)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="w-8 h-8 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold">Retail Analytics Dashboard</h1>
                <p className="text-zinc-400">SQL-Powered Business Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4" />
                Export Report
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors">
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* SQL Query Panel */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-400" />
                SQL Queries
              </h2>

              <div className="space-y-3">
                {queries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveQuery(index)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      activeQuery === index ? "border-blue-500 bg-blue-500/10" : "border-zinc-700 hover:border-zinc-600"
                    }`}
                  >
                    <h3 className="font-medium text-sm">{query.title}</h3>
                    <p className="text-xs text-zinc-400 mt-1">{query.description}</p>
                  </button>
                ))}
              </div>

              {/* SQL Code Display */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Query Code</h3>
                  <button
                    onClick={executeQuery}
                    disabled={isExecuting}
                    className="flex items-center gap-2 px-3 py-1 bg-blue-600 rounded text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <Play className="w-3 h-3" />
                    {isExecuting ? "Executing..." : "Run Query"}
                  </button>
                </div>
                <div className="bg-black border border-zinc-700 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-xs text-green-400 whitespace-pre-wrap">{queries[activeQuery].sql}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-400">$4.2M</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-xs text-green-400 mt-2">+12% from last month</p>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm">Total Orders</p>
                    <p className="text-2xl font-bold text-blue-400">6,870</p>
                  </div>
                  <ShoppingCart className="w-8 h-8 text-blue-400" />
                </div>
                <p className="text-xs text-blue-400 mt-2">+8% from last month</p>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm">Active Customers</p>
                    <p className="text-2xl font-bold text-purple-400">2,340</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <p className="text-xs text-purple-400 mt-2">+15% from last month</p>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm">Avg Order Value</p>
                    <p className="text-2xl font-bold text-orange-400">$612</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-400" />
                </div>
                <p className="text-xs text-orange-400 mt-2">+5% from last month</p>
              </div>
            </div>

            {/* Charts Grid */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RevenueChart />
              <OrdersChart />
              <CategoryPieChart />
              <TopProductsChart />
            </div> */}

            Customer Segment Chart - Full Width
            {/* <CustomerSegmentChart /> */}

            {/* Query Results Table */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg">
              <div className="p-6 border-b border-zinc-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    {queries[activeQuery].title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Calendar className="w-4 h-4" />
                    Last 30 days
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-zinc-900">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-zinc-300">Product</th>
                      <th className="text-left p-4 text-sm font-medium text-zinc-300">Category</th>
                      <th className="text-right p-4 text-sm font-medium text-zinc-300">Sales</th>
                      <th className="text-right p-4 text-sm font-medium text-zinc-300">Revenue</th>
                      <th className="text-right p-4 text-sm font-medium text-zinc-300">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleData.map((row, index) => (
                      <tr key={row.id} className={index % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900/50"}>
                        <td className="p-4 font-medium">{row.product_name}</td>
                        <td className="p-4 text-zinc-400">{row.category}</td>
                        <td className="p-4 text-right">{row.sales.toLocaleString()}</td>
                        <td className="p-4 text-right font-medium">{formatCurrency(row.revenue)}</td>
                        <td className="p-4 text-right">
                          <span className="text-green-400 font-medium">{row.growth}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
