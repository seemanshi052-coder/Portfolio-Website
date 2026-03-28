import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import '../../styles/sections.css'

function ObjectiveSection({ objective }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && gsap) {
            gsap.fromTo(entry.target,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
            )
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
  }, [])

  return (
    <section className="portfolio-section objective-section" ref={sectionRef}>
      <div className="container">
        <h2>📝 Objective</h2>
        <p className="section-text">{objective}</p>
      </div>
    </section>
  )
}

export default ObjectiveSection
