const question = querySelector("#question");
const choices = Array.from(querySelectorAll(".choice-text"));
const progressText = querySelector("#progressText");
const scoreText = querySelector("#score");
const progressBarFull = querySelector("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What is 29 + 29?",
    choice1: "100",
    choice2: "58",
    choice3: "78",
    choice4: "46",
    answer: 2,
  },

  {
    question: "Who put the Bible together",
    choice1: "Catholics",
    choice2: "Athiests",
    choice3: "Mormons",
    choice4: "A Protestant group",
    answer: 1,
  },

  {
    question: "What percent of Americans are Millionaires?",
    choice1: "1%",
    choice2: "20%",
    choice3: "5.8%",
    choice4: "17.9%",
    answer: 3,
  },

  {
    question:
      "How many times was George Washington elected President of the United States of America?",
    choice1: "2 times",
    choice2: "5 times",
    choice3: "4 times",
    choice4: "1 time",
    answer: 1,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentStore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectorAnswer = selectedChoice.dataset["number"];

    let classApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame()
