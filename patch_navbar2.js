const fs = require('fs');

const navFile = 'frontend/src/components/Navbar.jsx';
let nav = fs.readFileSync(navFile, 'utf8');

// The overlay starts at line 133
nav = nav.replace(/\{\/\* Mobile Menu Overlay \*\/\}\r?\n\s*<div style=\{\{/, '{/* Mobile Menu Overlay */}\n      <div className="hide-on-desktop" style={{');

fs.writeFileSync(navFile, nav);
console.log('Fixed overlay class');
