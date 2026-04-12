import { useEffect, useRef, useState } from "react";
import api from "../lib/api";

const infoItems = [
  { icon: "L", label: "Location", value: "Kampala, Uganda" },
  { icon: "E", label: "Email", value: "engahmedmohamedali24@gmail.com" },
  { icon: "P", label: "Phone", value: "+25674844459" },
  { icon: "A", label: "Availability", value: "Available anytime" },
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

  const handleSubmit = async () => {
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      setStatus("empty");
      return;
    }

    setStatus("loading");
    try {
      await api.post("/api/contact", formData);
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
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
    <section
      id="contact"
      ref={sectionRef}
      style={{
        background: "linear-gradient(180deg, #0d1535 0%, #080d1e 100%)",
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

        <h2
          style={{
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
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
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
                      color: "#64748b",
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
        </div>

        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(40px)",
            transition: "all 0.7s ease 0.3s",
            background: "rgba(15,27,48,0.8)",
            border: "1px solid rgba(14,165,233,0.15)",
            borderRadius: "20px",
            padding: "40px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  color: "#64748b",
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
                  color: "#64748b",
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
                color: "#64748b",
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
                color: "#64748b",
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
              Message sent successfully. I&apos;ll get back to you soon.
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
              Something went wrong. Please try again.
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
