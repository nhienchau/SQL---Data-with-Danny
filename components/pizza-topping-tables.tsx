"use client"

// type SortField = keyof ToppingData
// type SortDirection = "asc" | "desc"

export function PizzaToppingsTable() {
//   const [sortField, setSortField] = useState<SortField>("orders")
//   const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
//   const [filterCategory, setFilterCategory] = useState<string>("all")

//   const categories = ["all", ...Array.from(new Set(toppingsData.map((t) => t.category)))]

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
