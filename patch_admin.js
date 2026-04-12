const fs = require('fs');

const file = 'frontend/src/pages/AdminDashboard.jsx';
let content = fs.readFileSync(file, 'utf8');

// Add menu state
content = content.replace('  const [activeTab, setActiveTab] = useState("projects");', '  const [activeTab, setActiveTab] = useState("projects");\n  const [sidebarOpen, setSidebarOpen] = useState(false);');

// Sidebar className
content = content.replace('<aside style={{', '<aside className={sidebarOpen ? "admin-sidebar open" : "admin-sidebar"} style={{');

// Add mobile hamburger to the top bar
const topBar = `<div className="flex-center-mobile" style={{
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
        </div>`;

content = content.replace(/<div style=\{\{\s*marginBottom: "32px",\s*paddingBottom: "20px",\s*borderBottom: "1px solid rgba\(14,165,233,0\.1\)",\s*\}\}>[\s\S]*?<\/div>/, topBar);

// Override margin-left on main in index.css! I'll do that by adding className="admin-main"
content = content.replace(/<main style=\{\{/, '<main className="admin-main section-padding" style={{');

// Inject overlay to close sidebar
content = content.replace('{/* Main content */}', '{/* Mobile Overlay */}\n      {sidebarOpen && <div className="hide-on-desktop" onClick={() => setSidebarOpen(false)} style={{ position:"fixed", top:0, left:0, right:0, bottom:0, background:"rgba(0,0,0,0.5)", zIndex:99 }} />}\n\n      {/* Main content */}');

// When a user clicks a nav tab, close the sidebar.
content = content.replace('onClick={() => setActiveTab(item.id)}', 'onClick={() => {\n                setActiveTab(item.id);\n                setSidebarOpen(false);\n              }}');

fs.writeFileSync(file, content);
console.log('patched admin dashboard');

// Now add .admin-main override to index.css
let css = fs.readFileSync('frontend/src/index.css', 'utf8');
css = css.replace('.admin-sidebar.open { transform: translateX(0) !important; }', '.admin-sidebar.open { transform: translateX(0) !important; }\n  .admin-main { margin-left: 0 !important; padding: 20px !important; }');
fs.writeFileSync('frontend/src/index.css', css);

