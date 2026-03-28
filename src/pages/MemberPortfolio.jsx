import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { MEMBERS_ARRAY, getMemberById } from '../data/members'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import ObjectiveSection from '../components/sections/ObjectiveSection'
import AboutSection from '../components/sections/AboutSection'
import SkillsSection from '../components/sections/SkillsSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import ExperienceSection from '../components/sections/ExperienceSection'
import CertificatesSection from '../components/sections/CertificatesSection'
import '../styles/portfolio.css'

function MemberPortfolio() {
  const { memberName } = useParams()
  const navigate = useNavigate()
  const [memberData, setMemberData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load member data based on URL parameter
    const member = getMemberById(memberName)
    if (member) {
      setMemberData(member)
      setIsLoading(false)
    } else {
      // Redirect to home if member not found
      navigate('/')
    }
  }, [memberName, navigate])

  if (isLoading) {
    return (
      <div className="flex-center" style={{ minHeight: '100vh', background: 'var(--background)' }}>
        <div className="animate-pulse" style={{ color: 'var(--text-secondary)' }}>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!memberData) {
    return null
  }

  return (
    <div className="portfolio-page">
      <Header currentMemberId={memberData.id} allMembers={MEMBERS_ARRAY} />
      
      <main className="portfolio-content">
        <HeroSection member={memberData} />

        {/* Scrollable Content Sections */}
        <div className="sections-container">
          {memberData.objective && <ObjectiveSection objective={memberData.objective} />}
          {memberData.about && <AboutSection about={memberData.about} />}
          {memberData.skills && <SkillsSection skills={memberData.skills} />}
          {memberData.projects && <ProjectsSection projects={memberData.projects} />}
          {memberData.experience && <ExperienceSection experience={memberData.experience} />}
          {memberData.certificates && <CertificatesSection certificates={memberData.certificates} />}

          {/* Resume/Contact Section */}
          <section className="resume-section">
            <div className="container">
              <h2>Resume & Contact</h2>
              <div className="resume-content">
                {memberData.resumeUrl && (
                  <a href={memberData.resumeUrl} download className="download-btn">
                    📥 Download Resume
                  </a>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default MemberPortfolio
