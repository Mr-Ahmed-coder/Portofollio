import { useEffect, useRef, useState } from "react";

const servicesData = [
  {
    icon: "GD",
    title: "Graphic Design",
    description:
      "Creating clean visual assets and branded designs that communicate ideas clearly and leave a strong impression.",
    tags: ["Branding", "Visuals", "Creatives"],
  },
  {
    icon: "DM",
    title: "Digital Marketing",
    description:
      "Supporting online growth with strategic content, campaign thinking, and audience-focused digital communication.",
    tags: ["Strategy", "Content", "Growth"],
  },
  {
    icon: "WD",
    title: "Web Development",
    description:
      "Building responsive and reliable websites with modern technologies, clean structure, and user-focused functionality.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    icon: "FE",
    title: "Frontend Development",
    description:
      "Designing and developing polished interfaces that feel intuitive, fast, and professional across all screen sizes.",
    tags: ["UI", "UX", "Responsive"],
  },
  {
    icon: "AI",
    title: "AI / Prompt Engineering",
    description:
      "Using AI tools and prompt design techniques to improve workflows, generate ideas, and enhance digital solutions.",
    tags: ["Prompts", "Automation", "AI Tools"],
  },
];

const Services = () => {
  const [visible, setVisible] = useState(false);
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

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        background: "linear-gradient(180deg, #080d1e 0%, #0d1535 100%)",
        padding: "100px 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "0",
          width: "350px",
          height: "350px",
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
          SERVICES
        </div>

        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: "900",
            color: "#ffffff",
            fontFamily: "'Barlow Condensed', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "1px",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          Professional <span style={{ color: "#0ea5e9" }}>Services</span> I Offer
        </h2>

        <p
          style={{
            color: "#94a3b8",
            maxWidth: "680px",
            lineHeight: "1.8",
            fontSize: "15px",
            fontFamily: "'Barlow', sans-serif",
          }}
        >
          A focused mix of creative, technical, and modern digital services built to
          help brands and businesses stand out online.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
        }}
      >
        {servicesData.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} visible={visible} />
        ))}
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index, visible }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "linear-gradient(135deg, rgba(14,165,233,0.1), rgba(3,105,161,0.08))"
          : "rgba(15, 27, 48, 0.8)",
        border: `1px solid ${hovered ? "rgba(14,165,233,0.4)" : "rgba(14,165,233,0.12)"}`,
        borderRadius: "16px",
        padding: "32px 28px",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.5s ease ${index * 0.08}s`,
        boxShadow: hovered
          ? "0 20px 60px rgba(0,0,0,0.35), 0 0 30px rgba(14,165,233,0.1)"
          : "0 8px 30px rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "80px",
          height: "80px",
          background: "radial-gradient(circle at top right, rgba(14,165,233,0.12), transparent 70%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      <div
        style={{
          width: "58px",
          height: "58px",
          borderRadius: "14px",
          background: hovered
            ? "linear-gradient(135deg, #0ea5e9, #0369a1)"
            : "rgba(14,165,233,0.1)",
          border: `1px solid ${hovered ? "transparent" : "rgba(14,165,233,0.2)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          fontWeight: "800",
          color: "#ffffff",
          marginBottom: "22px",
          transition: "all 0.3s ease",
          boxShadow: hovered ? "0 0 24px rgba(14,165,233,0.4)" : "none",
          fontFamily: "'Barlow', sans-serif",
        }}
      >
        {service.icon}
      </div>

      <h3
        style={{
          color: "#ffffff",
          fontSize: "20px",
          fontWeight: "800",
          fontFamily: "'Barlow Condensed', sans-serif",
          letterSpacing: "0.5px",
          marginBottom: "12px",
          textTransform: "uppercase",
        }}
      >
        {service.title}
      </h3>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "14px",
          lineHeight: "1.8",
          fontFamily: "'Barlow', sans-serif",
          marginBottom: "22px",
        }}
      >
        {service.description}
      </p>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {service.tags.map((tag) => (
          <span
            key={`${service.title}-${tag}`}
            style={{
              padding: "4px 12px",
              background: "rgba(14,165,233,0.08)",
              border: "1px solid rgba(14,165,233,0.2)",
              borderRadius: "20px",
              color: "#0ea5e9",
              fontSize: "11px",
              fontWeight: "600",
              fontFamily: "'Barlow', sans-serif",
              letterSpacing: "0.5px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Services;
