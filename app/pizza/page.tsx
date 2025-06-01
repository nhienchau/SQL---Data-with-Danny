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
      {/* <div className="max-w-6xl mx-auto px-8 py-16">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Projects</h2>
          <TechProjects />
        </section>
        <Experience />
        
      </div>
      <Footer /> */}
      {/* <PizzaRain />
      <PizzaCursor /> */}

      {/* <div className="relative z-10 max-w-6xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Pizza Effects Demo 🍕</h1>

        <div className="space-y-8">
          <PizzaExplosion />

          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Available Effects:</h2>
            <ul className="space-y-2 text-zinc-300">
              <li>🌧️ Pizza Rain - Click top-right button</li>
              <li>🖱️ Pizza Cursor Trail - Click top-left button</li>
              <li>💥 Pizza Explosion - Click the blue area above</li>
              <li>🌊 Floating Pizza Background - Always active</li>
            </ul>
          </div>

          <section className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8">Your Projects</h2>
            <TechProjects />
          </section>
        </div>
      </div> */}
      <Footer/>
      <PizzaBackground />
    </main>
  )
}
