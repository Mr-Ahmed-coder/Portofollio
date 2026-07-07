const Footer = () => {
  const navLinks = ["Home", "About Me", "Skills", "Projects", "Contact"];
  const socials = [
    { icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7.5v4H10V22h4v-8.5z"/></svg>, color: "#1877f2", label: "Facebook", href: "https://www.facebook.com/share/14n92cSFtzQ/?mibextid=wwXIfr" },
    { icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>, color: "#e4405f", label: "Instagram", href: "https://www.instagram.com/the_qadavi" },
    { icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, color: "#0077b5", label: "LinkedIn", href: "https://www.linkedin.com/in/ahmed-mo-ali-a06b362ab" },
  ];

  return (
    <footer className="section-padding" style={{
      background: "#0B0B0B",
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
            color: "#8A8A8A",
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
                    color: "#8A8A8A",
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
                    e.currentTarget.style.color = "#8A8A8A";
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
          color: "#6B6B6B",
          fontSize: "13px",
          fontFamily: "'Barlow', sans-serif",
        }}>
          © {new Date().getFullYear()} <span style={{ color: "#0ea5e9" }}>Ahmed</span>. All rights reserved.
        </p>
        <p style={{
          color: "#6B6B6B",
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


