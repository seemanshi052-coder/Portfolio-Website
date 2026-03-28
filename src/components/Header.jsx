import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import gsap from 'gsap'
import '../styles/header.css'

function Header({ currentMemberId, allMembers }) {
  const navigate = useNavigate()

  useEffect(() => {
    // Add animation to highlight active member
    if (gsap) {
      const activeMember = document.querySelector(`[data-member-id="${currentMemberId}"]`)
      if (activeMember) {
        gsap.to(activeMember, {
          color: 'var(--primary)',
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }
  }, [currentMemberId])

  const handleMemberClick = (memberId) => {
    if (memberId !== currentMemberId) {
      // Animate transition
      if (gsap) {
        gsap.to('.portfolio-content', {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.in',
        })
      }

      setTimeout(() => {
        navigate(`/${memberId}`)
      }, 300)
    }
  }

  return (
    <header className="portfolio-header">
      <div className="header-container">
        {/* Team Name */}
        <Link to="/" className="header-logo">
          <span className="logo-text">TodFodCoders</span>
        </Link>

        {/* Member Navigation */}
        <nav className="member-nav">
          {allMembers.map((member) => (
            <button
              key={member.id}
              data-member-id={member.id}
              className={`member-nav-item ${member.id === currentMemberId ? 'active' : ''}`}
              onClick={() => handleMemberClick(member.id)}
              title={member.name}
            >
              {member.name.split(' ')[0]}
            </button>
          ))}
        </nav>

        {/* Back to landing button */}
        <Link to="/" className="header-back">
          ← Teams
        </Link>
      </div>
    </header>
  )
}

export default Header
