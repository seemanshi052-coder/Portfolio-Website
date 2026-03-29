import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { MEMBERS_ARRAY, getMemberById } from "../data/members";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ObjectiveSection from "../components/sections/ObjectiveSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import CertificatesSection from "../components/sections/CertificatesSection";
import SectionNav from "../components/SectionNav";
import Footer from "../components/Footer";
import { updateDocumentMetadata } from "../utils/seo";
import "../styles/portfolio.css";

function ContactIcon({ type }) {
  const icons = {
    Email: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h16v12H4z" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="m5 7 7 6 7-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    Phone: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.5 4.5h3l1.2 3.1-1.8 1.8a14 14 0 0 0 4.6 4.6l1.8-1.8 3.1 1.2v3a1.5 1.5 0 0 1-1.6 1.5A15.8 15.8 0 0 1 6 6.1 1.5 1.5 0 0 1 7.5 4.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    Location: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.2" fill="currentColor" />
      </svg>
    ),
    GitHub: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.8a9.2 9.2 0 0 0-2.9 18c.5.1.7-.2.7-.5v-1.8c-3 .7-3.7-1.3-3.7-1.3-.4-1-.9-1.3-.9-1.3-.8-.6 0-.6 0-.6.9.1 1.5.9 1.5.9.8 1.4 2.2 1 2.7.8.1-.6.3-1 .5-1.2-2.4-.3-5-1.2-5-5.3 0-1.1.4-2 1-2.8-.1-.3-.4-1.4.1-2.9 0 0 .8-.3 3 .9a10 10 0 0 1 5.4 0c2.1-1.2 3-.9 3-.9.6 1.5.2 2.6.1 2.9.7.8 1 1.7 1 2.8 0 4.1-2.5 5-5 5.3.4.3.6.9.6 1.9v2.8c0 .3.2.6.7.5A9.2 9.2 0 0 0 12 2.8Z" fill="currentColor" />
      </svg>
    ),
    LinkedIn: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.5 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM5.2 9.8h2.6v8.5H5.2Zm4.3 0H12v1.2h.1c.3-.6 1.2-1.5 2.7-1.5 2.9 0 3.4 1.8 3.4 4.3v4.5h-2.6v-4c0-1 0-2.2-1.4-2.2s-1.6 1.1-1.6 2.1v4.1H9.5Z" fill="currentColor" />
      </svg>
    ),
    Instagram: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4.5" y="4.5" width="15" height="15" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16.8" cy="7.2" r="1" fill="currentColor" />
      </svg>
    ),
    LeetCode: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.7 4.8 8.2 11.3a1 1 0 0 0 0 1.4l6.5 6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.7 12h8.1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12.7 2.8 6 9.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  };

  return <span className="contact-icon">{icons[type] ?? icons.Email}</span>;
}

function MemberPortfolio() {
  const { memberName } = useParams();
  const navigate = useNavigate();
  const memberData = useMemo(() => getMemberById(memberName), [memberName]);

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

  const contactItems = [
    memberData.contact.email
      ? {
          label: "Email",
          icon: "Email",
          href: `mailto:${memberData.contact.email}`,
          value: memberData.contact.email,
        }
      : null,
    memberData.contact.phone && !/[xX]{2,}/.test(memberData.contact.phone)
      ? {
          label: "Phone",
          icon: "Phone",
          href: `tel:${memberData.contact.phone.replace(/[^\d+]/g, "")}`,
          value: memberData.contact.phone,
        }
      : memberData.contact.phone
        ? { label: "Phone", icon: "Phone", value: memberData.contact.phone }
        : null,
    memberData.contact.location
      ? { label: "Location", icon: "Location", value: memberData.contact.location }
      : null,
    memberData.contact.github
      ? {
          label: "GitHub",
          icon: "GitHub",
          href: memberData.contact.github,
          value: memberData.contact.github
            .replace(/^https?:\/\/(www\.)?github\.com\//, "@")
            .replace(/\/$/, ""),
        }
      : null,
    memberData.contact.linkedin
      ? {
          label: "LinkedIn",
          icon: "LinkedIn",
          href: memberData.contact.linkedin,
          value: memberData.contact.linkedin
            .replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "in/")
            .replace(/\/$/, ""),
        }
      : null,
    memberData.contact.instagram
      ? {
          label: "Instagram",
          icon: "Instagram",
          href: memberData.contact.instagram,
          value: memberData.contact.instagram
            .replace(/^https?:\/\/(www\.)?instagram\.com\//, "@")
            .replace(/\/$/, ""),
        }
      : null,
    memberData.contact.leetcode
      ? {
          label: "LeetCode",
          icon: "LeetCode",
          href: memberData.contact.leetcode,
          value: memberData.contact.leetcode
            .replace(/^https?:\/\/(www\.)?leetcode\.com\/u?\//, "")
            .replace(/^https?:\/\/(www\.)?leetcode\.com\//, "")
            .replace(/\/$/, ""),
        }
      : null,
  ].filter(Boolean);

  const hasCertificatesSection =
    (memberData.certificates?.length || 0) > 0 ||
    (memberData.achievements?.length || 0) > 0;

  const hasResumeSection =
    contactItems.length > 0 ||
    Boolean(memberData.resumeUrl) ||
    Boolean(memberData.resume?.heading) ||
    (memberData.resume?.sections?.length || 0) > 0;

  const sections = [
    memberData.objective
      ? { id: "objective", className: "objective-section", label: "Objective", icon: "\u{1F3AF}" }
      : null,
    memberData.aboutParagraphs?.length > 0
      ? { id: "about", className: "about-section", label: "About", icon: "\u{1F464}" }
      : null,
    memberData.skills?.length > 0
      ? { id: "skills", className: "skills-section", label: "Skills", icon: "\u{1F6E0}" }
      : null,
    memberData.projects?.length > 0
      ? { id: "projects", className: "projects-section", label: "Projects", icon: "\u{1F680}" }
      : null,
    hasCertificatesSection
      ? {
          id: "certificates",
          className: "certificates-section",
          label: "Certificates",
          icon: "\u{1F3C6}",
        }
      : null,
    hasResumeSection
      ? {
          id: "resume-certifications",
          className: "resume-section",
          label: "Resume & Certifications",
          icon: "\u{1F4C4}",
          targetClassNames: hasCertificatesSection
            ? ["resume-section", "certificates-section"]
            : ["resume-section"],
        }
      : null,
  ].filter(Boolean);

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
          {hasCertificatesSection && (
            <section className="certificates-section">
              <CertificatesSection
                certificates={memberData.certificates}
                achievements={memberData.achievements}
              />
            </section>
          )}
          {hasResumeSection && (
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
                            <span className="contact-label">
                              <ContactIcon type={item.icon} />
                              <span>{item.label}</span>
                            </span>
                            <strong>{item.value}</strong>
                          </a>
                        ) : (
                          <div key={item.label} className="contact-link static">
                            <span className="contact-label">
                              <ContactIcon type={item.icon} />
                              <span>{item.label}</span>
                            </span>
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
                      Download Resume
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MemberPortfolio;
