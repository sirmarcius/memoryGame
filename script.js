// Jogo da Memôria
// Autor: Márcio Gusmão
// Data: 07/02/2023
 
const cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
let currentCards = [];
let card1 = null;
let card2 = null;
let numMoves = 0;

const cardImages = {
  1: 'img/card-front-1.jpg',
  2: 'img/card-front-2.jpg',
  3: 'img/card-front-3.jpg',
  4: 'img/card-front-4.jpg',
  5: 'img/card-front-5.jpg',
  6: 'img/card-front-6.jpg',
};

// Embaralhar as cartas
function shuffleCards() {
  currentCards = [];
  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  for (let i = 0; i < cards.length; i++) {
    let card = {
      value: cards[i],
      flipped: false,
    };
    currentCards.push(card);
  }
  renderCards();
}

// Renderizar as cartas na tela
function renderCards() {
  let cardsHTML = "";
  for (let i = 0; i < currentCards.length; i++) {
    let card = currentCards[i];
    if (card.flipped) {
      cardsHTML += `<div class="card flipped">
                     <img src="${cardImages[card.value]}"/>
                   </div>`;
    }
     else {
      cardsHTML += `<div class="card" onclick="flipCard(${i})"></div>`;
    }
  }
  document.querySelector(".cards").innerHTML = cardsHTML;
  
}

// Girar uma carta
function flipCard(index) {
  if (card1 && card2) {
    return;
  }
  let card = currentCards[index];
  card.flipped = true;
  if (!card1) {
    card1 = card;
  } else {
    card2 = card;
    numMoves++;
    document.querySelector(".moves").innerHTML = numMoves;
    if (card1.value !== card2.value) {
      setTimeout(() => {
        card1.flipped = false;
        card2.flipped = false;
        card1 = null;
        card2 = null;
        renderCards();
      }, 1000);
    } else {
      card1 = null;
      card2 = null;
    }
  }
  renderCards();

  let allCardsFlipped = true;
for (let i = 0; i < currentCards.length; i++) {
  let card = currentCards[i];
  if (!card.flipped) {
    allCardsFlipped = false;
    break;
  }
}

if (allCardsFlipped) {
  alert(`Parabéns! Você ganhou o jogo com ${numMoves} movimentos!`);
}

}

shuffleCards();

