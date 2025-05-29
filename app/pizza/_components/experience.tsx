import React from "react";

type ExperienceItem = {
    title: string
    company: string
    period: string
    description: string
    technologies: string[]
  }
  
  const experiences: ExperienceItem[] = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Solutions Inc.",
      period: "2022 - Present",
      description:
        "Led development of scalable web applications using React, Node.js, and cloud technologies. Mentored junior developers and implemented best practices.",
      technologies: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency",
      period: "2020 - 2022",
      description:
        "Developed responsive web applications and collaborated with design teams to create exceptional user experiences.",
      technologies: ["React", "JavaScript", "CSS", "Figma", "Git"],
    },
    {
      title: "Junior Developer",
      company: "StartupCo",
      period: "2019 - 2020",
      description:
        "Built and maintained web applications while learning modern development practices and agile methodologies.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    },
  ]
  
  export function Experience() {
    return (
      <section className="py-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Experience</h2>
  
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="border border-zinc-800 rounded-lg p-6 bg-zinc-950/50 hover:bg-zinc-950 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                  <p className="text-blue-400 font-medium">{exp.company}</p>
                </div>
                <span className="text-zinc-400 text-sm mt-2 md:mt-0">{exp.period}</span>
              </div>
  
              <p className="text-zinc-300 mb-4">{exp.description}</p>
  
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-white">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

export default Experience; 
  