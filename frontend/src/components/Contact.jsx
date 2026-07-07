import { useEffect, useRef, useState } from "react";

const contactEmail = "engahmedmohamedali24@gmail.com";

const infoItems = [
  { icon: "L", label: "Location", value: "Kampala, Uganda" },
  { icon: "E", label: "Email", value: "engahmedmohamedali24@gmail.com" },
  { icon: "P", label: "Phone", value: "+25674844459" },
  { icon: "A", label: "Availability", value: "Available anytime" },
];

const socialLinks = [
  { icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7.5v4H10V22h4v-8.5z"/></svg>, color: "#1877f2", label: "Facebook", href: "https://www.facebook.com/share/14n92cSFtzQ/?mibextid=wwXIfr" },
  { icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>, color: "#e4405f", label: "Instagram", href: "https://www.instagram.com/the_qadavi" },
  { icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, color: "#0077b5", label: "LinkedIn", href: "https://www.linkedin.com/in/ahmed-mo-ali-a06b362ab" },
];

const Contact = () => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      setStatus("empty");
      return;
    }

    const emailSubject = encodeURIComponent(subject);
    const emailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href = `mailto:${contactEmail}?subject=${emailSubject}&body=${emailBody}`;
    setStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    background: "rgba(14,165,233,0.05)",
    border: "1px solid rgba(14,165,233,0.2)",
    borderRadius: "10px",
    color: "#ffffff",
    fontSize: "14px",
    fontFamily: "'Barlow', sans-serif",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  };

  return (
    <section id="contact" ref={sectionRef} className="section-padding" style={{
        background: "linear-gradient(180deg, #111111 0%, #0B0B0B 100%)",
        padding: "100px 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "5%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.6s ease",
          marginBottom: "56px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(14,165,233,0.12)",
            border: "1px solid rgba(14,165,233,0.3)",
            color: "#0ea5e9",
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "2px",
            padding: "6px 16px",
            borderRadius: "4px",
            marginBottom: "14px",
            fontFamily: "'Barlow', sans-serif",
          }}
        >
          CONTACT
        </div>

        <h2 className="section-title" style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: "900",
            color: "#ffffff",
            fontFamily: "'Barlow Condensed', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          LET&apos;S <span style={{ color: "#0ea5e9" }}>WORK TOGETHER</span>
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: "60px",
          alignItems: "start",
        }}
      >
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-40px)",
            transition: "all 0.7s ease 0.2s",
          }}
        >
          <p
            style={{
              color: "#94a3b8",
              fontSize: "15px",
              lineHeight: "1.85",
              fontFamily: "'Barlow', sans-serif",
              marginBottom: "40px",
            }}
          >
            If you are looking for a dedicated developer for a project, collaboration,
            or opportunity, feel free to reach out. I am available anytime and open
            to building practical, modern solutions that create real impact.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {infoItems.map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "16px 20px",
                  background: "rgba(14,165,233,0.05)",
                  border: "1px solid rgba(14,165,233,0.12)",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(14,165,233,0.3)";
                  e.currentTarget.style.background = "rgba(14,165,233,0.09)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(14,165,233,0.12)";
                  e.currentTarget.style.background = "rgba(14,165,233,0.05)";
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    background: "rgba(14,165,233,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    flexShrink: 0,
                    color: "#38bdf8",
                    fontWeight: "800",
                    fontFamily: "'Barlow', sans-serif",
                  }}
                >
                  {item.icon}
                </div>

                <div>
                  <div
                    style={{
                      color: "#8A8A8A",
                      fontSize: "11px",
                      fontFamily: "'Barlow', sans-serif",
                      letterSpacing: "1px",
                      marginBottom: "2px",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.label}
                  </div>

                  <div
                    style={{
                      color: "#e2e8f0",
                      fontSize: "14px",
                      fontFamily: "'Barlow', sans-serif",
                      fontWeight: "600",
                      wordBreak: item.label === "Email" ? "break-word" : "normal",
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "28px", flexWrap: "wrap" }}>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: social.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  boxShadow: `0 8px 15px ${social.color}40`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px) scale(1.08)";
                  e.currentTarget.style.boxShadow = `0 12px 22px ${social.color}65`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = `0 8px 15px ${social.color}40`;
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(40px)",
            transition: "all 0.7s ease 0.3s",
            background: "rgba(24,24,24,0.8)",
            border: "1px solid rgba(14,165,233,0.15)",
            borderRadius: "20px",
            padding: "40px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  color: "#8A8A8A",
                  fontSize: "12px",
                  fontFamily: "'Barlow', sans-serif",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(14,165,233,0.6)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(14,165,233,0.2)";
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  color: "#8A8A8A",
                  fontSize: "12px",
                  fontFamily: "'Barlow', sans-serif",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(14,165,233,0.6)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(14,165,233,0.2)";
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                color: "#8A8A8A",
                fontSize: "12px",
                fontFamily: "'Barlow', sans-serif",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Project inquiry..."
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(14,165,233,0.6)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(14,165,233,0.2)";
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                color: "#8A8A8A",
                fontSize: "12px",
                fontFamily: "'Barlow', sans-serif",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              rows={5}
              style={{
                ...inputStyle,
                resize: "vertical",
                minHeight: "130px",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(14,165,233,0.6)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(14,165,233,0.2)";
              }}
            />
          </div>

          {status === "success" && (
            <div
              style={{
                padding: "12px 18px",
                borderRadius: "8px",
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.3)",
                color: "#4ade80",
                fontSize: "13px",
                fontFamily: "'Barlow', sans-serif",
                marginBottom: "16px",
              }}
            >
              Your email app is opening. Send the drafted message to reach me directly.
            </div>
          )}

          {status === "error" && (
            <div
              style={{
                padding: "12px 18px",
                borderRadius: "8px",
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#f87171",
                fontSize: "13px",
                fontFamily: "'Barlow', sans-serif",
                marginBottom: "16px",
              }}
            >
              Unable to open your email app. You can email me directly at engahmedmohamedali24@gmail.com.
            </div>
          )}

          {status === "empty" && (
            <div
              style={{
                padding: "12px 18px",
                borderRadius: "8px",
                background: "rgba(234,179,8,0.1)",
                border: "1px solid rgba(234,179,8,0.3)",
                color: "#facc15",
                fontSize: "13px",
                fontFamily: "'Barlow', sans-serif",
                marginBottom: "16px",
              }}
            >
              Please fill in all fields before sending.
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={status === "loading"}
            style={{
              width: "100%",
              padding: "15px",
              background:
                status === "loading"
                  ? "rgba(14,165,233,0.4)"
                  : "linear-gradient(135deg, #0ea5e9, #0369a1)",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: "700",
              letterSpacing: "1.5px",
              fontFamily: "'Barlow', sans-serif",
              cursor: status === "loading" ? "not-allowed" : "pointer",
              boxShadow: "0 0 30px rgba(14,165,233,0.3)",
              transition: "all 0.3s ease",
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) => {
              if (status !== "loading") {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 0 45px rgba(14,165,233,0.5)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(14,165,233,0.3)";
            }}
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;



