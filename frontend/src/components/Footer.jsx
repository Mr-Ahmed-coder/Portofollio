const Footer = () => {
  const navLinks = ["Home", "About Me", "Projects", "Services", "Contact"];
  const socials = [
    { icon: "f", color: "#1877f2", label: "Facebook", href: "#" },
    { icon: "◉", color: "#e1306c", label: "Instagram", href: "#" },
    { icon: "in", color: "#0077b5", label: "LinkedIn", href: "#" },
    { icon: "𝕏", color: "#ffffff", label: "Twitter", href: "#" },
  ];

  return (
    <footer style={{
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
        gridTemplateColumns: "1.5fr 1fr 1fr",
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
            }}>J</div>
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
              <a key={i} href={s.href} aria-label={s.label} style={{
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
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
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