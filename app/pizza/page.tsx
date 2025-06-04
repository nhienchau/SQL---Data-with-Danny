// import { PizzaRain } from "@/components/pizza-rain"
// import { PizzaCursor } from "@/components/pizza-cursor"
// import { PizzaExplosion } from "@/components/pizza-explosion"
import  { Hero } from "./_components/hero"
import { PizzaOverviewDashboard } from "@/components/pizza-overview-dashboard"
import { PizzaBackground } from "@/components/pizza-background"
import {Footer} from "./_components/footer"
// import { TechProjects } from "@/components/tech-projects"

export default function Home() {
  return (
    <main className="min-h-screen bg-black relative">
      {/* Pizza Effects */}
      
       <Hero />
       <div className="max-w-6xl mx-auto px-8 py-16">
       <PizzaOverviewDashboard />
       </div>
      <Footer/>
      <PizzaBackground />
    </main>
  )
}
