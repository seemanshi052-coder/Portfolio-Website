import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  applyImageFallback,
  createAvatarPlaceholder,
  withFallbackImage,
} from "../utils/placeholders";
import "../styles/hero.css";

function HeroSection({ member }) {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const fallbackImage = createAvatarPlaceholder(member.name);
  const heroSummary = member.objective || member.bio || member.about || "";

  useEffect(() => {
    if (!gsap?.timeline) {
      return undefined;
    }

    const imageElement = imageRef.current;
    const contentElement = contentRef.current;

    const animateHero = () => {
      const timeline = gsap.timeline();

      if (imageElement) {
        timeline.fromTo(
          imageElement,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
          0,
        );
      }

      if (contentElement) {
        timeline.fromTo(
          contentElement.querySelector("h1"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.2,
        );

        const roleEl = contentElement.querySelector(".hero-role");
        const subtextEl = contentElement.querySelector(".hero-subtext");
        if (roleEl && subtextEl) {
          timeline.fromTo(
            [roleEl, subtextEl],
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
            },
            0.4,
          );
        }

        const badges = contentElement.querySelectorAll(".badge");
        if (badges.length) {
          timeline.fromTo(
            badges,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.08,
              ease: "power2.out",
            },
            0.7,
          );
        }
      }

      return timeline;
    };

    const timer = window.setTimeout(() => {
      const timeline = animateHero();
      if (timeline) {
        heroRef.current?.setAttribute("data-animation-ready", "true");
      }
    }, 100);

    return () => {
      window.clearTimeout(timer);
      if (imageElement) {
        gsap.killTweensOf(imageElement);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current && contentRef.current && heroRef.current) {
        const heroHeight = heroRef.current.offsetHeight;
        const scrollY = window.scrollY;
        const heroBottom = heroHeight + 80; // Account for header

        // Calculate progress: 0 at top, 1 when hero ends
        const scrollProgress = Math.min(Math.max(scrollY / (heroBottom * 0.8), 0), 1);
        setScrollProgress(scrollProgress);

        if (scrollY < heroBottom) {
          // Image moves right as we scroll
          const moveRight = scrollProgress * 150;
          const scaleEffect = 1 - scrollProgress * 0.05;
          const imageOpacity = 1 - scrollProgress * 0.2; // Slight fade as we scroll

          if (gsap?.set) {
            gsap.set(imageRef.current, {
              x: moveRight,
              scale: scaleEffect,
              opacity: imageOpacity,
            });
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="hero-container">
        <div className="hero-image" style={{ willChange: 'transform, opacity' }}>
          <div className="image-glow"></div>
          <img
            ref={imageRef}
            src={withFallbackImage(member.imageUrl, fallbackImage)}
            alt={`${member.name} portrait`}
            fetchPriority="high"
            onError={(event) => applyImageFallback(event, fallbackImage)}
          />
        </div>
        <div className="hero-content" ref={contentRef}>
          <h1>{member.name}</h1>
          <p className="hero-role">{member.role}</p>
          <p className="hero-subtext">
            {heroSummary.length > 150
              ? `${heroSummary.slice(0, 150)}...`
              : heroSummary}
          </p>
          <div className="hero-badges">
            <span className="badge">💻 Developer</span>
            <span className="badge">🚀 Innovator</span>
            <span className="badge">🎯 Problem Solver</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`scroll-indicator ${scrollProgress > 0.2 ? "hidden" : ""}`}
      >
        <span>↓ Scroll to explore</span>
      </div>
    </section>
  );
}

export default HeroSection;
