"use client"


import { useState } from "react"

type ToppingData = {
  id: number
  name: string
  icon: string
  category: string
  orders: number
  revenue: number
  cost: number
  price: number
  margin: number
  popularity: number
  trend: "up" | "down" | "stable"
  trendValue: number
  stockLevel: number
  seasonality: "high" | "medium" | "low"
}

const toppingsData: ToppingData[] = [
  {
    id: 1,
    name: "Pepperoni",
    icon: "🍕",
    category: "Meat",
    orders: 1234,
    revenue: 18510,
    cost: 1.05,
    price: 3.0,
    margin: 65,
    popularity: 45,
    trend: "up",
    trendValue: 12,
    stockLevel: 85,
    seasonality: "high",
  },
  {
    id: 2,
    name: "Mushrooms",
    icon: "🍄",
    category: "Vegetable",
    orders: 890,
    revenue: 12450,
    cost: 0.85,
    price: 3.0,
    margin: 72,
    popularity: 32,
    trend: "up",
    trendValue: 8,
    stockLevel: 92,
    seasonality: "medium",
  },
  {
    id: 3,
    name: "Italian Sausage",
    icon: "🌭",
    category: "Meat",
    orders: 756,
    revenue: 11340,
    cost: 0.95,
    price: 3.0,
    margin: 68,
    popularity: 28,
    trend: "stable",
    trendValue: 0,
    stockLevel: 78,
    seasonality: "medium",
  },
  {
    id: 4,
    name: "Bell Peppers",
    icon: "🫑",
    category: "Vegetable",
    orders: 645,
    revenue: 8385,
    cost: 0.75,
    price: 3.0,
    margin: 75,
    popularity: 24,
    trend: "up",
    trendValue: 15,
    stockLevel: 88,
    seasonality: "high",
  },
  {
    id: 5,
    name: "Red Onions",
    icon: "🧅",
    category: "Vegetable",
    orders: 567,
    revenue: 7371,
    cost: 0.65,
    price: 3.0,
    margin: 78,
    popularity: 21,
    trend: "up",
    trendValue: 6,
    stockLevel: 95,
    seasonality: "medium",
  },
  {
    id: 6,
    name: "Black Olives",
    icon: "🫒",
    category: "Vegetable",
    orders: 432,
    revenue: 6048,
    cost: 0.9,
    price: 3.0,
    margin: 70,
    popularity: 16,
    trend: "down",
    trendValue: -3,
    stockLevel: 67,
    seasonality: "low",
  },
  {
    id: 7,
    name: "Extra Cheese",
    icon: "🧀",
    category: "Cheese",
    orders: 398,
    revenue: 5970,
    cost: 1.2,
    price: 3.0,
    margin: 60,
    popularity: 15,
    trend: "up",
    trendValue: 18,
    stockLevel: 82,
    seasonality: "high",
  },
  {
    id: 8,
    name: "Bacon",
    icon: "🥓",
    category: "Meat",
    orders: 345,
    revenue: 6210,
    cost: 1.35,
    price: 3.0,
    margin: 55,
    popularity: 13,
    trend: "up",
    trendValue: 9,
    stockLevel: 74,
    seasonality: "medium",
  },
  {
    id: 9,
    name: "Tomatoes",
    icon: "🍅",
    category: "Vegetable",
    orders: 298,
    revenue: 3576,
    cost: 0.7,
    price: 3.0,
    margin: 77,
    popularity: 11,
    trend: "up",
    trendValue: 22,
    stockLevel: 91,
    seasonality: "high",
  },
  {
    id: 10,
    name: "Pineapple",
    icon: "🍍",
    category: "Fruit",
    orders: 267,
    revenue: 3204,
    cost: 0.8,
    price: 3.0,
    margin: 73,
    popularity: 10,
    trend: "down",
    trendValue: -5,
    stockLevel: 56,
    seasonality: "low",
  },
  {
    id: 11,
    name: "Jalapeños",
    icon: "🌶️",
    category: "Vegetable",
    orders: 234,
    revenue: 2808,
    cost: 0.6,
    price: 3.0,
    margin: 80,
    popularity: 9,
    trend: "up",
    trendValue: 25,
    stockLevel: 89,
    seasonality: "medium",
  },
  {
    id: 12,
    name: "Spinach",
    icon: "🥬",
    category: "Vegetable",
    orders: 189,
    revenue: 2268,
    cost: 0.55,
    price: 3.0,
    margin: 82,
    popularity: 7,
    trend: "up",
    trendValue: 30,
    stockLevel: 93,
    seasonality: "medium",
  },
  {
    id: 13,
    name: "Anchovies",
    icon: "🐟",
    category: "Seafood",
    orders: 87,
    revenue: 1044,
    cost: 1.5,
    price: 3.0,
    margin: 50,
    popularity: 3,
    trend: "down",
    trendValue: -8,
    stockLevel: 45,
    seasonality: "low",
  },
  {
    id: 14,
    name: "Chicken",
    icon: "🐔",
    category: "Meat",
    orders: 456,
    revenue: 6840,
    cost: 1.1,
    price: 3.0,
    margin: 63,
    popularity: 17,
    trend: "up",
    trendValue: 14,
    stockLevel: 79,
    seasonality: "high",
  },
  {
    id: 15,
    name: "Ham",
    icon: "🍖",
    category: "Meat",
    orders: 312,
    revenue: 4368,
    cost: 1.25,
    price: 3.0,
    margin: 58,
    popularity: 12,
    trend: "stable",
    trendValue: 1,
    stockLevel: 71,
    seasonality: "medium",
  },
]

type SortField = keyof ToppingData
type SortDirection = "asc" | "desc"

export function PizzaToppingsTable() {
  const [sortField, setSortField] = useState<SortField>("orders")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [filterCategory, setFilterCategory] = useState<string>("all")

  const categories = ["all", ...Array.from(new Set(toppingsData.map((t) => t.category)))]

//   const handleSort = (field: SortField) => {
//     if (field === sortField) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc")
//     } else {
//       setSortField(field)
//       setSortDirection("desc")
//     }
//   }

//   const filteredAndSortedData = toppingsData
//     .filter((topping) => filterCategory === "all" || topping.category === filterCategory)
//     .sort((a, b) => {
//       const aValue = a[sortField]
//       const bValue = b[sortField]

//       if (typeof aValue === "string" && typeof bValue === "string") {
//         return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
//       }

//       if (typeof aValue === "number" && typeof bValue === "number") {
//         return sortDirection === "asc" ? aValue - bValue : bValue - aValue
//       }

//       return 0
//     })

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(amount)
//   }

//   const getTrendIcon = (trend: "up" | "down" | "stable", value: number) => {
//     if (trend === "up") {
//       return <TrendingUp className="w-4 h-4 text-green-400" />
//     } else if (trend === "down") {
//       return <TrendingDown className="w-4 h-4 text-red-400" />
//     }
//     return <div className="w-4 h-4 bg-zinc-600 rounded-full"></div>
//   }

//   const getStockLevelColor = (level: number) => {
//     if (level >= 80) return "text-green-400"
//     if (level >= 60) return "text-yellow-400"
//     return "text-red-400"
//   }

//   const getSeasonalityBadge = (seasonality: string) => {
//     const colors = {
//       high: "bg-green-500/20 text-green-400 border-green-500/30",
//       medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
//       low: "bg-red-500/20 text-red-400 border-red-500/30",
//     }
//     return colors[seasonality as keyof typeof colors] || colors.medium
//   }

//   const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
//     <button
//       onClick={() => handleSort(field)}
//       className="flex items-center gap-1 hover:text-orange-300 transition-colors"
//     >
//       {children}
//       {sortField === field &&
//         (sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
//     </button>
//   )

//   return (
//     <div className="bg-zinc-900/50 border border-orange-700 rounded-lg overflow-hidden">
//       {/* Header */}
//       <div className="p-6 border-b border-orange-700">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-xl font-semibold text-white flex items-center gap-2">
//             <Package className="w-6 h-6 text-orange-400" />
//             Pizza Toppings Analysis
//           </h3>
//           <div className="flex items-center gap-4">
//             <select
//               value={filterCategory}
//               onChange={(e) => setFilterCategory(e.target.value)}
//               className="bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-white text-sm"
//             >
//               {categories.map((category) => (
//                 <option key={category} value={category}>
//                   {category === "all" ? "All Categories" : category}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Summary Stats */}
//         {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div className="bg-zinc-800/50 rounded-lg p-3">
//             <div className="flex items-center gap-2">
//               <Star className="w-4 h-4 text-orange-400" />
//               <span className="text-xs text-orange-200">Total Toppings</span>
//             </div>
//             <p className="text-lg font-bold text-white">{filteredAndSortedData.length}</p>
//           </div>
//           <div className="bg-zinc-800/50 rounded-lg p-3">
//             <div className="flex items-center gap-2">
//               <DollarSign className="w-4 h-4 text-green-400" />
//               <span className="text-xs text-orange-200">Total Revenue</span>
//             </div>
//             <p className="text-lg font-bold text-white">
//               {formatCurrency(filteredAndSortedData.reduce((sum, t) => sum + t.revenue, 0))}
//             </p>
//           </div>
//           <div className="bg-zinc-800/50 rounded-lg p-3">
//             <div className="flex items-center gap-2">
//               <TrendingUp className="w-4 h-4 text-blue-400" />
//               <span className="text-xs text-orange-200">Avg Margin</span>
//             </div>
//             <p className="text-lg font-bold text-white">
//               {Math.round(filteredAndSortedData.reduce((sum, t) => sum + t.margin, 0) / filteredAndSortedData.length)}%
//             </p>
//           </div>
//           <div className="bg-zinc-800/50 rounded-lg p-3">
//             <div className="flex items-center gap-2">
//               <Package className="w-4 h-4 text-purple-400" />
//               <span className="text-xs text-orange-200">Avg Stock</span>
//             </div>
//             <p className="text-lg font-bold text-white">
//               {Math.round(
//                 filteredAndSortedData.reduce((sum, t) => sum + t.stockLevel, 0) / filteredAndSortedData.length,
//               )}
//               %
//             </p>
//           </div>
//         </div> */}
//       </div>

//       {/* Further Analysis in Table Template */}
//       {/* <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-zinc-800/50">
//             <tr>
//               <th className="text-left p-4 text-sm font-medium text-orange-300">
//                 <SortButton field="name">Topping</SortButton>
//               </th>
//               <th className="text-left p-4 text-sm font-medium text-orange-300">
//                 <SortButton field="category">Category</SortButton>
//               </th>
//               <th className="text-right p-4 text-sm font-medium text-orange-300">
//                 <SortButton field="orders">Orders</SortButton>
//               </th>
//               <th className="text-right p-4 text-sm font-medium text-orange-300">
//                 <SortButton field="revenue">Revenue</SortButton>
//               </th>
//               <th className="text-right p-4 text-sm font-medium text-orange-300">
//                 <SortButton field="margin">Margin %</SortButton>
//               </th>
//               <th className="text-right p-4 text-sm font-medium text-orange-300">
//                 <SortButton field="popularity">Popularity</SortButton>
//               </th>
//               <th className="text-center p-4 text-sm font-medium text-orange-300">
//                 <SortButton field="trend">Trend</SortButton>
//               </th>
//               <th className="text-right p-4 text-sm font-medium text-orange-300">
//                 <SortButton field="stockLevel">Stock</SortButton>
//               </th>
//               <th className="text-center p-4 text-sm font-medium text-orange-300">
//                 <SortButton field="seasonality">Season</SortButton>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAndSortedData.map((topping, index) => (
//               <tr
//                 key={topping.id}
//                 className={`${index % 2 === 0 ? "bg-zinc-900/30" : "bg-zinc-800/30"} hover:bg-zinc-700/50 transition-colors`}
//               >
//                 <td className="p-4">
//                   <div className="flex items-center gap-3">
//                     <span className="text-2xl">{topping.icon}</span>
//                     <div>
//                       <p className="font-medium text-white">{topping.name}</p>
//                       <p className="text-xs text-zinc-400">{formatCurrency(topping.cost)} cost</p>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="p-4">
//                   <span className="px-2 py-1 bg-zinc-700 rounded-full text-xs text-orange-200">{topping.category}</span>
//                 </td>
//                 <td className="p-4 text-right font-medium text-white">{topping.orders.toLocaleString()}</td>
//                 <td className="p-4 text-right font-medium text-white">{formatCurrency(topping.revenue)}</td>
//                 <td className="p-4 text-right">
//                   <span
//                     className={`font-medium ${topping.margin >= 70 ? "text-green-400" : topping.margin >= 60 ? "text-yellow-400" : "text-red-400"}`}
//                   >
//                     {topping.margin}%
//                   </span>
//                 </td>
//                 <td className="p-4 text-right">
//                   <div className="flex items-center justify-end gap-2">
//                     <div className="w-16 bg-zinc-700 rounded-full h-2">
//                       <div
//                         className="bg-orange-400 h-2 rounded-full"
//                         style={{ width: `${Math.min(topping.popularity * 2, 100)}%` }}
//                       ></div>
//                     </div>
//                     <span className="text-sm text-white">{topping.popularity}%</span>
//                   </div>
//                 </td>
//                 <td className="p-4 text-center">
//                   <div className="flex items-center justify-center gap-1">
//                     {getTrendIcon(topping.trend, topping.trendValue)}
//                     <span
//                       className={`text-xs ${
//                         topping.trend === "up"
//                           ? "text-green-400"
//                           : topping.trend === "down"
//                             ? "text-red-400"
//                             : "text-zinc-400"
//                       }`}
//                     >
//                       {topping.trend === "stable" ? "0%" : `${topping.trendValue > 0 ? "+" : ""}${topping.trendValue}%`}
//                     </span>
//                   </div>
//                 </td>
//                 <td className="p-4 text-right">
//                   <span className={`font-medium ${getStockLevelColor(topping.stockLevel)}`}>{topping.stockLevel}%</span>
//                 </td>
//                 <td className="p-4 text-center">
//                   <span className={`px-2 py-1 rounded-full text-xs border ${getSeasonalityBadge(topping.seasonality)}`}>
//                     {topping.seasonality}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div> */}

//       {/* Footer
//       <div className="p-4 border-t border-orange-700 bg-zinc-800/30">
//         <div className="flex items-center justify-between text-sm text-orange-200">
//           <span>Showing {filteredAndSortedData.length} toppings</span>
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 bg-green-400 rounded-full"></div>
//               <span>High Performance</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
//               <span>Medium Performance</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 bg-red-400 rounded-full"></div>
//               <span>Low Performance</span>
//             </div>
//           </div>
//         </div>
//       </div> */}
//     </div>
//   )
}
