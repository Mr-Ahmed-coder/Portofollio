import { useState, useEffect } from "react";

const words = ["Designer", "Developer", "Freelancer", "Creator"];

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
    <section id="home" style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #080d1e 0%, #0d1535 50%, #0a1628 100%)",
      display: "flex",
      alignItems: "center",
      padding: "0 60px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background grid lines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />

      {/* Glowing orb top right */}
      <div style={{
        position: "absolute", top: "10%", right: "30%",
        width: "300px", height: "300px",
        background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />

      {/* Left Content */}
      <div style={{
        flex: 1, zIndex: 2,
        animation: "fadeInLeft 0.9s ease forwards",
      }}>
        {/* Name badge */}
        <div style={{
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
        <h1 style={{
          margin: "0 0 8px 0",
          fontSize: "clamp(40px, 5vw, 68px)",
          fontWeight: "900",
          color: "#ffffff",
          lineHeight: 1.1,
          fontFamily: "sans-serif",
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}>
          HeY! I'M Ahmed
        </h1>

        {/* Typing line */}
        <h2 style={{
          margin: "0 0 24px 0",
          fontSize: "clamp(36px, 4.5vw, 62px)",
          fontWeight: "900",
          color: "#0ea5e9",
          lineHeight: 1.1,
          fontFamily: "'Barlow Condensed', sans-serif",
          letterSpacing: "1px",
          textTransform: "uppercase",
          minHeight: "80px",
        }}>
          I'M A {typedText}
          <span style={{
            display: "inline-block", width: "3px", height: "0.8em",
            background: "#0ea5e9", marginLeft: "4px",
            verticalAlign: "middle",
            animation: "blink 1s step-end infinite",
          }} />
        </h2>

        {/* Bio text */}
        <p style={{
          color: "#94a3b8",
          fontSize: "15px",
          lineHeight: "1.8",
          maxWidth: "420px",
          marginBottom: "36px",
          fontFamily: "'Barlow', sans-serif",
        }}>
         Hi, I’m a passionate Full Stack Developer specializing in the MERN stack (MongoDB, Express.js, React, Node.js). I enjoy building clean, scalable, 
         and user-friendly web applications from end to end. From designing responsive frontends to developing robust backend APIs, 
         I focus on writing efficient code and creating seamless user experiences. I’m always eager to learn new technologies and take 
         on challenging projects that help me grow as a developer.

        </p>

        {/* CTA + Socials */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
          <button style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "14px 32px",
            background: "linear-gradient(135deg, #0ea5e9, #0369a1)",
            color: "#fff",
            border: "none",
            borderRadius: "50px",
            fontSize: "14px",
            fontWeight: "700",
            letterSpacing: "1px",
            cursor: "pointer",
            fontFamily: "'Barlow', sans-serif",
            boxShadow: "0 0 30px rgba(14,165,233,0.4)",
            transition: "all 0.3s ease",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            Connect with Me
             <span style={{ fontSize: "16px" }}>→</span>
          </button>

          {/* Social Icons */}
          <div style={{ display: "flex", gap: "12px" }}>
            {[
              { icon: "f", color: "#1877f2", label: "Facebook" },
              { icon: "◉", color: "#e1306c", label: "github" },
              { icon: "in", color: "#0077b5", label: "LinkedIn" },
            ].map((social, i) => (
              <a key={i} href="#" aria-label={social.label} style={{
                width: "40px", height: "40px",
                borderRadius: "50%",
                background: social.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff",
                fontSize: "13px",
                fontWeight: "700",
                textDecoration: "none",
                transition: "all 0.3s ease",
                boxShadow: `0 0 15px ${social.color}55`,
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px) scale(1.1)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0) scale(1)"}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Profile Image Area */}
      <div style={{
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
            background: "radial-gradient(circle at 35% 35%, #1a3a4a, #0a1a25)",
            boxShadow: "inset -4px -4px 12px rgba(0,0,0,0.5), inset 4px 4px 12px rgba(14,165,233,0.1), 0 8px 32px rgba(0,0,0,0.4)",
            top: ball.top,
            left: ball.left,
            right: ball.right,
            animation: `float 4s ease-in-out ${ball.delay} infinite`,
          }} />
        ))}

        {/* Profile image placeholder — replace src with your actual image */}
        <div style={{
          width: "380px",
          height: "480px",

          borderRadius: "16px",
          overflow: "hidden",
          position: "relative",
          zIndex: 3,
        }}>

       

          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(180deg, #0d1f3c 0%, #162444 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column", gap: "12px",
            backgroundImage: "url('/src/images/image2.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "4px solid #1877f2",
          }}>
            <div style={{ fontSize: "64px" }}></div>
            <p style={{
              color: "#475569", fontSize: "13px",
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
