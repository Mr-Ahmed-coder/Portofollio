import { useState, useEffect } from "react";
import api, { resolveMediaUrl } from "../lib/api";
import { useAuth } from "../hooks/useAuth";

const empty = {
  title: "",
  description: "",
  longDescription: "",
  techStack: "",
  image: "",
  liveUrl: "",
  githubUrl: "",
  featured: false,
  order: 0,
};

const AdminProjects = () => {
  const { authHeaders } = useAuth();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    const res = await api.get("/api/projects");
    setProjects(res.data.projects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };



  const resetFormState = () => {
    setForm(empty);
    setEditId(null);
    setShowForm(false);
    setStatus(null);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.description) {
      setStatus("empty");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        longDescription: form.longDescription || "",
        techStack: form.techStack,
        image: form.image || "",
        liveUrl: form.liveUrl || "",
        githubUrl: form.githubUrl || "",
        featured: Boolean(form.featured),
        order: Number(form.order) || 0,
      };

      if (editId) {
        await api.put(`/api/projects/${editId}`, payload, authHeaders());
      } else {
        await api.post("/api/projects", payload, authHeaders());
      }

      setStatus("success");
      setForm(empty);
      setEditId(null);
      setShowForm(false);
      fetchProjects();
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setForm({
      ...project,
      techStack: project.techStack?.join(", ") || "",
    });
    setEditId(project._id);
    setShowForm(true);
    setStatus(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    await api.delete(`/api/projects/${id}`, authHeaders());
    fetchProjects();
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    background: "rgba(14,165,233,0.05)",
    border: "1px solid rgba(14,165,233,0.2)",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "14px",
    fontFamily: "'Barlow', sans-serif",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.3s",
  };

  const labelStyle = {
    display: "block",
    color: "#64748b",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontFamily: "'Barlow', sans-serif",
    marginBottom: "6px",
  };

  const imagePreviewUrl = form.image;

  return (
    <div>
      <button
        onClick={() => {
          if (showForm) {
            resetFormState();
          } else {
            setShowForm(true);
            setForm(empty);
            setEditId(null);
            setStatus(null);
          }
        }}
        style={{
          padding: "12px 28px",
          background: showForm ? "rgba(14,165,233,0.1)" : "linear-gradient(135deg, #0ea5e9, #0369a1)",
          border: showForm ? "1px solid rgba(14,165,233,0.3)" : "none",
          borderRadius: "10px",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "700",
          fontFamily: "'Barlow', sans-serif",
          cursor: "pointer",
          marginBottom: "28px",
          boxShadow: showForm ? "none" : "0 0 24px rgba(14,165,233,0.3)",
          transition: "all 0.3s ease",
        }}
      >
        {showForm ? "Cancel" : "+ Add New Project"}
      </button>

      {showForm && (
        <div
          style={{
            background: "rgba(15,27,48,0.9)",
            border: "1px solid rgba(14,165,233,0.2)",
            borderRadius: "16px",
            padding: "32px",
            marginBottom: "36px",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <h3
            style={{
              color: "#fff",
              fontSize: "18px",
              fontWeight: "800",
              fontFamily: "'Barlow Condensed', sans-serif",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            {editId ? "Edit Project" : "New Project"}
          </h3>

          <div className="grid-2-to-1-tablet" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Title *</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Project title"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "rgba(14,165,233,0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(14,165,233,0.2)")}
              />
            </div>
            <div>
              <label style={labelStyle}>Short Description *</label>
              <input
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Web Design, App Design"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "rgba(14,165,233,0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(14,165,233,0.2)")}
              />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Long Description</label>
              <textarea
                name="longDescription"
                value={form.longDescription}
                onChange={handleChange}
                placeholder="Detailed description of the project..."
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(14,165,233,0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(14,165,233,0.2)")}
              />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Tech Stack (comma separated)</label>
              <input
                name="techStack"
                value={form.techStack}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "rgba(14,165,233,0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(14,165,233,0.2)")}
              />
            </div>
            <div>
              <label style={labelStyle}>Image URL *</label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "rgba(14,165,233,0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(14,165,233,0.2)")}
              />
            </div>

            <div>
              <label style={labelStyle}>Live URL</label>
              <input
                name="liveUrl"
                value={form.liveUrl}
                onChange={handleChange}
                placeholder="https://yourproject.com"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "rgba(14,165,233,0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(14,165,233,0.2)")}
              />
            </div>
            <div>
              <label style={labelStyle}>GitHub URL</label>
              <input
                name="githubUrl"
                value={form.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/..."
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "rgba(14,165,233,0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(14,165,233,0.2)")}
              />
            </div>
            <div>
              <label style={labelStyle}>Display Order</label>
              <input
                name="order"
                type="number"
                value={form.order}
                onChange={handleChange}
                placeholder="0"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "rgba(14,165,233,0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(14,165,233,0.2)")}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "20px" }}>
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                id="featured"
                style={{ width: "18px", height: "18px", accentColor: "#0ea5e9" }}
              />
              <label htmlFor="featured" style={{ ...labelStyle, marginBottom: 0, color: "#94a3b8" }}>
                Featured project (show in hero)
              </label>
            </div>
          </div>

          {imagePreviewUrl && (
            <div style={{ marginTop: "20px" }}>
              <div style={{ ...labelStyle, marginBottom: "10px" }}>Image Preview</div>
              <div
                style={{
                  width: "220px",
                  height: "140px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid rgba(14,165,233,0.15)",
                  background: "rgba(14,165,233,0.06)",
                }}
              >
                <img
                  src={imagePreviewUrl}
                  alt="Project preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          )}

          {status === "empty" && (
            <div style={{ color: "#facc15", fontSize: "13px", marginTop: "16px" }}>
              Title and description are required.
            </div>
          )}
          {status === "error" && (
            <div style={{ color: "#f87171", fontSize: "13px", marginTop: "16px" }}>
              Something went wrong. Try again.
            </div>
          )}
          {status === "success" && (
            <div style={{ color: "#4ade80", fontSize: "13px", marginTop: "16px" }}>
              Project saved successfully.
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              marginTop: "24px",
              padding: "13px 36px",
              background: "linear-gradient(135deg, #0ea5e9, #0369a1)",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "700",
              fontFamily: "'Barlow', sans-serif",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 0 24px rgba(14,165,233,0.3)",
              transition: "all 0.3s ease",
            }}
          >
            {loading ? "Saving..." : editId ? "Update Project" : "Save Project"}
          </button>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {projects.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px",
              color: "#334155",
              fontFamily: "'Barlow', sans-serif",
            }}
          >
            No projects yet. Add your first one!
          </div>
        )}
        {projects.map((project) => (
          <div
            key={project._id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              background: "rgba(15,27,48,0.8)",
              border: "1px solid rgba(14,165,233,0.12)",
              borderRadius: "12px",
              padding: "20px 24px",
              transition: "border-color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(14,165,233,0.3)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(14,165,233,0.12)")}
          >
            <div
              style={{
                width: "70px",
                height: "50px",
                borderRadius: "8px",
                background: "rgba(14,165,233,0.08)",
                border: "1px solid rgba(14,165,233,0.15)",
                overflow: "hidden",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span style={{ fontSize: "20px" }}>Image</span>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                <h4
                  style={{
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: "700",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  {project.title}
                </h4>
                {project.featured && (
                  <span
                    style={{
                      padding: "2px 10px",
                      background: "rgba(14,165,233,0.15)",
                      border: "1px solid rgba(14,165,233,0.3)",
                      borderRadius: "20px",
                      color: "#0ea5e9",
                      fontSize: "10px",
                      fontWeight: "700",
                      letterSpacing: "1px",
                    }}
                  >
                    FEATURED
                  </span>
                )}
              </div>
              <p style={{ color: "#64748b", fontSize: "13px", margin: 0, fontFamily: "'Barlow', sans-serif" }}>
                {project.description}
              </p>
              {project.techStack?.length > 0 && (
                <div style={{ display: "flex", gap: "6px", marginTop: "6px", flexWrap: "wrap" }}>
                  {project.techStack.map((t, i) => (
                    <span
                      key={i}
                      style={{
                        padding: "2px 8px",
                        background: "rgba(14,165,233,0.06)",
                        border: "1px solid rgba(14,165,233,0.15)",
                        borderRadius: "4px",
                        color: "#94a3b8",
                        fontSize: "11px",
                        fontFamily: "'Barlow', sans-serif",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleEdit(project)}
                style={{
                  padding: "8px 18px",
                  background: "rgba(14,165,233,0.1)",
                  border: "1px solid rgba(14,165,233,0.25)",
                  borderRadius: "8px",
                  color: "#0ea5e9",
                  fontSize: "13px",
                  fontWeight: "600",
                  fontFamily: "'Barlow', sans-serif",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(14,165,233,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(14,165,233,0.1)")}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                style={{
                  padding: "8px 18px",
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  borderRadius: "8px",
                  color: "#f87171",
                  fontSize: "13px",
                  fontWeight: "600",
                  fontFamily: "'Barlow', sans-serif",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.1)")}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
};

export default AdminProjects;
