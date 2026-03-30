// ===========================
//   POKÉCALC — KANTO EDITION
//   script.js
// ===========================

// ===== FLOATING BACKGROUND POKÉBALLS =====
// Função para criar bolas de fundo flutuantes (Pokébolas)
function createBackgroundBalls() {
  // Obtém o elemento HTML com id 'bgBalls' onde as bolas serão adicionadas
  const bgBalls = document.getElementById('bgBalls');
  // Loop para criar 12 bolas
  for (let i = 0; i < 12; i++) {
    // Cria um novo elemento div para representar uma bola
    const b = document.createElement('div');
    // Define a classe CSS da bola
    b.className = 'bg-ball';
    // Define estilos CSS inline para posição, tamanho e animação aleatórios
    b.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${40 + Math.random() * 60}px;
      height: ${40 + Math.random() * 60}px;
      animation-duration: ${8 + Math.random() * 14}s;
      animation-delay: ${Math.random() * 12}s;
    `;
    // Adiciona a bola ao container de bolas de fundo
    bgBalls.appendChild(b);
  }
}

// ===== POKÉMON BATTLE MESSAGES =====
// Objeto contendo mensagens temáticas de batalha Pokémon para diferentes situações
const messages = {
  // Mensagens de início
  start: [
    "PROF. OAK: Bem-vindo ao mundo das calculadoras!",
    "PIKACHU usou CALCULATION! É super eficaz!",
    "POKÉCALC v1.0 pronto para a batalha!",
  ],
  // Mensagens de resultado
  result: [
    "CRÍTICO! Resultado obtido!",
    "É SUPER EFICAZ!",
    "POKÉMON inimigo foi derrotado!",
    "PIKACHU ganhou {val} EXP!",
    "A CALCULADORA usou MATH! {val}",
  ],
  // Mensagens de erro
  error: [
    "MISSINGNO: erro detectado!",
    "Não é muito eficaz...",
    "TEAM ROCKET sabotou o cálculo!",
  ],
  // Mensagens de limpeza
  clear: [
    "Memória apagada!",
    "PIKACHU voltou à Pokébola!",
  ],
  // Mensagens para divisão por zero
  zero: [
    "SNORLAX bloqueia o caminho!",
    "Divisão por zero? Nem o MEWTWO consegue!",
  ],
  // Mensagens especiais para números específicos
  special: [
    "42 é a resposta para tudo!",
    "1337 - Leet Trainer mode!",
    "404 - Pokémon not found!",
    "Você encontrou um Pokémon raro!",
  ],
};

// Números especiais que acionam mensagens de easter eggs
const specialNumbers = [42, 151, 404, 721, 807, 898, 1337];

// Função auxiliar para obter um elemento aleatório de um array
function getRandom(arr) {
  // Retorna um elemento aleatório do array usando Math.random e Math.floor
  return arr[Math.floor(Math.random() * arr.length)];
}

// ===== BATTLE MESSAGE POPUP =====
// Variável para armazenar o timeout da mensagem
let msgTimeout;
// Função para mostrar uma mensagem de batalha
function showMsg(text) {
  // Obtém o elemento HTML da mensagem
  const el = document.getElementById('battleMsg');
  // Define o texto da mensagem
  el.textContent = text;
  // Adiciona a classe 'show' para exibir a mensagem
  el.classList.add('show');
  // Limpa qualquer timeout anterior
  clearTimeout(msgTimeout);
  // Define um novo timeout para remover a classe 'show' após 2.2 segundos
  msgTimeout = setTimeout(() => el.classList.remove('show'), 2200);
}

// ===== ROTATING SCREEN HINTS =====
// Função para inicializar as dicas rotativas na tela
function initHints() {
  // Obtém o elemento HTML da dica
  const hintEl = document.getElementById('hint');
  // Array de dicas a serem exibidas
  const hints = [
    'USE ▶ CALC ◀ SYSTEM',
    'KANTO CALC v1.0',
    'HP: ∞  PP: ∞',
    '★ GOTTA CALCULATE ★',
  ];
  // Índice inicial da dica
  let hintIdx = 0;
  // Define um intervalo para alternar as dicas a cada 3 segundos
  setInterval(() => {
    // Incrementa o índice e volta ao início se necessário
    hintIdx = (hintIdx + 1) % hints.length;
    // Atualiza o texto da dica
    hintEl.textContent = hints[hintIdx];
  }, 3000);
}

// ===== CALCULATOR LOGIC =====
// Módulo IIFE (Immediately Invoked Function Expression) para encapsular a lógica da calculadora
const calc = (() => {
  // Variáveis de estado da calculadora
  let current    = '0';  // Valor atual sendo digitado
  let prev       = '';   // Valor anterior
  let operator   = '';   // Operador atual
  let shouldReset = false; // Flag para indicar se deve resetar o display
  let history    = '';   // Histórico da operação
  let expression = '';   // Expressão atual

  // Obtém referências aos elementos HTML
  const displayEl = document.getElementById('display');
  const histEl    = document.getElementById('history');
  const exprEl    = document.getElementById('expression');

// --- Helpers ---
// Função auxiliar para atualizar o display
  function updateDisplay(val) {
    // Define o texto do display
    displayEl.textContent = val;
    // Remove a classe 'pop' para resetar a animação
    displayEl.classList.remove('pop');
    // Força o navegador a recalcular o layout (para resetar a animação)
    void displayEl.offsetWidth; // forcando a animaçao resetar.
    // Adiciona a classe 'pop' para animar
    displayEl.classList.add('pop');
  }

  // Função para formatar números
  function fmt(n) {
    // Verifica se o número é inválido
    if (isNaN(n) || !isFinite(n)) return 'ERROR';
    // Converte para string com precisão de 10 dígitos
    const s = parseFloat(n.toPrecision(10)).toString();
    // Se for muito longo, limita a 4 casas decimais
    if (s.length > 10) return parseFloat(n.toFixed(4)).toString();
    // Retorna a string formatada
    return s;
  }

  // Função para realizar cálculos
  function compute(a, op, b) {
    // Converte os operandos para float
    a = parseFloat(a);
    b = parseFloat(b);
    // Switch para diferentes operações
    switch (op) {
      case '+': return a + b;  // Adição
      case '−': return a - b;  // Subtração
      case '×': return a * b;  // Multiplicação
      case '÷': return b === 0 ? null : a / b;  // Divisão, retorna null se divisão por zero
    }
  }

  // Função para animar o display com shake
  function shake() {
    // Adiciona a classe 'shake'
    displayEl.classList.add('shake');
    // Remove após 350ms
    setTimeout(() => displayEl.classList.remove('shake'), 350);
  }

// --- Main input handler ---
// Função principal para lidar com entradas
  function input(key) {

    // AC — clear all
    if (key === 'AC') {
      // Reseta todas as variáveis
      current = '0'; prev = ''; operator = '';
      shouldReset = false; history = ''; expression = '';
      // Atualiza o display
      updateDisplay('0');
      // Limpa os elementos de histórico e expressão
      histEl.textContent = '';
      exprEl.textContent = '';
      // Mostra mensagem de limpeza
      showMsg(getRandom(messages.clear));
      return;
    }

    // DEL — delete last digit
    if (key === 'DEL') {
      // Se current tem mais de um dígito, remove o último
      if (current.length > 1) {
        current = current.slice(0, -1);
      } else {
        // Se é um único dígito ou '0.', volta para '0'
        current = '0';
      }
      // Atualiza o display
      updateDisplay(current);
      return;
    }

    // Toggle sign
    if (key === '+/-') {
      // Se não for zero, inverte o sinal
      if (current !== '0') {
        current = String(parseFloat(current) * -1);
        updateDisplay(current);
      }
      return;
    }

    // Percentage
    if (key === '%') {
      // Converte para porcentagem
      current = String(parseFloat(current) / 100);
      updateDisplay(current);
      return;
    }

    // Operator keys
    if (['+', '−', '×', '÷'].includes(key)) {
      // Se já há operador e não deve resetar, calcula o resultado parcial
      if (operator && !shouldReset) {
        const result = compute(prev, operator, current);
        // Se divisão por zero, anima shake e mostra mensagem
        if (result === null) {
          shake();
          showMsg(getRandom(messages.zero));
          return;
        }
        // Atualiza prev com o resultado formatado
        prev = String(fmt(result));
        updateDisplay(prev);
      } else {
        // Caso contrário, define prev como current
        prev = current;
      }
      // Define o operador
      operator = key;
      // Atualiza a expressão
      expression = prev + ' ' + key;
      exprEl.textContent = expression;
      // Marca para resetar no próximo input
      shouldReset = true;
      return;
    }

    // Equals
    if (key === '=') {
      // Se não há operador, retorna
      if (!operator) return;
      // Calcula o resultado
      const result = compute(prev, operator, current);
      // Se divisão por zero, anima shake e mostra mensagem
      if (result === null) {
        shake();
        showMsg(getRandom(messages.zero));
        return;
      }
      // Formata o resultado
      const res = fmt(result);
      // Atualiza o histórico
      history = prev + ' ' + operator + ' ' + current + ' =';
      histEl.textContent = history;
      // Limpa a expressão
      exprEl.textContent = '';
      // Atualiza o display
      updateDisplay(res);
      // Easter egg for special numbers
      // Verifica se o número é especial
      const num = parseFloat(res);
      if (specialNumbers.includes(num)) {
        // Mostra mensagem especial
        showMsg(getRandom(messages.special));
      } else {
        // Mostra mensagem de resultado com o valor
        const msg = getRandom(messages.result).replace('{val}', res);
        showMsg(msg);
      }

      // Reseta as variáveis
      current = res; prev = ''; operator = '';
      shouldReset = true;
      return;
    }

    // Decimal point
    if (key === '.') {
      // Se deve resetar, inicia com '0.'
      if (shouldReset) {
        current = '0.';
        shouldReset = false;
        updateDisplay(current);
        return;
      }
      // Se não contém ponto, adiciona
      if (!current.includes('.')) {
        current += '.';
        updateDisplay(current);
      }
      return;
    }
    
     // Digit input
    // Se deve resetar, define current como a tecla
    if (shouldReset) {
      current = key;
      shouldReset = false;
    } else {
      // Caso contrário, concatena
      current = current === '0' ? key : current + key;
    }
    // Limita a 10 caracteres
    if (current.length > 10) current = current.slice(0, 10);
    // Atualiza o display
    updateDisplay(current);
  }

   // --- Action buttons (A, B, START, SELECT) ---
  // Função para botões de ação
  function action(btn) {
    // Mapeia botões para ações
    if (btn === 'A')      input('=');
    if (btn === 'B')      input('AC');
    if (btn === 'SELECT') showMsg("SELECT: Modo turbo ainda em desenvolvimento!");
    if (btn === 'START')  showMsg(getRandom(messages.start));
  }

  // --- Keyboard support ---
  // Adiciona listener para eventos de teclado
  document.addEventListener('keydown', (e) => {
    // Mapeamento de teclas do teclado para ações da calculadora
    const keyMap = {
      'Enter':     '=',
      'Backspace': 'DEL',
      'Escape':    'AC',
      '+': '+',
      '-': '−',
      '*': '×',
      '/': '÷',
      '.': '.',
      ',': '.',
      '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
      '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
    };
    // Se a tecla está no mapa, previne o comportamento padrão e chama input
    if (keyMap[e.key]) {
      e.preventDefault();
      input(keyMap[e.key]);
    }
  });

   // Retorna as funções públicas
   return { input, action };
})();

// ===== INIT =====
// Quando o DOM estiver carregado, inicializa
document.addEventListener('DOMContentLoaded', () => {
  // Cria as bolas de fundo
  createBackgroundBalls();
  // Inicializa as dicas
  initHints();

   // Welcome message on load
  // Mensagens de boas-vindas
  const welcomeMessages = [
    "PROF. OAK: Bem-vindo a POKÉCALC! Use START para a dica.",
    "PIKACHU está pronto para calcular! ★ Gotta Calculate ★",
  ];
  // Mostra uma mensagem de boas-vindas após 800ms
  setTimeout(() => showMsg(getRandom(welcomeMessages)), 800);
});








  
