/*
** EPITECH PROJECT, 2024
** mockup
** File description:
** script.js
*/

// 🎯 Fetch DOM Elements (with corrected IDs)
const questionInput = document.getElementById("question-input");
const answerInputs = document.querySelectorAll("#answers-inputs input");
const correctAnswerInput = document.getElementById("correct-answer");
const questionsList = document.getElementById("questions-list");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");

const startOverButton = document.getElementById("start-over-btn");
const playAgainButton = document.getElementById("play-again-btn");
const editSetButton = document.getElementById("edit-set-btn");


const editorSection = document.getElementById("editor");
const gameSection = document.getElementById("game");

// 🆕 Score and Progress Elements
const scoreDisplay = document.createElement("p");
const progressDisplay = document.createElement("p");
document.getElementById("game").insertBefore(scoreDisplay, nextButton);
document.getElementById("game").insertBefore(progressDisplay, nextButton);

// 🛠 Game Data
let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// 🎮 Function: Add a Question
function addQuestion() {
    const questionText = questionInput.value.trim();
    let answers = [];
    let correctAnswer = parseInt(correctAnswerInput.value, 10) - 1; // Convert to 0-based index

    // Collect answers from inputs
    answerInputs.forEach(input => {
        const answerText = input.value.trim();
        if (answerText) answers.push(answerText);
    });

    // Validate question before adding
    if (!questionText || answers.length < 2 || correctAnswer < 0 || correctAnswer >= answers.length) {
        alert("Veuillez entrer une question valide avec au moins 2 réponses et un index de réponse correcte.");
        return;
    }

    // Store question in the array
    questions.push({ question: questionText, answers, correct: correctAnswer });

    // Add to Questions List UI
    const li = document.createElement("li");
    li.textContent = questionText;
    questionsList.appendChild(li);

    alert("Question ajoutée ! Ajoutez-en une autre ou commencez le jeu.");

    resetQuestionForm();
}

// 🎯 Function: Reset Input Fields
function resetQuestionForm() {
    questionInput.value = "";
    answerInputs.forEach(input => (input.value = ""));
    correctAnswerInput.value = "1";
}

// 🎯 Function: Start the Game
function startGame() {
    if (questions.length === 0) {
        alert("Aucune question ajoutée pour le moment !");
        return;
    }

    document.getElementById("editor").style.display = "none"; // Hide creator
    document.getElementById("game").style.display = "block"; // Show game
    currentQuestionIndex = 0;
    score = 0;
    feedback.textContent = "";
    playAgainButton.style.display = "none";
    updateScore();
    loadQuestion();
}

// 🎯 Function: Load a Question
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    answersContainer.innerHTML = ""; // Clear previous answers

    // Create answer buttons dynamically
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.addEventListener("click", () => checkAnswer(index));
        answersContainer.appendChild(button);
    });

    feedback.textContent = ""; // Reset feedback
    nextButton.style.display = "none"; // Hide "Next" button
    updateProgress();
}

// 🎯 Function: Check Answer
function checkAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].correct;
    const buttons = answersContainer.getElementsByTagName("button");

    if (selectedIndex === correctIndex) {
        feedback.textContent = "✅ Correcte !";
        buttons[selectedIndex].classList.add("correct");
        score++; // ✅ Increase score if correct
    } else {
        feedback.textContent = "❌ Mauvaise réponse !";
        buttons[selectedIndex].classList.add("wrong");
        buttons[correctIndex].classList.add("correct");
    }

    nextButton.style.display = "block"; // Show "Next" button
    updateScore();
}

// 🎯 Function: Load Next Question
function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

// 🎯 Function: End the Game
function endGame() {
    questionText.textContent = "Quiz Terminé ! 🎉";
    answersContainer.innerHTML = "";
    feedback.textContent = `Merci d'avoir joué !\nVotre score est de ${score} / ${questions.length}.`;
    nextButton.style.display = "none";

    // Show Play Again & Edit Set buttons
    playAgainButton.style.display = "block";
    editSetButton.style.display = "block";
}

// 🎯 Function: Start Over (Clear all questions)
function startOver() {
    if (confirm("Êtes-vous sûr de vouloir tout réinitialiser ?")) {
        questions = [];
        questionsList.innerHTML = "";
        resetQuestionForm();
        alert("Quiz réinitialisé ! Commencez à ajouter de nouvelles questions.");
    }
}

// 🎯 Function: Play Again (Restart quiz with same questions)
function playAgain() {
    currentQuestionIndex = 0;
    score = 0;
    feedback.textContent = "";
    playAgainButton.style.display = "none";
    editSetButton.style.display = "none";

    loadQuestion();
}

// 🎯 Function: Edit Set (Go back to question editor)
function editSet() {
    gameSection.style.display = "none";
    editorSection.style.display = "block";
}// 🎯 Function: Update Score Display

function updateScore() {
    scoreDisplay.textContent = `Score : ${score} / ${questions.length}`;
}

// 🎯 Function: Update Progress Display
function updateProgress() {
    progressDisplay.textContent = `Question : ${currentQuestionIndex + 1} / ${questions.length}`;
}
// 🎯 Attach Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    nextButton.addEventListener("click", loadNextQuestion);
    startOverButton.addEventListener("click", startOver);
    playAgainButton.addEventListener("click", playAgain);
    editSetButton.addEventListener("click", editSet);
});
