import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import '../styles/hero.css'

function HeroSection({ member }) {
  const heroRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    // Initial animation on mount - use small delay to ensure DOM is ready
    const animateHero = () => {
      if (!gsap || !gsap.timeline) return
      
      const tl = gsap.timeline()
      
      if (imageRef.current) {
        tl.fromTo(imageRef.current, 
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
          0
        )
      }
      
      if (contentRef.current) {
        tl.fromTo(contentRef.current.querySelector('h1'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          0.2
        )
        
        const roleEl = contentRef.current.querySelector('.hero-role')
        const subtextEl = contentRef.current.querySelector('.hero-subtext')
        if (roleEl && subtextEl) {
          tl.fromTo(
            [roleEl, subtextEl],
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
            0.4
          )
        }
        
        const badges = contentRef.current.querySelectorAll('.badge')
        if (badges.length) {
          tl.fromTo(badges,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
            0.7
          )
        }
      }
    }
    
    // Small delay to ensure elements are mounted
    const timer = setTimeout(animateHero, 100)
    
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Setup scroll animation for parallax effect
    const handleScroll = () => {
      if (imageRef.current && heroRef.current) {
        const heroHeight = heroRef.current.offsetHeight
        const scrollY = window.scrollY
        const heroBounds = heroRef.current.getBoundingClientRect()

        // Only apply parallax while hero is visible
        if (heroBounds.top < window.innerHeight) {
          const scrollProgress = Math.min(Math.max(scrollY / heroHeight, 0), 2)
          setScrollProgress(scrollProgress)

          // Parallax: move right + slight rotation
          const moveRight = Math.min(scrollProgress * 150, 150)
          const rotateProgress = Math.min(scrollProgress * 3, 3)
          const scaleEffect = Math.max(1 - scrollProgress * 0.1, 0.95)

          if (gsap) {
            gsap.set(imageRef.current, {
              x: moveRight,
              rotation: rotateProgress,
              scale: scaleEffect,
            })
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="hero-container">
        <div className="hero-image">
          <div className="image-glow"></div>
          <img
            ref={imageRef}
            src={member.imageUrl}
            alt={member.name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x600?text=' + member.name
            }}
          />
        </div>
        <div className="hero-content" ref={contentRef}>
          <h1>{member.name}</h1>
          <p className="hero-role">{member.role}</p>
          <p className="hero-subtext">
            {member.objective.substring(0, 150)}...
          </p>
          <div className="hero-badges">
            <span className="badge">💻 Developer</span>
            <span className="badge">🚀 Innovator</span>
            <span className="badge">🎯 Problem Solver</span>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className={`scroll-indicator ${scrollProgress > 0.2 ? 'hidden' : ''}`}>
        <span>↓ Scroll to explore</span>
      </div>
    </section>
  )
}

export default HeroSection
