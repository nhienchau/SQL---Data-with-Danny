import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Mail, Linkedin, ArrowRight, Code2, PenTool, LucideSettings } from "lucide-react"
import Link from "next/link"
import TypewriterText from "@/components/typewritertext"
import { ThemeToggle } from "@/components/theme-toggle"
// import { TechStack} from "@/components/tech-stack"


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <div className="font-bold text-xl flex-none">SQL Projects - Data with Danny</div>
          <nav className="hidden md:flex gap-6 justify-center flex-1 mx-4">
            <div className="flex gap-6 justify-center">
              <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </Link>
              <Link href="#skills" className="text-muted-foreground hover:text-foreground transition-colors">
                Skills
              </Link>
              <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </nav>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-3 flex-none">
            <Button variant="outline" size="icon" asChild>
              <Link href="https://github.com/nhienchau" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="https://www.linkedin.com/in/nhienchau/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button asChild>
              <Link href="#contact">Contact Me</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-32">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                {/* <Badge className="text-sm" variant="secondary">
                  Available for hire
                </Badge> */}

                <TypewriterText text={"Welcome!"} speed={100} />


                <p className="text-xl text-muted-foreground">
                  A passionate BI Analyst specializing in transforming data into actionable insights and driving data-informed decision-making.
                </p>
                <div className="flex gap-4">
                  <Button asChild>
                    <Link href="#projects">
                      View My Work <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="#contact">Contact Me</Link>
                  </Button>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <Avatar className="h-64 w-64">
                  <AvatarImage src="/images/profile_pic.jpg" alt="ProfilePicture" />
                  <AvatarFallback>YN</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-24">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <Badge>About Me</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Get to know me</h2>
              <div className="max-w-3xl">
                <p className="text-muted-foreground text-lg">
                  A BI Analyst with 2.5+ years of experience in database design, dashboard development, and custom business metric creation—particularly focused on logistics and payment management. Skilled in turning complex data into clear, actionable insights that support strategic decision-making.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 max-w-6xl mx-auto">
              <Card>
                <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Code2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Data Analysis</h3>
                  <p className="text-muted-foreground">
                    I extract actionable insights from complex datasets to support strategic decision-making using SQL, LookML, Excel, and BI tools like Looker or Power BI.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <LucideSettings className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Database Management</h3>
                  <p className="text-muted-foreground">
                    I manage and query large-scale datasets efficiently using cloud data warehouses such as Google BigQuery, ensuring scalable and reliable data pipelines.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <PenTool className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Data Visualization & Reporting</h3>
                  <p className="text-muted-foreground">
                    I design intuitive dashboards and visual reports to communicate findings effectively and drive data-informed business strategies.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="bg-muted/40 py-24">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <Badge>My Work</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
              <div className="max-w-3xl">
                <p className="text-muted-foreground text-lg">
                  Here are some of my recent projects. Each project reflects my passion for creating intuitive and
                  impactful digital experiences.
                </p>
              </div>
            </div>
            {/* Project 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
              {/* {[1, 2, 3].map((project) => ( */}
              <Card className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src="/images/credit_risk.jpeg"
                    alt="Credit-analysis"
                    className="object-cover w- h-48"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xl">Credit Analysis</h3>
                      {/* <Badge variant="outline">Web App</Badge> */}
                    </div>
                    <p className="text-muted-foreground">
                      A machine learning project that predicts the likelihood of loan default based on customer attributes such as income, credit history, and debt-to-income ratio. Built classification models to assist financial institutions in minimizing risk and making informed lending decisions.
                    </p>
                  </div>
                  {/* <div className="flex gap-2 flex-wrap"> */}
                  <Badge variant="secondary">Python</Badge>
                    {/* <Badge variant="secondary">Next.js</Badge>
                      <Badge variant="secondary">Tailwind CSS</Badge> */}
                  {/* </div> */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="https://github.com/nhienchau/Credit-Risk-Analysis">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      {/* <Link href="#" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </Link> */}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Project 2 */}
              <Card className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src="/images/retail_analysis.png"
                    alt="Retail-analysis"
                    className="object-cover w-full h-48"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xl">Retail Analysis</h3>
                    </div>
                    <p className="text-muted-foreground">
                    Analyzed retail sales data to uncover trends, identify top-performing products, and evaluate customer purchasing behavior. Built dashboards and visualizations to support strategic business decisions and optimize sales performance.
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary">SQL</Badge>
                  <Badge variant="secondary">Power BI</Badge>
                    {/* <Badge variant="secondary">Next.js</Badge>
                      <Badge variant="secondary">Tailwind CSS</Badge> */}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="https://github.com/nhienchau/KPMG-virtual-internship-project">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      {/* <Link href="#" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </Link> */}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              {/* ))} */}
              {/* Project 3 */}
              <Card className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src="/images/Data_with_Danny.png"
                    alt="Retail-analysis"
                    className="object-cover w-full h-48"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xl">Data Exploration</h3>
                    </div>
                    <p className="text-muted-foreground">
                    8 - Week Challenge by Danny Ma.
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary">SQL</Badge>
                  <Badge variant="secondary">Looker</Badge>
                    {/* <Badge variant="secondary">Next.js</Badge>
                      <Badge variant="secondary">Tailwind CSS</Badge> */}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#link">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      {/* <Link href="#" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </Link> */}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center pt-8">
              <Button variant="outline" asChild>
                <Link href="#">
                  View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="w-full py-24">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <Badge>My Skills</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Technologies I Work With</h2>
              <div className="max-w-3xl">
                <p className="text-muted-foreground text-lg">
                  I am constantly learning and expanding my skill set. Here are some of the technologies I am  proficient
                  in.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-8 max-w-6xl mx-auto">
              {[
                "SQL",
                "Python",
                "BigQuery",
                "PostgreSQL",
                "JavaScript",
                "React",
                "Next.js",
                "Tailwind CSS",
                "HTML/CSS",
                "Docker",
                "Looker",
                "Power BI"
              ].map((skill) => (
                <Card key={skill} className="flex items-center justify-center p-6 text-center">
                  <p className="font-medium">{skill}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-muted/40 py-24">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <Badge>Contact</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
              <div className="max-w-3xl">
                <p className="text-muted-foreground text-lg">
                  Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <p>quynhnhien510@gmail.com</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Linkedin className="h-5 w-5 text-primary" />
                      <p>linkedin.com/in/nhienchau</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Github className="h-5 w-5 text-primary" />
                      <p>github.com/nhienchau</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Your email"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Your message"
                      />
                    </div>
                    <Button className="w-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
          <p className="text-muted-foreground">© {new Date().getFullYear()} Nhien Chau. All rights reserved.</p>
          {/* <div className="flex items-center gap-4 mt-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="mailto:your.email@example.com">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Link>
            </Button>
          </div> */}
        </div>
      </footer>
    </div>
  )
}
