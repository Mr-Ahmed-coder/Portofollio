const Footer = () => {
  const navLinks = ["Home", "About Me", "Projects", "Services", "Contact"];
  const socials = [
    { icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7.5v4H10V22h4v-8.5z"/></svg>, color: "#1877f2", label: "Facebook", href: "#" },
    { icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>, color: "#333333", label: "GitHub", href: "https://github.com/Mr-Ahmed-coder?tab=repositories" },
    { icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, color: "#0077b5", label: "LinkedIn", href: "https://www.linkedin.com/in/ahmed-mo-ali-a06b362ab?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
  ];

  return (
    <footer className="section-padding" style={{
      background: "#060b18",
      borderTop: "1px solid rgba(14,165,233,0.12)",
      padding: "60px 60px 30px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Top glow line */}
      <div style={{
        position: "absolute", top: 0, left: "50%",
        transform: "translateX(-50%)",
        width: "40%", height: "1px",
        background: "linear-gradient(90deg, transparent, #0ea5e9, transparent)",
      }} />

      {/* Main footer content */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
        gap: "60px",
        marginBottom: "50px",
      }}>

        {/* Brand column */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
            <div style={{
              width: "36px", height: "36px",
              background: "linear-gradient(135deg, #0ea5e9, #0369a1)",
              borderRadius: "8px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: "900", color: "#fff", fontSize: "16px",
              boxShadow: "0 0 20px rgba(14,165,233,0.35)",
            }}>A</div>
            <span style={{
              fontSize: "22px", fontWeight: "800",
              color: "#fff", letterSpacing: "1px",
              fontFamily: "'Barlow Condensed', sans-serif",
            }}>Ahmed Mohamed</span>
          </div>

          <p style={{
            color: "#64748b",
            fontSize: "14px",
            lineHeight: "1.85",
            fontFamily: "'Barlow', sans-serif",
            maxWidth: "280px",
            marginBottom: "28px",
          }}>
            Crafting beautiful digital experiences that make a lasting impression.
            Available for freelance projects worldwide.
          </p>

          {/* Socials */}
          <div style={{ display: "flex", gap: "10px" }}>
            {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={{
                width: "38px", height: "38px",
                borderRadius: "50%",
                background: s.color === "#ffffff"
                  ? "rgba(255,255,255,0.1)"
                  : s.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff",
                fontSize: "12px",
                fontWeight: "700",
                textDecoration: "none",
                transition: "all 0.3s ease",
                border: s.color === "#ffffff" ? "1px solid rgba(255,255,255,0.2)" : "none",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 8px 20px ${s.color}55`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                  onClick={() => window.open("https://wa.me/25674844459", "_blank")}

              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "700",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontFamily: "'Barlow', sans-serif",
            marginBottom: "24px",
          }}>Quick Links</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {navLinks.map((link, i) => (
              <li key={i} style={{ marginBottom: "12px" }}>
                <a
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                    fontFamily: "'Barlow', sans-serif",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "#0ea5e9";
                    e.currentTarget.style.paddingLeft = "6px";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "#64748b";
                    e.currentTarget.style.paddingLeft = "0";
                  }}
                >
                  <span style={{ color: "#0ea5e9", fontSize: "10px" }}>▶</span>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services links */}
        <div>
          <h4 style={{
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "700",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontFamily: "'Barlow', sans-serif",
            marginBottom: "24px",
          }}>Services</h4>

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {["UI/UX Design", "Web Development", "App Design", "Brand Identity", "Consulting"].map((s, i) => (
              <li key={i} style={{ marginBottom: "12px" }}>
                <a href="#services" style={{
                  color: "#64748b",
                  fontSize: "14px",
                  fontFamily: "'Barlow', sans-serif",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "#0ea5e9";
                    e.currentTarget.style.paddingLeft = "6px";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "#64748b";
                    e.currentTarget.style.paddingLeft = "0";
                  }}
                >
                  <span style={{ color: "#0ea5e9", fontSize: "10px" }}>▶</span>
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        height: "1px",
        background: "rgba(14,165,233,0.1)",
        marginBottom: "24px",
      }} />

      {/* Bottom bar */}
      <div className="flex-stack flex-center-mobile" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap",
        gap: "12px",
      }}>
        <p style={{
          color: "#334155",
          fontSize: "13px",
          fontFamily: "'Barlow', sans-serif",
        }}>
          © {new Date().getFullYear()} <span style={{ color: "#0ea5e9" }}>Ahmed</span>. All rights reserved.
        </p>
        <p style={{
          color: "#334155",
          fontSize: "13px",
          fontFamily: "'Barlow', sans-serif",
        }}>
          Built with <span style={{ color: "#0ea5e9" }}>MERN Stack</span> ⚡
        </p>
      </div>
    </footer>
  );
};

export default Footer;