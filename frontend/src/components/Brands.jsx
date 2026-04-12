const Brands = () => {
  const brands = [
    "EngAhmed", "EngAhmed", "EngAhmed", "EngAhmed", "EngAhmed",
    "EngAhmed", "EngAhmed", "EngAhmed", "EngAhmed", "EngAhmed",
  ];

  return (
    <section style={{
      background: "#0b1120",
      borderTop: "1px solid rgba(14,165,233,0.1)",
      borderBottom: "1px solid rgba(14,165,233,0.1)",
      padding: "28px 0",
      overflow: "hidden",
    }}>
      {/* Scrolling track */}
      <div style={{
        display: "flex",
        width: "max-content",
        animation: "scrollLeft 18s linear infinite",
      }}>
        {[...brands, ...brands].map((brand, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "0 48px",
            borderRight: "1px solid rgba(14,165,233,0.12)",
            whiteSpace: "nowrap",
          }}>
            {/* Mini icon */}
            <div style={{
              width: "22px", height: "22px",
              borderRadius: "50%",
              border: "2px solid rgba(14,165,233,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "9px", color: "#0ea5e9",
              flexShrink: 0,
            }}>✦</div>
            <span style={{
              color: "#64748b",
              fontSize: "15px",
              fontWeight: i % 2 === 0 ? "600" : "800",
              letterSpacing: i % 2 === 0 ? "1px" : "2px",
              fontFamily: " sans-serif",
              textTransform: "uppercase",
              transition: "color 0.3s",
            }}>
              {brand}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default Brands;