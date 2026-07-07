import { useState, useEffect } from "react";

const words = ["Full Stack Developer", "MERN Stack Developer", "React & Node.js Developer", "Building Business Systems"];

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const speed = isDeleting ? 80 : 120;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(current.substring(0, typedText.length + 1));
        if (typedText === current) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setTypedText(current.substring(0, typedText.length - 1));
        if (typedText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIndex]);

  return (
    <section id="home" className="hero-padding flex-stack-tablet" style={{
      minHeight: "100vh",
      background: "#0B0B0B",
      display: "flex",
      alignItems: "center",
      padding: "120px 60px 40px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div className="hero-background-image" aria-hidden="true" />
      <div className="hero-background-overlay" aria-hidden="true" />

      {/* Background grid lines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        opacity: 0.5,
      }} />

      {/* Glowing orb top right */}
      <div className="hero-glow-orb" style={{
        position: "absolute", top: "10%", right: "30%",
        width: "300px", height: "300px",
        background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />

      {/* Left Content */}
      <div style={{
        flex: 1, zIndex: 2,
      }}>
        {/* Name badge */}
        <div className="hero-badge" style={{
          display: "inline-block",
          background: "rgba(14,165,233,0.12)",
          border: "1px solid rgba(14,165,233,0.3)",
          color: "#0ea5e9",
          fontSize: "2px",
          fontWeight: "700",
          letterSpacing: "2px",
          padding: "6px 16px",
          borderRadius: "4px",
          marginBottom: "20px",
          fontFamily: "'Barlow', sans-serif",
        }}>
           EngAhmed
 </div>

        {/* Main Heading */}
        <h1 className="hero-title" style={{
          margin: "0 0 12px 0",
          fontSize: "clamp(38px, 5vw, 64px)",
          fontWeight: "800",
          color: "#ffffff",
          lineHeight: 1.08,
          fontFamily: "'Barlow', sans-serif",
          letterSpacing: "0",
        }}>
          Hi, I'm <span style={{ color: "#0ea5e9" }}>Ahmed Mohamed</span>
        </h1>

        {/* Typing line */}
        <h2 className="hero-subtitle" style={{
          margin: "0 0 24px 0",
          fontSize: "clamp(24px, 3vw, 38px)",
          fontWeight: "700",
          color: "#e2e8f0",
          lineHeight: 1.25,
          fontFamily: "'Barlow', sans-serif",
          letterSpacing: "0",
          minHeight: "52px",
        }}>
          <span style={{ color: "#0ea5e9" }}>{typedText}</span>
          <span style={{
            display: "inline-block", width: "3px", height: "0.8em",
            background: "#0ea5e9", marginLeft: "4px",
            verticalAlign: "middle",
            animation: "blink 1s step-end infinite",
          }} />
        </h2>

        {/* Bio text */}
        <p className="hero-copy" style={{
          color: "#cbd5e1",
          fontSize: "16px",
          lineHeight: "1.75",
          maxWidth: "560px",
          marginBottom: "36px",
          fontFamily: "'Barlow', sans-serif",
        }}>
          I build modern, scalable web applications and business management systems using React, Node.js, Express, and MongoDB. I focus on clean design, performance, and real business value.
        </p>

        {/* CTA + Socials */}
        <div className="flex-stack flex-center-mobile" style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
          <div className="hero-cta-buttons" style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                minHeight: "48px",
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px",
                padding: "0 28px",
                background: "linear-gradient(135deg, #0ea5e9, #0369a1)",
                color: "#fff",
                border: "1px solid rgba(56,189,248,0.35)",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: "700",
                letterSpacing: "0.4px",
                cursor: "pointer",
                fontFamily: "'Barlow', sans-serif",
                boxShadow: "0 12px 34px rgba(14,165,233,0.28)",
                transition: "all 0.3s ease",
                textDecoration: "none",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 16px 42px rgba(14,165,233,0.42)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 12px 34px rgba(14,165,233,0.28)";
              }}
            >
              View Projects
              <svg aria-hidden="true" width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0 }}><path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="m13 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                minHeight: "48px",
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px",
                padding: "0 28px",
                background: "rgba(255,255,255,0.07)",
                color: "#f8fafc",
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: "700",
                letterSpacing: "0.4px",
                cursor: "pointer",
                fontFamily: "'Barlow', sans-serif",
                boxShadow: "0 10px 28px rgba(0,0,0,0.22)",
                transition: "all 0.3s ease",
                textDecoration: "none",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.borderColor = "rgba(14,165,233,0.32)";
                e.currentTarget.style.boxShadow = "0 14px 36px rgba(14,165,233,0.18)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
                e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.22)";
              }}
            >
              Contact Me
              <svg aria-hidden="true" width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path d="M21 4 10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="m21 4-7 18-4-7-7-4 18-7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          {/* Social Icons */}
          <div className="hero-social-container" aria-label="Social media profiles">
            {[
              { icon: <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7.5v4H10V22h4v-8.5z"/></svg>, color: "#1877f2", label: "Facebook", href: "https://www.facebook.com/share/14n92cSFtzQ/?mibextid=wwXIfr" },
              { icon: <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>, color: "#e4405f", label: "Instagram", href: "https://www.instagram.com/the_qadavi" },
              { icon: <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>, color: "#ffffff", label: "GitHub", href: "https://github.com/Mr-Ahmed-coder?tab=repositories" },
              { icon: <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, color: "#0077b5", label: "LinkedIn", href: "https://www.linkedin.com/in/ahmed-mo-ali-a06b362ab" },
            ].map((social) => (
              <a
                key={social.label}
                className="hero-social-link"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                data-tooltip={social.label}
                style={{ "--social-color": social.color }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Profile Image Area */}
      <div className="hero-img-tablet" style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        position: "relative",
        zIndex: 2,
        minHeight: "520px",
      }}>
        {/* Decorative grid lines behind image */}
        <div style={{
          position: "absolute", top: "10%", right: "5%",
          width: "200px", height: "200px",
          backgroundImage: `repeating-linear-gradient(
            0deg, rgba(14,165,233,0.2) 0px, rgba(14,165,233,0.2) 1px,
            transparent 1px, transparent 18px
          ), repeating-linear-gradient(
            90deg, rgba(14,165,233,0.2) 0px, rgba(14,165,233,0.2) 1px,
            transparent 1px, transparent 18px
          )`,
          opacity: 0.6,
        }} />

        {/* Floating dark teal balls */}
        {[
          { size: 80, top: "8%", left: "20%", delay: "0s" },
          { size: 50, top: "18%", right: "8%", delay: "0.5s" },
          { size: 35, top: "35%", left: "5%", delay: "1s" },
        ].map((ball, i) => (
          <div key={i} style={{
            position: "absolute",
            width: ball.size, height: ball.size,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #222222, #111111)",
            boxShadow: "inset -4px -4px 12px rgba(0,0,0,0.5), inset 4px 4px 12px rgba(14,165,233,0.1), 0 8px 32px rgba(0,0,0,0.4)",
            top: ball.top,
            left: ball.left,
            right: ball.right,
            animation: `float 4s ease-in-out ${ball.delay} infinite`,
          }} />
        ))}

        {/* Profile image card */}
        <div className="hero-profile-card" style={{
          width: "380px",
          height: "480px",
          borderRadius: "24px",
          padding: "10px",
          overflow: "hidden",
          position: "relative",
          zIndex: 3,
          background: "linear-gradient(145deg, rgba(255,255,255,0.16), rgba(255,255,255,0.045))",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 25px 80px rgba(0,0,0,0.45), 0 0 40px rgba(0,140,255,0.18)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          transition: "transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease",
        }}>

       

          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(180deg, #181818 0%, #222222 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column", gap: "12px",
            backgroundImage: "url('/images/image2.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "18px",
          }}>
            <div style={{ fontSize: "64px" }}></div>
            <p style={{
              color: "#7A7A7A", fontSize: "13px",
              fontFamily: "'Barlow', sans-serif",
              textAlign: "center", padding: "0 20px",
            }}>
             
            </p>
          </div>
        </div>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@700;800;900&display=swap');

        .hero-badge,
        .hero-title,
        .hero-subtitle,
        .hero-copy,
        .hero-cta-buttons,
        .hero-social-container {
          opacity: 0;
          will-change: opacity, transform;
        }

        .hero-badge {
          animation: heroFadeUp 0.6s ease 0.08s forwards;
        }

        .hero-title {
          animation: heroFadeUp 0.72s cubic-bezier(0.22, 1, 0.36, 1) 0.18s forwards;
        }

        .hero-subtitle {
          animation: heroFadeUp 0.72s cubic-bezier(0.22, 1, 0.36, 1) 0.28s forwards;
        }

        .hero-copy {
          animation: heroFadeUp 0.7s ease 0.42s forwards;
        }

        .hero-cta-buttons {
          animation: heroFadeUp 0.68s ease 0.58s forwards;
        }

        .hero-social-container {
          animation: heroFadeUp 0.68s ease 0.74s forwards;
        }

        .hero-profile-card {
          will-change: opacity, transform, translate;
          animation:
            heroProfileIn 0.82s cubic-bezier(0.22, 1, 0.36, 1) 0.32s backwards,
            heroProfileFloat 8s ease-in-out 1.25s infinite;
        }

        .hero-glow-orb {
          animation: heroGlowPulse 8s ease-in-out infinite;
          will-change: opacity, transform;
        }

        .hero-background-image {
          position: absolute;
          inset: 0;
          background-image: url('/images/backgroundimage.jpeg');
          background-size: cover;
          background-position: 72% center;
          background-repeat: no-repeat;
          opacity: 1;
          transform: scale(1.01);
          pointer-events: none;
        }

        .hero-background-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 78% 42%, rgba(14,165,233,0.12) 0%, rgba(14,165,233,0.055) 24%, transparent 50%),
            linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.60) 48%, rgba(0,0,0,0.35) 100%),
            linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.04) 48%, rgba(0,0,0,0.28) 100%);
          pointer-events: none;
        }

        @media (max-width: 1024px) {
          .hero-background-image {
            background-position: 70% center;
            opacity: 1;
          }

          .hero-background-overlay {
            background:
              radial-gradient(circle at 74% 34%, rgba(14,165,233,0.11) 0%, rgba(14,165,233,0.045) 26%, transparent 52%),
              linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.60) 52%, rgba(0,0,0,0.38) 100%),
              linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.34) 100%);
          }
        }

        @media (max-width: 640px) {
          .hero-background-image {
            background-position: 66% top;
            opacity: 1;
          }

          .hero-background-overlay {
            background:
              radial-gradient(circle at 70% 24%, rgba(14,165,233,0.09) 0%, transparent 48%),
              linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.66) 54%, rgba(0,0,0,0.44) 100%),
              linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.14) 46%, rgba(0,0,0,0.54) 100%);
          }
        }

        .hero-social-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 8px;
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 16px 40px rgba(0,0,0,0.28);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .hero-social-link {
          position: relative;
          width: 46px;
          height: 46px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-decoration: none;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.08);
          transition: transform 0.28s ease, box-shadow 0.28s ease, background 0.28s ease, border-color 0.28s ease;
        }

        .hero-social-link:hover,
        .hero-social-link:focus-visible {
          transform: translateY(-4px) scale(1.08);
          background: rgba(14,165,233,0.12);
          border-color: rgba(14,165,233,0.34);
          box-shadow: 0 12px 28px rgba(14,165,233,0.24), 0 0 24px color-mix(in srgb, var(--social-color) 42%, transparent);
          outline: none;
        }

        .hero-social-link::after {
          content: attr(data-tooltip);
          position: absolute;
          left: 50%;
          bottom: calc(100% + 10px);
          transform: translate(-50%, 6px);
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(11,11,11,0.9);
          border: 1px solid rgba(255,255,255,0.12);
          color: #fff;
          font: 700 11px 'Barlow', sans-serif;
          letter-spacing: 0.3px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.22s ease, transform 0.22s ease;
          box-shadow: 0 10px 24px rgba(0,0,0,0.3);
        }

        .hero-social-link:hover::after,
        .hero-social-link:focus-visible::after {
          opacity: 1;
          transform: translate(-50%, 0);
        }

        @media (max-width: 640px) {
          .hero-cta-buttons {
            width: 100%;
            justify-content: center;
          }

          .hero-cta-buttons a {
            flex: 1 1 150px;
            max-width: 220px;
          }
        }

        .hero-profile-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255,255,255,0.18);
          box-shadow: 0 32px 92px rgba(0,0,0,0.52), 0 0 52px rgba(0,140,255,0.24) !important;
        }

        @media (max-width: 640px) {
          .hero-profile-card {
            border-radius: 22px !important;
            padding: 8px !important;
          }
        }

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translate3d(0, 16px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @keyframes heroProfileIn {
          from { opacity: 0; transform: translate3d(34px, 12px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @keyframes heroProfileFloat {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -7px; }
        }

        @keyframes heroGlowPulse {
          0%, 100% { opacity: 0.78; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-badge,
          .hero-title,
          .hero-subtitle,
          .hero-copy,
          .hero-cta-buttons,
          .hero-social-container,
          .hero-profile-card,
          .hero-glow-orb {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            translate: none !important;
            will-change: auto !important;
          }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;


