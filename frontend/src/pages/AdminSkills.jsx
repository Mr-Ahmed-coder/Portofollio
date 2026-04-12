import { useState, useEffect } from "react";
import api from "../lib/api";
import { useAuth } from "../hooks/useAuth";

const categories = ["Frontend", "Backend", "Database", "DevOps", "Tools", "Other"];
const empty = { name: "", category: "Frontend", proficiency: 80, iconUrl: "", order: 0 };

const AdminSkills = () => {
  const { authHeaders } = useAuth();
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSkills = async () => {
    const res = await api.get("/api/skills");
    setSkills(res.data.skills);
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name) { setStatus("empty"); return; }
    setLoading(true);
    try {
      if (editId) {
        await api.put(`/api/skills/${editId}`, form, authHeaders());
      } else {
        await api.post("/api/skills", form, authHeaders());
      }
      setStatus("success");
      setForm(empty);
      setEditId(null);
      setShowForm(false);
      fetchSkills();
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (skill) => {
    setForm(skill);
    setEditId(skill._id);
    setShowForm(true);
    setStatus(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    await api.delete(`/api/skills/${id}`, authHeaders());
    fetchSkills();
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px",
    background: "rgba(14,165,233,0.05)",
    border: "1px solid rgba(14,165,233,0.2)",
    borderRadius: "8px", color: "#ffffff",
    fontSize: "14px", fontFamily: "'Barlow', sans-serif",
    outline: "none", boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block", color: "#64748b", fontSize: "11px",
    fontWeight: "700", letterSpacing: "1px",
    textTransform: "uppercase", fontFamily: "'Barlow', sans-serif",
    marginBottom: "6px",
  };

  // Group by category
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div>
      {/* Add button */}
      <button
        onClick={() => { setShowForm(!showForm); setForm(empty); setEditId(null); setStatus(null); }}
        style={{
          padding: "12px 28px",
          background: showForm ? "rgba(14,165,233,0.1)" : "linear-gradient(135deg, #0ea5e9, #0369a1)",
          border: showForm ? "1px solid rgba(14,165,233,0.3)" : "none",
          borderRadius: "10px", color: "#fff",
          fontSize: "14px", fontWeight: "700",
          fontFamily: "'Barlow', sans-serif",
          cursor: "pointer", marginBottom: "28px",
          boxShadow: showForm ? "none" : "0 0 24px rgba(14,165,233,0.3)",
        }}
      >
        {showForm ? "✕ Cancel" : "+ Add New Skill"}
      </button>

      {/* Form */}
      {showForm && (
        <div style={{
          background: "rgba(15,27,48,0.9)",
          border: "1px solid rgba(14,165,233,0.2)",
          borderRadius: "16px", padding: "32px",
          marginBottom: "36px",
          animation: "fadeIn 0.3s ease",
        }}>
          <h3 style={{
            color: "#fff", fontSize: "18px", fontWeight: "800",
            fontFamily: "'Barlow Condensed', sans-serif",
            textTransform: "uppercase", marginBottom: "24px",
          }}>
            {editId ? "✏️ Edit Skill" : "➕ New Skill"}
          </h3>

          <div className="grid-2-to-1-tablet" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Skill Name *</label>
              <input name="name" value={form.name} onChange={handleChange}
                placeholder="e.g. React" style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(14,165,233,0.6)"}
                onBlur={e => e.target.style.borderColor = "rgba(14,165,233,0.2)"} />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select name="category" value={form.category} onChange={handleChange}
                style={{ ...inputStyle, cursor: "pointer" }}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Proficiency: {form.proficiency}%</label>
              <input type="range" name="proficiency" min="1" max="100"
                value={form.proficiency} onChange={handleChange}
                style={{ width: "100%", accentColor: "#0ea5e9", marginTop: "8px" }} />
              {/* Visual bar */}
              <div style={{
                height: "6px", borderRadius: "3px",
                background: "rgba(14,165,233,0.15)",
                marginTop: "8px", overflow: "hidden",
              }}>
                <div style={{
                  height: "100%", borderRadius: "3px",
                  width: `${form.proficiency}%`,
                  background: "linear-gradient(90deg, #0ea5e9, #0369a1)",
                  transition: "width 0.3s ease",
                }} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Icon URL (optional)</label>
              <input name="iconUrl" value={form.iconUrl} onChange={handleChange}
                placeholder="https://..." style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(14,165,233,0.6)"}
                onBlur={e => e.target.style.borderColor = "rgba(14,165,233,0.2)"} />
            </div>
          </div>

          {status === "empty" && <div style={{ color: "#facc15", fontSize: "13px", marginTop: "16px" }}>⚠️ Skill name is required.</div>}
          {status === "error" && <div style={{ color: "#f87171", fontSize: "13px", marginTop: "16px" }}>❌ Something went wrong.</div>}
          {status === "success" && <div style={{ color: "#4ade80", fontSize: "13px", marginTop: "16px" }}>✅ Skill saved!</div>}

          <button onClick={handleSubmit} disabled={loading} style={{
            marginTop: "24px", padding: "13px 36px",
            background: "linear-gradient(135deg, #0ea5e9, #0369a1)",
            border: "none", borderRadius: "10px", color: "#fff",
            fontSize: "14px", fontWeight: "700",
            fontFamily: "'Barlow', sans-serif", cursor: "pointer",
            boxShadow: "0 0 24px rgba(14,165,233,0.3)",
          }}>
            {loading ? "Saving..." : editId ? "Update Skill" : "Save Skill"}
          </button>
        </div>
      )}

      {/* Skills grouped by category */}
      {Object.keys(grouped).map(category => (
        <div key={category} style={{ marginBottom: "32px" }}>
          <h3 style={{
            color: "#0ea5e9", fontSize: "13px", fontWeight: "700",
            letterSpacing: "2px", textTransform: "uppercase",
            fontFamily: "'Barlow', sans-serif", marginBottom: "14px",
          }}>{category}</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {grouped[category].map(skill => (
              <div key={skill._id} style={{
                display: "flex", alignItems: "center", gap: "16px",
                background: "rgba(15,27,48,0.8)",
                border: "1px solid rgba(14,165,233,0.12)",
                borderRadius: "10px", padding: "16px 20px",
                transition: "border-color 0.3s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(14,165,233,0.3)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(14,165,233,0.12)"}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{
                      color: "#fff", fontWeight: "700", fontSize: "14px",
                      fontFamily: "'Barlow', sans-serif",
                    }}>{skill.name}</span>
                    <span style={{ color: "#0ea5e9", fontSize: "13px", fontWeight: "700" }}>
                      {skill.proficiency}%
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div style={{
                    height: "5px", borderRadius: "3px",
                    background: "rgba(14,165,233,0.12)",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%", borderRadius: "3px",
                      width: `${skill.proficiency}%`,
                      background: "linear-gradient(90deg, #0ea5e9, #0369a1)",
                    }} />
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  <button onClick={() => handleEdit(skill)} style={{
                    padding: "6px 14px",
                    background: "rgba(14,165,233,0.1)",
                    border: "1px solid rgba(14,165,233,0.25)",
                    borderRadius: "6px", color: "#0ea5e9",
                    fontSize: "12px", fontWeight: "600",
                    fontFamily: "'Barlow', sans-serif", cursor: "pointer",
                  }}>✏️ Edit</button>
                  <button onClick={() => handleDelete(skill._id)} style={{
                    padding: "6px 14px",
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.25)",
                    borderRadius: "6px", color: "#f87171",
                    fontSize: "12px", fontWeight: "600",
                    fontFamily: "'Barlow', sans-serif", cursor: "pointer",
                  }}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {skills.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px", color: "#334155", fontFamily: "'Barlow', sans-serif" }}>
          No skills yet. Add your first one! 💪
        </div>
      )}

      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
};

export default AdminSkills;
