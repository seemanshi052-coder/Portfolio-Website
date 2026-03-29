import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef } from "react";
import { MEMBERS_ARRAY, getMemberById } from "../data/members";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ObjectiveSection from "../components/sections/ObjectiveSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import CertificatesSection from "../components/sections/CertificatesSection";
import SectionNav from "../components/SectionNav";
import Footer from "../components/Footer";
import { updateDocumentMetadata } from "../utils/seo";
import "../styles/portfolio.css";

function MemberPortfolio() {
  const { memberName } = useParams();
  const navigate = useNavigate();
  const memberData = useMemo(() => getMemberById(memberName), [memberName]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [memberName]);

  useEffect(() => {
    if (!memberData) {
      navigate("/", { replace: true });
      return;
    }

    updateDocumentMetadata({
      title: `${memberData.name} | ${memberData.role} | TodFodCoders`,
      description: memberData.bio || memberData.objective,
    });
  }, [memberData, navigate]);

  if (!memberData) {
    return null;
  }

  // Smart auto-scroll to next section when scrolling
  const scrollLockRef = useRef(false);
  const lastWheelTimeRef = useRef(0);
  useEffect(() => {
    const handleWheel = (e) => {
      const now = Date.now();
      const timeSinceLastWheel = now - lastWheelTimeRef.current;
      lastWheelTimeRef.current = now;

      // Prevent rapid consecutive scroll triggers (debounce)
      if (timeSinceLastWheel < 800 || scrollLockRef.current) {
        return;
      }

      const heroHeight = document.querySelector('.hero-section')?.offsetHeight || 0;
      const scrollY = window.scrollY;

      // Only auto-scroll if we're in hero section or just leaving it
      if (scrollY < heroHeight * 1.2) {
        const sections = [
          document.querySelector('.objective-section'),
          document.querySelector('.about-section'),
          document.querySelector('.skills-section'),
          document.querySelector('.projects-section'),
          document.querySelector('.experience-section'),
          document.querySelector('.certificates-section'),
        ].filter(Boolean);

        if (sections.length === 0) return;

        // Find next section to scroll to
        let targetSection = null;
        for (const section of sections) {
          const sectionTop = section.offsetTop;
          if (sectionTop > scrollY + 100) {
            targetSection = section;
            break;
          }
        }

        if (targetSection && e.deltaY > 0) {
          scrollLockRef.current = true;
          targetSection.scrollIntoView({ behavior: 'smooth' });
          window.setTimeout(() => {
            scrollLockRef.current = false;
          }, 1000);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const contactItems = [
    memberData.contact.email
      ? {
          label: "Email",
          href: `mailto:${memberData.contact.email}`,
          value: memberData.contact.email,
        }
      : null,
    memberData.contact.phone && !/[xX]{2,}/.test(memberData.contact.phone)
      ? {
          label: "Phone",
          href: `tel:${memberData.contact.phone.replace(/[^\d+]/g, "")}`,
          value: memberData.contact.phone,
        }
      : memberData.contact.phone
        ? { label: "Phone", value: memberData.contact.phone }
        : null,
    memberData.contact.location
      ? { label: "Location", value: memberData.contact.location }
      : null,
  ].filter(Boolean);

  const sections = [
    { id: "objective", className: "objective-section", label: "Objective", icon: "🎯" },
    { id: "about", className: "about-section", label: "About", icon: "👤" },
    { id: "skills", className: "skills-section", label: "Skills", icon: "💻" },
    { id: "projects", className: "projects-section", label: "Projects", icon: "🚀" },
    { id: "experience", className: "experience-section", label: "Experience", icon: "💼" },
    { id: "certificates", className: "certificates-section", label: "Certificates", icon: "🏆" },
  ];

  return (
    <div className="portfolio-page" key={memberName}>
      <Header currentMemberId={memberData.id} allMembers={MEMBERS_ARRAY} />
      <SectionNav sections={sections} />

      <main className="portfolio-content">
        <HeroSection member={memberData} />

        <div className="sections-container">
          {memberData.objective && (
            <section className="objective-section">
              <ObjectiveSection objective={memberData.objective} />
            </section>
          )}
          {memberData.aboutParagraphs?.length > 0 && (
            <section className="about-section">
              <AboutSection aboutParagraphs={memberData.aboutParagraphs} />
            </section>
          )}
          {memberData.skills?.length > 0 && (
            <section className="skills-section">
              <SkillsSection skills={memberData.skills} />
            </section>
          )}
          {memberData.projects?.length > 0 && (
            <section className="projects-section">
              <ProjectsSection projects={memberData.projects} />
            </section>
          )}
          {memberData.experience?.length > 0 && (
            <section className="experience-section">
              <ExperienceSection experience={memberData.experience} />
            </section>
          )}
          {memberData.certificates?.length > 0 && (
            <section className="certificates-section">
              <CertificatesSection certificates={memberData.certificates} />
            </section>
          )}

          <section className="resume-section">
            <div className="container">
              <h2>Resume & Contact</h2>
              <div className="resume-content">
                {memberData.resume?.heading && (
                  <p className="resume-heading">{memberData.resume.heading}</p>
                )}

                {contactItems.length > 0 && (
                  <div className="contact-links">
                    {contactItems.map((item) =>
                      item.href ? (
                        <a
                          key={item.label}
                          href={item.href}
                          className="contact-link"
                        >
                          <span>{item.label}</span>
                          <strong>{item.value}</strong>
                        </a>
                      ) : (
                        <div key={item.label} className="contact-link static">
                          <span>{item.label}</span>
                          <strong>{item.value}</strong>
                        </div>
                      ),
                    )}
                  </div>
                )}

                {memberData.resumeUrl && (
                  <a
                    href={memberData.resumeUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="download-btn"
                  >
                    📥 Download Resume
                  </a>
                )}

                {memberData.resume?.sections?.length > 0 && (
                  <div className="resume-grid">
                    {memberData.resume.sections.map((section) => (
                      <article key={section.title} className="resume-card">
                        <h3>{section.title}</h3>
                        <p>{section.content}</p>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MemberPortfolio;
