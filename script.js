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

// Numeros com mensagens de easter eggs
const specialNumbers = [42, 151, 404, 721, 807, 898, 1337];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ===== BATTLE MESSAGE POPUP =====
let msgTimeout;
function showMsg(text) {
  const el = document.getElementById('battleMsg');
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(msgTimeout);
  msgTimeout = setTimeout(() => el.classList.remove('show'), 2200);
}

// ===== ROTATING SCREEN HINTS =====
function initHints() {
  const hintEl = document.getElementById('hint');
  const hints = [
    'USE ▶ CALC ◀ SYSTEM',
    'KANTO CALC v1.0',
    'HP: ∞  PP: ∞',
    '★ GOTTA CALCULATE ★',
  ];
  let hintIdx = 0;
  setInterval(() => {
    hintIdx = (hintIdx + 1) % hints.length;
    hintEl.textContent = hints[hintIdx];
  }, 3000);
}

// ===== CALCULATOR LOGIC =====
const calc = (() => {
  let current    = '0';
  let prev       = '';
  let operator   = '';
  let shouldReset = false;
  let history    = '';
  let expression = '';

  const displayEl = document.getElementById('display');
  const histEl    = document.getElementById('history');
  const exprEl    = document.getElementById('expression');

// --- Helpers ---
  function updateDisplay(val) {
    displayEl.textContent = val;
    displayEl.classList.remove('pop');
    void displayEl.offsetWidth; // forcando a animaçao resetar.
    displayEl.classList.add('pop');
  }

  function fmt(n) {
    if (isNaN(n) || !isFinite(n)) return 'ERROR';
    const s = parseFloat(n.toPrecision(10)).toString();
    if (s.length > 10) return parseFloat(n.toFixed(4)).toString();
    return s;
  }

  function compute(a, op, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
      case '+': return a + b;
      case '−': return a - b;
      case '×': return a * b;
      case '÷': return b === 0 ? null : a / b;
    }
  }

  function shake() {
    displayEl.classList.add('shake');
    setTimeout(() => displayEl.classList.remove('shake'), 350);
  }

// --- Main input handler ---
  function input(key) {

    // AC — clear all
    if (key === 'AC') {
      current = '0'; prev = ''; operator = '';
      shouldReset = false; history = ''; expression = '';
      updateDisplay('0');
      histEl.textContent = '';
      exprEl.textContent = '';
      showMsg(getRandom(messages.clear));
      return;
    }


  
