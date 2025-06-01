"use client"

import { useEffect, useState } from "react"

type FloatingPizza = {
  id: number
  x: number
  y: number
  size: number
  speed: number
  direction: number
}

export function PizzaBackground() {
  const [pizzas, setPizzas] = useState<FloatingPizza[]>([])

  useEffect(() => {
    // Initialize floating pizzas
    const initialPizzas: FloatingPizza[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      speed: Math.random() * 0.5 + 0.1,
      direction: Math.random() * Math.PI * 2,
    }))

    setPizzas(initialPizzas)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setPizzas((prev) =>
        prev.map((pizza) => ({
          ...pizza,
          x: (pizza.x + Math.cos(pizza.direction) * pizza.speed + 100) % 100,
          y: (pizza.y + Math.sin(pizza.direction) * pizza.speed + 100) % 100,
          direction: pizza.direction + (Math.random() - 0.5) * 0.1,
        })),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
      {pizzas.map((pizza) => (
        <div
          key={pizza.id}
          className="absolute transition-all duration-75"
          style={{
            left: `${pizza.x}%`,
            top: `${pizza.y}%`,
            fontSize: `${pizza.size}px`,
            transform: `rotate(${pizza.direction * 57.3}deg)`,
          }}
        >
          🍕
        </div>
      ))}
    </div>
  )
}
