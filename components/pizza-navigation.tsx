"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Pizza, BarChart3, PhoneCall, Settings, Home } from "lucide-react"

export function PizzaNavigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Overview", icon: Home },
    { href: "/pizza/order", label: "Order Volume", icon: BarChart3 },
    { href: "/pizza/pizza-toppings", label: "Topping Optimization", icon: Settings },
    { href: "https://ai-agent-pizza-demo.streamlit.app/", label: "Pizza AI Agent", icon: PhoneCall } ,
  ]

  return (
    // <nav className="fixed top-0 left-0 right-0 z-50 bg-orange-900/90 backdrop-blur-sm border-b border-orange-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
            <Pizza className="w-8 h-8 text-orange-400" />
            Pizza Analytics
          </Link>

          <div className="flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive ? "bg-orange-600 text-white" : "text-orange-200 hover:text-white hover:bg-orange-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    // </nav>
  )
}
