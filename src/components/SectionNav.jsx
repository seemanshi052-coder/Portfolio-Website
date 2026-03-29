import { useEffect, useRef, useState } from "react";
import "../styles/section-nav.css";

function SectionNav({ sections }) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "objective");
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently in view
      for (const section of sections) {
        const element = document.querySelector(`.${section.className}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in middle of viewport
          if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleNavClick = (sectionId, className) => {
    const element = document.querySelector(`.${className}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="section-nav" ref={navRef}>
      <div className="nav-container">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`nav-item ${activeSection === section.id ? "active" : ""}`}
            onClick={() => handleNavClick(section.id, section.className)}
            title={section.label}
          >
            <span className="nav-icon">{section.icon}</span>
            <span className="nav-label">{section.label}</span>
            {activeSection === section.id && <span className="nav-indicator"></span>}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default SectionNav;
