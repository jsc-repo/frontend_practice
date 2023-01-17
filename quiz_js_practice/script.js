const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const body = document.querySelector("body");
const questionContainer = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const answerBtns = document.getElementById("answer-buttons");

let randQuestion;
let answerBtn;

const questions = [
  {
    question: "What is 2 + 2?",
    answers: [
      {
        text: "4",
        correct: true,
      },
      {
        text: "3",
        correct: false,
      },
      {
        text: "2",
        correct: false,
      },
      {
        text: "1",
        correct: false,
      },
    ],
  },
  {
    question: "Who was the first President?",
    answers: [
      {
        text: "Abe Lincoln",
        correct: false,
      },
      {
        text: "Donald Trump",
        correct: false,
      },
      {
        text: "G. Washington",
        correct: true,
      },
      {
        text: "Biden",
        correct: false,
      },
    ],
  },
  {
    question: "What is 3 + 2?",
    answers: [
      {
        text: "4",
        correct: false,
      },
      {
        text: "10",
        correct: false,
      },
      {
        text: "5",
        correct: true,
      },
      {
        text: "7",
        correct: false,
      },
    ],
  },
  {
    question: "What is 10 - 5?",
    answers: [
      {
        text: "15",
        correct: false,
      },
      {
        text: "5",
        correct: true,
      },
      {
        text: "50",
        correct: false,
      },
      {
        text: "-5",
        correct: false,
      },
    ],
  },
  {
    question: "What is 3 x 2?",
    answers: [
      {
        text: "5",
        correct: false,
      },
      {
        text: "1",
        correct: false,
      },
      {
        text: "32",
        correct: false,
      },
      {
        text: "6",
        correct: true,
      },
    ],
  },
];

startBtn.addEventListener("click", startGame);

function startGame() {
  console.log("started");
  startBtn.classList.add("hide");
  questionContainer.classList.remove("hide");
  setNextQuestion();
}

// set the next question
function setNextQuestion() {
  answerBtns.innerHTML = "";
  body.classList.remove("correct");
  randQuestion = chooseRandomQuestion();
  questionEl.firstChild.textContent = randQuestion.question;

  for (let i = 0; i < 4; i++) {
    const newBtn = document.createElement("button");
    newBtn.classList.add("btn");
    newBtn.dataset.answerChoice = randQuestion.answers[i].text;
    newBtn.textContent = randQuestion.answers[i].text;
    newBtn.addEventListener("click", selectAnswer);

    if (randQuestion.answers[i].correct) {
      answerBtn = newBtn;
    }

    answerBtns.appendChild(newBtn);
  }
}

function chooseRandomQuestion() {
  const randNum = Math.floor(Math.random() * questions.length);
  return questions[randNum];
}

function selectAnswer() {
  const choice = this;
  if (choice === answerBtn) {
    console.log("CORRECT");

    body.classList.add("correct");
    setTimeout(() => {
      setNextQuestion();
    }, 1500);
  } else {
    body.classList.add("wrong");
    setTimeout(() => {
      body.classList.remove("wrong");
    }, 1000);
    console.log("Try Again");
  }
}
