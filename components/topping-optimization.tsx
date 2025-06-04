"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Pizza, TrendingUp, DollarSign, Package, Database, Play, Star } from "lucide-react"
// import { PizzaToppingsTable } from "@/components/pizza-topping-tables"

// Sample data for topping optimization
const popularToppingsData = [
  { topping: "Bacon", orders: 4 },
  { topping: "Chicken", orders: 1 },
  { topping: "Cheese", orders: 1 },
]

const toppingCombinationsData = [
  { combination: "Meatlovers", orders: 10 },
  { combination: "Vegetarian", orders: 4 },
]

const seasonalTrendsData = [
  { month: "Jan", pepperoni: 145, mushrooms: 98, sausage: 87, vegetables: 76 },
  { month: "Feb", pepperoni: 134, mushrooms: 89, sausage: 78, vegetables: 82 },
  { month: "Mar", pepperoni: 156, mushrooms: 102, sausage: 91, vegetables: 89 },
  { month: "Apr", pepperoni: 167, mushrooms: 112, sausage: 95, vegetables: 98 },
  { month: "May", pepperoni: 178, mushrooms: 125, sausage: 103, vegetables: 112 },
  { month: "Jun", pepperoni: 189, mushrooms: 134, sausage: 108, vegetables: 125 },
]

const profitabilityData = [
  { topping: "Bell Peppers", cost: 0.75, price: 3.0, margin: 75, volume: 645 },
  { topping: "Onions", cost: 0.65, price: 3.0, margin: 78, volume: 567 },
  { topping: "Mushrooms", cost: 0.85, price: 3.0, margin: 72, volume: 890 },
  { topping: "Sausage", cost: 0.95, price: 3.0, margin: 68, volume: 756 },
  { topping: "Pepperoni", cost: 1.05, price: 3.0, margin: 65, volume: 1234 },
  { topping: "Extra Cheese", cost: 1.2, price: 3.0, margin: 60, volume: 398 },
  { topping: "Bacon", cost: 1.35, price: 3.0, margin: 55, volume: 345 },
]

const COLORS = ["#F97316", "#10B981", "#3B82F6", "#EF4444", "#8B5CF6", "#F59E0B", "#06B6D4", "#84CC16"]

export function ToppingOptimizationAnalytics() {
  const [activeQuery, setActiveQuery] = useState(0)

  const queries = [
    {
      title: "Popular Topping Analysis",
      description: "Identify most ordered extra toppings which customers added in thier pizza orders",
      sql: `WITH cte_extras AS (
SELECT
  REGEXP_SPLIT_TO_TABLE(extras, '[,\s]+')::INTEGER AS topping_id
FROM pizza_runner.customer_orders
WHERE extras IS NOT NULL AND extras NOT IN ('null', '')
)
SELECT
  topping_name,
  COUNT(*) AS extras_count
FROM cte_extras
INNER JOIN pizza_runner.pizza_toppings
  ON cte_extras.topping_id = pizza_toppings.topping_id
GROUP BY topping_name
ORDER BY extras_count DESC;`,
    },
    {
      title: "Topping Combination Analysis",
      description: "Find profitable topping combinations",
      sql: `WITH cte_cleaned_customer_orders AS (
  SELECT
    order_id,
    customer_id,
    pizza_id,
    CASE
      WHEN exclusions IN ('', 'null') THEN NULL
      ELSE exclusions END
    AS exclusions,
    CASE
      WHEN extras IN ('', 'null') THEN NULL
      ELSE extras END
    AS extras,
    order_time,
    ROW_NUMBER() OVER () AS original_row_number
  FROM pizza_runner.customer_orders
),
-- when using the regexp_split_to_table function only records where there are
-- non-null records remain so we will need to union them back in!
cte_extras_exclusions AS (
    SELECT
      order_id,
      customer_id,
      pizza_id,
      REGEXP_SPLIT_TO_TABLE(exclusions, '[,\s]+')::INTEGER AS exclusions_topping_id,
      REGEXP_SPLIT_TO_TABLE(extras, '[,\s]+')::INTEGER AS extras_topping_id,
      order_time,
      original_row_number
    FROM cte_cleaned_customer_orders
  -- here we add back in the null extra/exclusion rows
  -- does it make any difference if we use UNION or UNION ALL?
  UNION
    SELECT
      order_id,
      customer_id,
      pizza_id,
      NULL AS exclusions_topping_id,
      NULL AS extras_topping_id,
      order_time,
      original_row_number
    FROM cte_cleaned_customer_orders
    WHERE exclusions IS NULL AND extras IS NULL
),
cte_complete_dataset AS (
  SELECT
    base.order_id,
    base.customer_id,
    base.pizza_id,
    names.pizza_name,
    base.order_time,
    base.original_row_number,
    STRING_AGG(exclusions.topping_name, ', ') AS exclusions,
    STRING_AGG(extras.topping_name, ', ') AS extras
  FROM cte_extras_exclusions AS base
  INNER JOIN pizza_runner.pizza_names AS names
    ON base.pizza_id = names.pizza_id
  LEFT JOIN pizza_runner.pizza_toppings AS exclusions
    ON base.exclusions_topping_id = exclusions.topping_id
  LEFT JOIN pizza_runner.pizza_toppings AS extras
    ON base.exclusions_topping_id = extras.topping_id
  GROUP BY
    base.order_id,
    base.customer_id,
    base.pizza_id,
    names.pizza_name,
    base.order_time,
    base.original_row_number
),
cte_parsed_string_outputs AS (
SELECT
  order_id,
  customer_id,
  pizza_id,
  order_time,
  original_row_number,
  pizza_name,
  CASE WHEN exclusions IS NULL THEN '' ELSE ' - Exclude ' || exclusions END AS exclusions,
  CASE WHEN extras IS NULL THEN '' ELSE ' - Extra ' || exclusions END AS extras
FROM cte_complete_dataset
),
final_output AS (
  SELECT
    order_id,
    customer_id,
    pizza_id,
    order_time,
    original_row_number,
    pizza_name || exclusions || extras AS order_item
  FROM cte_parsed_string_outputs
)
SELECT
  COUNT(order_id),
  order_item
FROM final_output
GROUP BY order_item;`,
    },
    {
      title: "Seasonal Topping Trends",
      description: "Track seasonal preferences for inventory planning",
      sql: `SELECT 
  DATE_TRUNC('month', oi.order_date) as month,
  t.topping_category,
  t.topping_name,
  COUNT(oi.order_item_id) as monthly_orders,
  SUM(oi.quantity * oi.unit_price) as monthly_revenue,
  LAG(COUNT(oi.order_item_id)) OVER (
    PARTITION BY t.topping_id 
    ORDER BY DATE_TRUNC('month', oi.order_date)
  ) as prev_month_orders
FROM toppings t
JOIN order_items oi ON t.topping_id = oi.item_id
WHERE oi.item_type = 'topping'
  AND oi.order_date >= CURRENT_DATE - INTERVAL '12 months'
GROUP BY DATE_TRUNC('month', oi.order_date), t.topping_id, t.topping_category, t.topping_name
ORDER BY month DESC, monthly_orders DESC;`,
    },
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-900 border border-orange-700 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${
                entry.dataKey.includes("revenue") || entry.dataKey.includes("price")
                  ? `$${entry.value.toLocaleString()}`
                  : entry.dataKey.includes("margin")
                    ? `${entry.value}%`
                    : entry.value.toLocaleString()
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
            <Pizza className="w-8 h-8 text-orange-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">Topping Optimization Analytics</h1>
              <p className="text-orange-200">Inventory optimization and preference insights</p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-orange-400" />
                <span className="text-sm text-orange-200">Top Topping</span>
              </div>
              <p className="text-xl font-bold text-white">Bacon</p>
              <p className="text-xs text-orange-400">67% of all extra toppings</p>
            </div>
            {/* <div className="bg-zinc-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <span className="text-sm text-orange-200">Best Margin</span>
              </div>
              <p className="text-xl font-bold text-white">Onions</p>
              <p className="text-xs text-green-400">78% profit margin</p>
            </div> */}
            <div className="bg-zinc-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-orange-200">Top Pizza</span>
              </div>
              <p className="text-xl font-bold text-white">Meat Lovers</p>
              <p className="text-xs text-blue-400">64% of al orders</p>
            </div>
            {/* <div className="bg-zinc-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-orange-200">Inventory Value</span>
              </div>
              <p className="text-xl font-bold text-white">$8,450</p>
              <p className="text-xs text-purple-400">Current stock value</p>
            </div> */}
          </div>
        </div>
      </div>

      {/* Pizza Toppings Showcase - Fixed Grid Layout */}
      <section className="py-8 border-b border-orange-700">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-xl font-bold text-white mb-6 text-center">PIZZA TOPPINGS</h2>

          {/* First Row - 6 columns */}
          <div className="grid grid-cols-6 gap-4 mb-6">
            {[
              { icon: "🍕", name: "Pepperoni" },
              { icon: "🍄", name: "Mushrooms" },
              { icon: "🫑", name: "Peppers" },
              { icon: "🧅", name: "Onions" },
              { icon: "🥩", name: "Beef" },
              { icon: "🧀", name: "Cheese" },

            ].map((topping, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors"> */}
                  <span className="text-2xl">{topping.icon}</span>
                {/* </div> */}
                <span className="text-xs text-orange-200 mt-2 text-center">{topping.name}</span>
              </div>
            ))}
          </div>

          {/* Second Row - 6 columns */}
          <div className="grid grid-cols-6 gap-4">
            {[
              { icon: "🍅", name: "Tomatoes" },
              { icon: "🐔", name: "Chicken" },
              { icon: "🥓", name: "Bacon" },
              { icon: "🍖", name: "Salami" },
              { icon: "🧂", name: "BBQ Sauce" },
              { icon: "🥫", name: "Tomato Sauce" },
            ].map((topping, index) => (
              <div key={index + 8} className="flex flex-col items-center">
                {/* <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors"> */}
                  <span className="text-2xl">{topping.icon}</span>
                {/* </div> */}
                <span className="text-xs text-orange-200 mt-2 text-center">{topping.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-orange-300 text-sm">12 premium toppings available • Fresh ingredients • Made to order</p>
          </div>
        </div>
      </section>

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
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      activeQuery === index
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
            </div>
          </div>

          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Popular Toppings */}
            <div className="bg-zinc-900/50 border border-orange-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Popular Extra Toppings by Orders</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={popularToppingsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="topping" stroke="#F97316" angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#F97316" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="orders" fill="#F97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Topping Combinations */}
            <div className="bg-zinc-900/50 border border-orange-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Top Topping Combinations</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={toppingCombinationsData} >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="combination" type="category" stroke="#F97316" width={150} />
                  <YAxis type="number" stroke="#F97316" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="orders" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Further Analysis Profitability Analysis */}
            {/* <div className="bg-zinc-900/50 border border-orange-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Topping Profitability vs Volume</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={profitabilityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="topping" stroke="#F97316" angle={-45} textAnchor="end" height={80} />
                  <YAxis yAxisId="left" stroke="#F97316" />
                  <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar yAxisId="left" dataKey="volume" fill="#3B82F6" />
                  <Bar yAxisId="right" dataKey="margin" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div> */}

            {/* Further AnalysisSeasonal Trends */}
            {/* <div className="bg-zinc-900/50 border border-orange-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Seasonal Topping Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                < BarChart data={seasonalTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#F97316" />
                  <YAxis stroke="#F97316" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="pepperoni" stackId="a" fill="#F97316" />
                  <Bar dataKey="mushrooms" stackId="a" fill="#10B981" />
                  <Bar dataKey="sausage" stackId="a" fill="#3B82F6" />
                  <Bar dataKey="vegetables" stackId="a" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div> */}
            {/* Pizza Toppings Table */}
            {/* <PizzaToppingsTable /> */}
          </div>
        </div>
      </div>
    </main>
  )
}
