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

// ===== POKÉMON BATTLE MESSAGES =====
const messages = {
  start: [
    "PROF. OAK: Bem-vindo\nao mundo das\ncalculadoras!",
    "PIKACHU usou\nCALCULATION!\nÉ super eficaz!",
    "POKÉCALC v1.0\npronto para\na batalha!",
  ],
  result: [
    "CRÍTICO!\nResultado obtido!",
    "É SUPER EFICAZ!",
    "POKÉMON inimigo\nfoi derrotado!",
    "PIKACHU ganhou\n{val} EXP!",
    "A CALCULADORA\nusou MATH!\n{val}",
  ],
  error: [
    "MISSINGNO:\nerro detectado!",
    "Não é muito\neficaz...",
    "TEAM ROCKET\nsabotou o cálculo!",
  ],
  clear: [
    "Memória apagada!",
    "PIKACHU voltou\nà Pokébola!",
  ],
  zero: [
    "SNORLAX bloqueia\no caminho!",
    "Divisão por zero?\nNem o MEWTWO\nconsegue!",
  ],
  special: [
    "42 é a resposta\npara tudo!",
    "1337 - Leet\nTrainer mode!",
    "404 - Pokémon\nnot found!",
    "Você encontrou\num Pokémon raro!",
  ],
};
