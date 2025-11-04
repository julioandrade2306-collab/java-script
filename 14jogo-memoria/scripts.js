// scripts.js — versão corrigida e robusta

// Variáveis de estado do jogo
let hasFlippedCard = false;
let lockBoard = false;
let firstCard = null;
let secondCard = null;

// Contador de tentativas
let tentativas = 0;
let tentativasDiv = null;

// Função para atualizar a área de tentativas na tela
function atualizarTentativas() {
  if (!tentativasDiv) return;
  tentativasDiv.textContent = `Tentativas: ${tentativas}`;
}

// Função que reseta o controle do tabuleiro
function resetBoardState() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

// Verifica se formou par
function checkForMatch() {
  const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  if (isMatch) {
    // desativa os cliques nas cartas que casaram
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoardState();
    checkWin(); // opcional: verifica vitória
  } else {
    // desvira as cartas após um tempo
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoardState();
    }, 1500);
  }
}

// Função chamada ao clicar em uma carta
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return; // evita clicar na mesma carta duas vezes

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // segunda carta
  secondCard = this;
  lockBoard = true;

  // incrementa tentativas quando o jogador vira a segunda carta
  tentativas++;
  atualizarTentativas();

  checkForMatch();
}

// Embarralha (shuffle) as cartas definindo order
function shuffleCards(cards) {
  cards.forEach(card => {
    const randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

// Verifica se todas as cartas já foram pareadas (vitória)
function checkWin() {
  const remaining = document.querySelectorAll('.carta:not(.flip)').length;
  // se nenhuma carta restante (todas viradas e desativadas), jogador venceu
  // Atenção: dependendo do fluxo, pode querer outro critério. Aqui é simples:
  const activeCards = document.querySelectorAll('.carta');
  // Se todas as cartas tiverem o evento de clique removido, podemos dizer que venceu
  const anyClickable = Array.from(activeCards).some(c => c.onclick || c.dataset.framework && c.classList.contains('flip') === false);
  // Não usamos anyClickable estrito — em vez disso, vamos contar pares já desativados:
  const disabledCount = Array.from(activeCards).filter(c => !c.onclick && !c.classList.contains('flip') === false).length;
  // Simples check: se todas as cartas tiverem a classe 'flip' e não apresentarem evento de clique,
  // alertamos vitória. (Isso é apenas UX simples.)
  const totalCards = activeCards.length;
  const flippedCount = Array.from(activeCards).filter(c => c.classList.contains('flip')).length;
  if (flippedCount === totalCards) {
    setTimeout(() => {
      alert(`Parabéns! Você encontrou todos os pares em ${tentativas} tentativas.`);
    }, 300);
  }
}

// Inicialização do jogo após DOM pronto
window.addEventListener('DOMContentLoaded', () => {
  // Seleciona cartas e elementos somente depois do DOM estar carregado
  const cards = document.querySelectorAll('.carta');
  tentativasDiv = document.getElementById('tentativas');
  const reiniciarBtn = document.querySelector('input[type="button"][value="reiniciar"]');

  if (!tentativasDiv) {
    console.warn('Elemento #tentativas não encontrado no DOM.');
  } else {
    atualizarTentativas();
  }

  // Embaralha as cartas
  shuffleCards(cards);

  // Adiciona evento de clique a todas as cartas
  cards.forEach(card => card.addEventListener('click', flipCard));

  // Se o botão reiniciar existir, zera o contador e recarrega a página (ou apenas reseta)
  if (reiniciarBtn) {
    reiniciarBtn.addEventListener('click', () => {
      // Se quiser apenas zerar contador sem recarregar:
      // tentativas = 0; atualizarTentativas();
      // Para manter comportamento atual que recarrega a página:
      tentativas = 0;
      atualizarTentativas();
      window.location.reload();
    });
  } else {
    console.warn('Botão de reiniciar não encontrado.');
  }

  console.log('Jogo inicializado. Cartas:', cards.length, 'TentativasDiv:', !!tentativasDiv);
});
