import { quizData } from "./data.js";

const quizContainer = document.getElementById("quiz-container");
const submitButton = document.getElementById("submit-btn");
const resultContainer = document.getElementById("result-container");
const attemptsCount = document.getElementById("attempts-count");
const scoreCount = document.getElementById("score-count");

const totalQuestions = 2;
// const totalQuestions = quizData.length;
let currentQuestionIndex = 0;
let score = 0;
let attempts = 0;
const userSelectedAnswers = new Array(totalQuestions).fill(null);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function updateAttempts() {
  attemptsCount.textContent = `${attempts} / ${totalQuestions}`;
}

function updateScore() {
  scoreCount.textContent = `${score}/${totalQuestions}`;
}

function displayQuestion(question) {
  quizContainer.innerHTML = "";

  const questionText = document.createElement("p");
  questionText.innerHTML = question.question;
  quizContainer.appendChild(questionText);

  const options = Object.values(question.options);
  options.forEach((option, index) => {
    const optionLabel = document.createElement("label");
    const optionInput = document.createElement("input");
    optionInput.type = "radio";
    optionInput.name = "question";
    optionInput.value = option;
    optionInput.id = `option-${index}`;
    optionLabel.appendChild(optionInput);
    optionLabel.innerHTML += option;
    optionLabel.innerHTML += `</br>`;
    quizContainer.appendChild(optionLabel);
  });
}
function displayResult() {
  resultContainer.innerHTML = "";

  const resultTitle = document.createElement("h2");
  resultTitle.textContent = `Your score: ${score}/${totalQuestions}`;
  resultContainer.appendChild(resultTitle);

  const answersList = document.createElement("ul");
  for (let index = 0; index < userSelectedAnswers.length; index++) {
    const question = quizData[index];
    const userAnswer = userSelectedAnswers[index];
    const correctAnswer = question.options[question.answer];

    let isCorrect = true; // Initialize isCorrect as true

    if (userAnswer !== null) {
      const answerItem = document.createElement("li");
      const userAnswerText = `Your Answer: ${userAnswer}`;
      const correctAnswerText = `Correct Answer: ${correctAnswer}`;

      // Update isCorrect to false if the user's answer doesn't match the correct answer
      if (userAnswer !== correctAnswer) {
        isCorrect = false;
      }

      answerItem.innerHTML = `<br/> <span class="font-bold"> ${
        question.question
      }</span> <br/> <span class="${
        isCorrect ? "text-blue-600" : "text-red-600"
      }"> ${userAnswerText} </span> <br/> ${correctAnswerText}<br/> ${" "}<br/> <hr/> `;

      answersList.appendChild(answerItem);
    }
  }
  resultContainer.appendChild(answersList);
}

submitButton.addEventListener("click", () => {
  const selectedOption = document.querySelector(
    'input[name="question"]:checked'
  );
  if (selectedOption) {
    userSelectedAnswers[currentQuestionIndex] = selectedOption.value;

    console.log(
      selectedOption.value ===
        quizData[currentQuestionIndex].options[
          quizData[currentQuestionIndex].answer
        ]
    );
    if (
      selectedOption.value ===
      quizData[currentQuestionIndex].options[
        quizData[currentQuestionIndex].answer
      ]
    ) {
      score++;
      console.log(score);
    }
  }

  attempts++;
  currentQuestionIndex++;
  if (currentQuestionIndex < totalQuestions) {
    displayQuestion(quizData[currentQuestionIndex]);
  } else {
    submitButton.style.display = "none";
    displayResult();
  }
  updateAttempts();
  updateScore();
});

shuffleArray(quizData);
displayQuestion(quizData[currentQuestionIndex]);
updateAttempts();
updateScore();
