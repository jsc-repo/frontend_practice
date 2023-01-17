let sequence = [];

// in milliseconds
const gameSpeed = 1000;

let isActive = true;

const colors = ["red", "blue", "yellow", "green"];

const panels = document.querySelectorAll(".panel");

panels.forEach((p) => p.addEventListener("click", handleClick));

async function simonSays() {
  for (let i = 0; i < 5; i++) {
    //computer's turn
    let randNum = Math.floor(Math.random() * 4);
    sequence.push(colors[randNum]);
    await flashPanel(i);

    // wait for player's turn
  }
}

function flashPanel(i) {
  return new Promise((resolve, reject) => {
    panels.forEach((p) => {
      if (p.dataset.color === sequence[i]) {
        setTimeout(() => {
          p.classList.add("active");
          console.log(p.dataset.color);

          setTimeout(() => {
            p.classList.remove("active");
            resolve();
          }, gameSpeed);
        }, gameSpeed);
      }
    });
  });
}

function handleClick() {
  console.log(this);
}

simonSays();
