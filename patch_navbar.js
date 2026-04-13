const fs = require('fs');

const navFile = 'frontend/src/components/Navbar.jsx';
let nav = fs.readFileSync(navFile, 'utf8');

// The CTA button starts at line 84
nav = nav.replace(/\{\/\* CTA Button \*\/\}\r?\n\s*<button style=\{\{/, '{/* CTA Button */}\n      <button className="hide-on-mobile" style={{');

fs.writeFileSync(navFile, nav);
console.log('Fixed CTA button class');
