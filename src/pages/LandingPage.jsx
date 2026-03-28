import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import gsap from 'gsap'
import { TEAM_CONFIG } from '../config/teamConfig'
import MemberCard from '../components/MemberCard'
import '../styles/landing.css'

function LandingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Animate hero title on load
    if (gsap && gsap.timeline) {
      const tl = gsap.timeline()
      tl.fromTo('.landing-hero h1', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      )
      .fromTo('.landing-hero p',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.8'
      )
      .to('.member-card',
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        '-=0.4'
      )
    }
  }, [])

  const handleMemberClick = (memberId) => {
    // Animate out before navigation
    if (gsap) {
      gsap.to('.member-card', {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: 'power1.in',
      })
    }

    setTimeout(() => {
      navigate(`/${memberId}`)
    }, 300)
  }

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="container">
          <h1>TodFodCoders</h1>
          <p className="subtitle">A passionate team innovating at {TEAM_CONFIG.hackathonName}</p>
          <p className="description">{TEAM_CONFIG.hackathonDescription}</p>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="team-section">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="members-grid">
            {TEAM_CONFIG.members.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onClick={() => handleMemberClick(member.id)}
                onKeyDown={(e) => e.key === 'Enter' && handleMemberClick(member.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <p>&copy; 2025 TodFodCoders. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
