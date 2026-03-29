import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TEAM_CONFIG } from "../config/teamConfig";
import { MEMBERS_ARRAY } from "../data/members";
import MemberCard from "../components/MemberCard";
import Footer from "../components/Footer";
import {
  DEFAULT_PAGE_DESCRIPTION,
  DEFAULT_PAGE_TITLE,
  updateDocumentMetadata,
} from "../utils/seo";
import "../styles/landing.css";

function LandingPage() {
  const navigate = useNavigate();
  const navigationTimeoutRef = useRef(null);

  useEffect(() => {
    updateDocumentMetadata({
      title: DEFAULT_PAGE_TITLE,
      description: DEFAULT_PAGE_DESCRIPTION,
    });

    if (!gsap?.timeline) {
      return undefined;
    }

    const timeline = gsap.timeline();

    timeline
      .fromTo(
        ".landing-hero h1",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      )
      .fromTo(
        ".landing-hero p",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.8",
      )
      .fromTo(
        ".member-card",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4",
      );

    return () => {
      timeline.kill();
    };
  }, []);

  useEffect(
    () => () => {
      if (navigationTimeoutRef.current) {
        window.clearTimeout(navigationTimeoutRef.current);
      }
    },
    [],
  );

  const handleMemberClick = (memberId) => {
    const transitionDuration = gsap?.to ? 300 : 0;

    if (navigationTimeoutRef.current) {
      window.clearTimeout(navigationTimeoutRef.current);
    }

    if (gsap?.to) {
      gsap.to(".member-card", {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power1.in",
      });
    }

    navigationTimeoutRef.current = window.setTimeout(() => {
      navigate(`/${memberId}`);
    }, transitionDuration);
  };

  return (
    <div className="landing-page">
      {/* Team Header */}
      <section className="team-header">
        <div className="container">
          <h1 className="team-title">{TEAM_CONFIG.teamName}</h1>
          <p className="team-subtitle">A passionate team innovating at {TEAM_CONFIG.hackathonName}</p>
        </div>
      </section>

      {/* Team Members Cards */}
      <section className="team-section">
        <div className="container">
          <div className="members-carousel">
            {MEMBERS_ARRAY.map((member) => (
              <div
                key={member.id}
                className="member-flask-card"
                onClick={() => handleMemberClick(member.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleMemberClick(member.id);
                  }
                }}
                aria-label={`Open ${member.name}'s portfolio`}
              >
                <div className="flask-image-wrapper">
                  <img
                    src={
                      member.imageUrl || 
                      `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400'%3E%3Crect fill='%23102740' width='300' height='400'/%3E%3C/svg%3E`
                    }
                    alt={`${member.name} portrait`}
                    className="flask-image"
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400'%3E%3Crect fill='%23102740' width='300' height='400'/%3E%3C/svg%3E`;
                    }}
                  />
                </div>
                <div className="flask-content">
                  <h3>{member.name}</h3>
                  <p className="flask-role">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default LandingPage;
