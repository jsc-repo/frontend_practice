const pokeAPIBaseURL = "https://pokeapi.co/api/v2/pokemon/";
const board = document.getElementById("board");
let hasFlippedCard = false;
let firstCard, secondCard;
let isPaused = false;

const createEightRandNums = () => {
  const uniqueEight = new Set();

  while (uniqueEight.size < 8) {
    const randNum = Math.ceil(Math.random() * 150);
    uniqueEight.add(randNum);
  }

  return [...uniqueEight];
};

const fetchPokemon = async () => {
  const numsArray = createEightRandNums();
  const responses = await Promise.all(
    numsArray.map((num) => fetch(pokeAPIBaseURL + num))
  );

  const pokeArray = await Promise.all(responses.map((r) => r.json()));
  return [...pokeArray, ...pokeArray];
};

const displayPokemon = async () => {
  const pokeArray = await fetchPokemon();

  pokeArray.sort((_) => 0.5 - Math.random());

  const pokeHTML = pokeArray
    .map((p) => {
      return `<div class="card" id="card" onclick="clickCard(this)" data-pokename="${p.name}"> 
      <img class="front" src="${p.sprites.front_default}" alt="${p.name}" />
      <img class="back" src="pokeball.png" alt="pokeball" />
      </div>`;
    })
    .join("");

  board.innerHTML = pokeHTML;
};

function clickCard(card) {
  if (isPaused) return;

  if (card === firstCard) return;

  card.classList.add("rotated");

  if (!hasFlippedCard) {
    firstCard = card;
    console.log("firstCard", firstCard);
    hasFlippedCard = true;
  } else {
    secondCard = card;
    hasFlippedCard = false;
    checkMatch();
  }
}

const checkMatch = () => {
  isPaused = true;
  if (firstCard.dataset.pokename === secondCard.dataset.pokename) {
    firstCard.classList.add("disablePointer");
    secondCard.classList.add("disablePointer");
    setTimeout(() => {
      isPaused = false;
    }, 1500);
  } else {
    isPaused = true;
    setTimeout(() => {
      firstCard.classList.remove("rotated");
      secondCard.classList.remove("rotated");
      [firstCard, secondCard] = [null, null];
      console.log(firstCard, secondCard);
      isPaused = false;
      console.log("Try again");
    }, 2000);
  }
};

const resetGame = () => {
  displayPokemon();
};

resetGame();
