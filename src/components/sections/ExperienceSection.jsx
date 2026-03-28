import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import '../../styles/sections.css'

function ExperienceSection({ experience }) {
  const sectionRef = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated && gsap) {
            setHasAnimated(true)

            // Animate title
            gsap.fromTo(entry.target.querySelector('h2'),
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
            )

            // Animate experience items
            setTimeout(() => {
              gsap.fromTo(entry.target.querySelectorAll('.experience-item'),
                { opacity: 0, x: -30 },
                { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
              )
            }, 200)

            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  return (
    <section className="portfolio-section experience-section" ref={sectionRef}>
      <div className="container">
        <h2>📚 Experience</h2>
        <div className="experience-timeline">
          {experience.map((exp, idx) => (
            <div key={exp.id} className={`experience-item ${exp.highlight ? 'highlight' : ''}`}>
              <div className="experience-marker"></div>
              <div className="experience-content">
                <h3>{exp.title}</h3>
                <p className="org-name">{exp.organization}</p>
                <p className="exp-type">{exp.type === 'hackathon' ? '🏆' : '📖'} {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}</p>
                <p className="exp-date">{exp.date}</p>
                <p className="exp-description">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
