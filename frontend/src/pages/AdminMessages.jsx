import { useState, useEffect } from "react";
import api from "../lib/api";
import { useAuth } from "../hooks/useAuth";

const AdminMessages = () => {
  const { authHeaders } = useAuth();
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [expanded, setExpanded] = useState(null);

  const fetchMessages = async () => {
    const res = await api.get("/api/contact", authHeaders());
    setMessages(res.data.messages);
    setUnreadCount(res.data.unreadCount);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    api.get("/api/contact", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      setMessages(res.data.messages);
      setUnreadCount(res.data.unreadCount);
    });
  }, []);

  const handleMarkRead = async (id) => {
    await api.put(`/api/contact/${id}/read`, {}, authHeaders());
    fetchMessages();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    await api.delete(`/api/contact/${id}`, authHeaders());
    fetchMessages();
    if (expanded === id) setExpanded(null);
  };

  const toggleExpand = async (msg) => {
    if (expanded === msg._id) {
      setExpanded(null);
    } else {
      setExpanded(msg._id);
      if (!msg.isRead) await handleMarkRead(msg._id);
    }
  };

  return (
    <div>
      {/* Stats bar */}
      <div style={{
        display: "flex", gap: "16px", marginBottom: "28px", flexWrap: "wrap",
      }}>
        {[
          { label: "Total Messages", value: messages.length, color: "#0ea5e9" },
          { label: "Unread", value: unreadCount, color: "#f87171" },
          { label: "Read", value: messages.length - unreadCount, color: "#4ade80" },
        ].map((stat, i) => (
          <div key={i} style={{
            padding: "16px 24px",
            background: "rgba(15,27,48,0.8)",
            border: `1px solid ${stat.color}30`,
            borderRadius: "12px", textAlign: "center", minWidth: "130px",
          }}>
            <div style={{
              fontSize: "28px", fontWeight: "900", color: stat.color,
              fontFamily: "'Barlow Condensed', sans-serif",
            }}>{stat.value}</div>
            <div style={{ color: "#64748b", fontSize: "12px", fontFamily: "'Barlow', sans-serif" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Messages list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {messages.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px", color: "#334155", fontFamily: "'Barlow', sans-serif" }}>
            No messages yet. 📭
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg._id} style={{
            background: "rgba(15,27,48,0.8)",
            border: `1px solid ${!msg.isRead ? "rgba(14,165,233,0.35)" : "rgba(14,165,233,0.12)"}`,
            borderRadius: "12px",
            overflow: "hidden",
            transition: "border-color 0.3s",
          }}>
            {/* Message header — always visible */}
            <div
              onClick={() => toggleExpand(msg)}
              style={{
                display: "flex", alignItems: "center", gap: "16px",
                padding: "18px 24px", cursor: "pointer",
              }}
            >
              {/* Unread dot */}
              <div style={{
                width: "10px", height: "10px", borderRadius: "50%", flexShrink: 0,
                background: !msg.isRead ? "#0ea5e9" : "transparent",
                border: !msg.isRead ? "none" : "2px solid #334155",
                boxShadow: !msg.isRead ? "0 0 8px rgba(14,165,233,0.6)" : "none",
              }} />

              {/* Avatar */}
              <div style={{
                width: "40px", height: "40px", borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, #0ea5e9, #0369a1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: "800", fontSize: "16px",
                fontFamily: "'Barlow Condensed', sans-serif",
              }}>
                {msg.name.charAt(0).toUpperCase()}
              </div>

              {/* Name + subject */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{
                    color: "#fff", fontWeight: "700", fontSize: "15px",
                    fontFamily: "'Barlow', sans-serif",
                  }}>{msg.name}</span>
                  {!msg.isRead && (
                    <span style={{
                      padding: "2px 8px",
                      background: "rgba(14,165,233,0.15)",
                      border: "1px solid rgba(14,165,233,0.3)",
                      borderRadius: "20px", color: "#0ea5e9",
                      fontSize: "9px", fontWeight: "700", letterSpacing: "1px",
                    }}>NEW</span>
                  )}
                </div>
                <div style={{
                  color: "#64748b", fontSize: "13px",
                  fontFamily: "'Barlow', sans-serif",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {msg.subject}
                </div>
              </div>

              {/* Date */}
              <div style={{
                color: "#475569", fontSize: "12px",
                fontFamily: "'Barlow', sans-serif", flexShrink: 0,
              }}>
                {new Date(msg.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric", month: "short", year: "numeric",
                })}
              </div>

              {/* Expand arrow */}
              <div style={{
                color: "#475569", fontSize: "12px",
                transform: expanded === msg._id ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}>▼</div>
            </div>

            {/* Expanded message body */}
            {expanded === msg._id && (
              <div style={{
                padding: "0 24px 24px",
                borderTop: "1px solid rgba(14,165,233,0.1)",
                animation: "fadeIn 0.3s ease",
              }}>
                {/* Sender info */}
                <div style={{
                  display: "flex", gap: "24px", padding: "16px 0",
                  marginBottom: "16px", flexWrap: "wrap",
                }}>
                  {[
                    { label: "From", value: msg.name },
                    { label: "Email", value: msg.email },
                    { label: "Subject", value: msg.subject },
                  ].map((item, i) => (
                    <div key={i}>
                      <div style={{ color: "#475569", fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "'Barlow', sans-serif" }}>
                        {item.label}
                      </div>
                      <div style={{ color: "#94a3b8", fontSize: "14px", fontFamily: "'Barlow', sans-serif", fontWeight: "600" }}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message */}
                <div style={{
                  background: "rgba(14,165,233,0.04)",
                  border: "1px solid rgba(14,165,233,0.1)",
                  borderRadius: "10px", padding: "18px",
                  color: "#94a3b8", fontSize: "14px", lineHeight: "1.8",
                  fontFamily: "'Barlow', sans-serif", marginBottom: "20px",
                }}>
                  {msg.message}
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: "10px" }}>
                  <a href={`mailto:${msg.email}`} style={{
                    padding: "9px 20px",
                    background: "linear-gradient(135deg, #0ea5e9, #0369a1)",
                    borderRadius: "8px", color: "#fff",
                    fontSize: "13px", fontWeight: "700",
                    fontFamily: "'Barlow', sans-serif",
                    textDecoration: "none",
                    boxShadow: "0 0 20px rgba(14,165,233,0.25)",
                  }}>
                    📧 Reply
                  </a>
                  {!msg.isRead && (
                    <button onClick={() => handleMarkRead(msg._id)} style={{
                      padding: "9px 20px",
                      background: "rgba(74,222,128,0.1)",
                      border: "1px solid rgba(74,222,128,0.25)",
                      borderRadius: "8px", color: "#4ade80",
                      fontSize: "13px", fontWeight: "700",
                      fontFamily: "'Barlow', sans-serif", cursor: "pointer",
                    }}>✅ Mark Read</button>
                  )}
                  <button onClick={() => handleDelete(msg._id)} style={{
                    padding: "9px 20px",
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.25)",
                    borderRadius: "8px", color: "#f87171",
                    fontSize: "13px", fontWeight: "700",
                    fontFamily: "'Barlow', sans-serif", cursor: "pointer",
                  }}>🗑️ Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }`}</style>
    </div>
  );
};

export default AdminMessages;
