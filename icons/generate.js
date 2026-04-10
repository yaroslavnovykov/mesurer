// Generate extension icons as PNG from SVG using canvas
// Run with: node icons/generate.js

const fs = require("fs");
const path = require("path");

// SVG icon: ruler/measure tool
const svgIcon = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 128 128">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect x="4" y="4" width="120" height="120" rx="24" fill="url(#bg)"/>
  <!-- Ruler body (diagonal) -->
  <g transform="translate(64,64) rotate(-45) translate(-64,-64)">
    <rect x="20" y="44" width="88" height="40" rx="4" fill="white" opacity="0.95"/>
    <!-- Tick marks -->
    <rect x="36" y="44" width="2" height="14" fill="#3b82f6" opacity="0.7"/>
    <rect x="52" y="44" width="2" height="20" fill="#3b82f6" opacity="0.9"/>
    <rect x="68" y="44" width="2" height="14" fill="#3b82f6" opacity="0.7"/>
    <rect x="84" y="44" width="2" height="20" fill="#3b82f6" opacity="0.9"/>
    <!-- Dimension line -->
    <line x1="30" y1="74" x2="98" y2="74" stroke="#3b82f6" stroke-width="2" opacity="0.6"/>
    <line x1="30" y1="70" x2="30" y2="78" stroke="#3b82f6" stroke-width="2" opacity="0.6"/>
    <line x1="98" y1="70" x2="98" y2="78" stroke="#3b82f6" stroke-width="2" opacity="0.6"/>
  </g>
</svg>`;

const sizes = [16, 32, 48, 128];

// Since we can't use canvas in Node without dependencies,
// write SVG files that can be converted, or use a simple approach:
// We'll write the SVGs and also create a simple data-URI PNG approach

for (const size of sizes) {
  const svg = svgIcon(size);
  const svgPath = path.join(__dirname, `icon${size}.svg`);
  fs.writeFileSync(svgPath, svg);
  console.log(`Generated ${svgPath}`);
}

console.log("\nSVG icons generated. To convert to PNG:");
console.log("  Option 1: Use an online SVG-to-PNG converter");
console.log("  Option 2: Install 'sharp' and run the conversion");
console.log("  Option 3: Use rsvg-convert if available");
