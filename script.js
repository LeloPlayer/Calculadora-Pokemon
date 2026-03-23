// ===========================
//   POKÉCALC — KANTO EDITION
//   script.js
// ===========================

// ===== FLOATING BACKGROUND POKÉBALLS =====
function createBackgroundBalls() {
  const bgBalls = document.getElementById('bgBalls');
  for (let i = 0; i < 12; i++) {
    const b = document.createElement('div');
    b.className = 'bg-ball';
    b.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${40 + Math.random() * 60}px;
      height: ${40 + Math.random() * 60}px;
      animation-duration: ${8 + Math.random() * 14}s;
      animation-delay: ${Math.random() * 12}s;
    `;
    bgBalls.appendChild(b);
  }
}