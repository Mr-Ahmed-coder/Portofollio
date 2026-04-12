import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AdminProjects from "./AdminProjects";
import AdminSkills from "./AdminSkills";
import AdminMessages from "./AdminMessages";

const navItems = [
  { id: "projects", icon: "🖥️", label: "Projects" },
  { id: "skills", icon: "🛠️", label: "Skills" },
  { id: "messages", icon: "📩", label: "Messages" },
];

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const renderTab = () => {
    if (activeTab === "projects") return <AdminProjects />;
    if (activeTab === "skills") return <AdminSkills />;
    if (activeTab === "messages") return <AdminMessages />;
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080d1e",
      display: "flex",
      fontFamily: "'Barlow', sans-serif",
    }}>

      {/* Sidebar */}
      <aside className={sidebarOpen ? "admin-sidebar open" : "admin-sidebar"} style={{
        width: "240px",
        background: "rgba(15,27,48,0.95)",
        borderRight: "1px solid rgba(14,165,233,0.12)",
        display: "flex",
        flexDirection: "column",
        padding: "28px 0",
        position: "fixed",
        top: 0, bottom: 0, left: 0,
        zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{
          padding: "0 24px 28px",
          borderBottom: "1px solid rgba(14,165,233,0.1)",
          marginBottom: "16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px", height: "36px",
              background: "linear-gradient(135deg, #0ea5e9, #0369a1)",
              borderRadius: "8px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: "900", color: "#fff", fontSize: "16px",
              boxShadow: "0 0 20px rgba(14,165,233,0.35)",
            }}>J</div>
            <div>
              <div style={{
                color: "#fff", fontWeight: "800", fontSize: "15px",
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: "1px",
              }}>JENNA</div>
              <div style={{ color: "#0ea5e9", fontSize: "10px", letterSpacing: "1px" }}>
                ADMIN PANEL
              </div>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, padding: "0 12px" }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "10px",
                border: "none",
                background: activeTab === item.id
                  ? "linear-gradient(135deg, rgba(14,165,233,0.15), rgba(3,105,161,0.1))"
                  : "transparent",
                borderLeft: activeTab === item.id
                  ? "3px solid #0ea5e9"
                  : "3px solid transparent",
                color: activeTab === item.id ? "#0ea5e9" : "#64748b",
                fontSize: "14px",
                fontWeight: "600",
                fontFamily: "'Barlow', sans-serif",
                cursor: "pointer",
                marginBottom: "4px",
                transition: "all 0.25s ease",
                textAlign: "left",
              }}
              onMouseEnter={e => {
                if (activeTab !== item.id)
                  e.currentTarget.style.background = "rgba(14,165,233,0.06)";
              }}
              onMouseLeave={e => {
                if (activeTab !== item.id)
                  e.currentTarget.style.background = "transparent";
              }}
            >
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Admin info + logout */}
        <div style={{
          padding: "16px 24px",
          borderTop: "1px solid rgba(14,165,233,0.1)",
        }}>
          <div style={{
            color: "#475569", fontSize: "11px",
            marginBottom: "4px", letterSpacing: "0.5px",
          }}>Logged in as</div>
          <div style={{
            color: "#94a3b8", fontSize: "13px",
            fontWeight: "600", marginBottom: "14px",
            overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {admin?.email}
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "10px",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: "8px",
              color: "#f87171",
              fontSize: "13px",
              fontWeight: "700",
              fontFamily: "'Barlow', sans-serif",
              cursor: "pointer",
              letterSpacing: "0.5px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(239,68,68,0.2)";
              e.currentTarget.style.borderColor = "rgba(239,68,68,0.5)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(239,68,68,0.1)";
              e.currentTarget.style.borderColor = "rgba(239,68,68,0.25)";
            }}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && <div className="hide-on-desktop" onClick={() => setSidebarOpen(false)} style={{ position:"fixed", top:0, left:0, right:0, bottom:0, background:"rgba(0,0,0,0.5)", zIndex:99 }} />}

      {/* Main content */}
      <main className="admin-main section-padding" style={{
        marginLeft: "240px",
        flex: 1,
        padding: "40px",
        overflowY: "auto",
      }}>
        {/* Top bar */}
        <div className="flex-center-mobile" style={{
          marginBottom: "32px",
          paddingBottom: "20px",
          borderBottom: "1px solid rgba(14,165,233,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>
            <h1 className="section-title" style={{
              color: "#ffffff",
              fontSize: "28px",
              fontWeight: "900",
              fontFamily: "'Barlow Condensed', sans-serif",
              textTransform: "uppercase",
              letterSpacing: "1px",
              margin: 0,
            }}>
              {navItems.find(n => n.id === activeTab)?.icon}{" "}
              {navItems.find(n => n.id === activeTab)?.label}
            </h1>
            <p className="hide-on-mobile" style={{ color: "#475569", fontSize: "13px", margin: "4px 0 0", fontFamily: "'Barlow', sans-serif" }}>
              Manage your portfolio {activeTab}
            </p>
          </div>
          <button className="hide-on-desktop" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background:"transparent", color:"#fff", fontSize:"24px", border:"none" }}>☰</button>
        </div>

        {/* Active tab content */}
        {renderTab()}
      </main>
    </div>
  );
};

export default AdminDashboard;
