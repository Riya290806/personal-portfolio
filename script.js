const themeToggle = document.getElementById("theme-toggle");
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const quizNext = document.getElementById("quiz-next");
const quizScore = document.getElementById("quiz-score");
const quizRestart = document.getElementById("quiz-restart");
const quizProgress = document.getElementById("quiz-progress");

const quizQuestions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "High Tech Machine Language"
    ],
    correctIndex: 0
  },
  {
    question: "Which language is used to style a webpage?",
    options: ["Python", "CSS", "C++", "Java"],
    correctIndex: 1
  },
  {
    question: "Which HTML tag creates a button?",
    options: ["<btn>", "<input>", "<button>", "<click>"],
    correctIndex: 2
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style System",
      "Cascading Style Sheets",
      "Colorful Styling Syntax"
    ],
    correctIndex: 2
  },
  {
    question: "Which of these is a programming language?",
    options: ["HTML", "CSS", "HTTP", "Python"],
    correctIndex: 3
  }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeToggle.textContent = "Light Mode";
  } else {
    themeToggle.textContent = "Dark Mode";
  }
});

function showQuestion() {
  const questionData = quizQuestions[currentQuestion];
  selectedOption = null;

  quizProgress.textContent =
    "Question " + (currentQuestion + 1) + " of " + quizQuestions.length;
  quizQuestion.textContent = questionData.question;
  quizOptions.innerHTML = "";

  quizScore.style.display = "none";
  quizRestart.style.display = "none";
  quizNext.style.display = "inline-block";
  quizProgress.style.display = "block";
  quizQuestion.style.display = "block";
  quizOptions.style.display = "block";

  if (currentQuestion === quizQuestions.length - 1) {
    quizNext.textContent = "Submit";
  } else {
    quizNext.textContent = "Next";
  }

  for (let i = 0; i < questionData.options.length; i++) {
    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.className = "quiz-option";
    optionButton.textContent = questionData.options[i];

    optionButton.addEventListener("click", function () {
      selectedOption = i;

      const allOptions = quizOptions.querySelectorAll(".quiz-option");
      for (let j = 0; j < allOptions.length; j++) {
        allOptions[j].classList.remove("selected");
      }
      optionButton.classList.add("selected");
    });

    quizOptions.appendChild(optionButton);
  }
}

function checkSelectedAnswer() {
  if (selectedOption === quizQuestions[currentQuestion].correctIndex) {
    score++;
  }
}

function showFinalScore() {
  quizProgress.style.display = "none";
  quizQuestion.style.display = "none";
  quizOptions.style.display = "none";
  quizNext.style.display = "none";

  quizScore.style.display = "block";
  quizRestart.style.display = "inline-block";
  quizScore.textContent = "Final Score: " + score + " / 5";
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedOption = null;
  showQuestion();
}

quizNext.addEventListener("click", function () {
  if (selectedOption === null) {
    return;
  }

  checkSelectedAnswer();
  currentQuestion++;

  if (currentQuestion < quizQuestions.length) {
    showQuestion();
  } else {
    showFinalScore();
  }
});

quizRestart.addEventListener("click", function () {
  restartQuiz();
});

showQuestion();
