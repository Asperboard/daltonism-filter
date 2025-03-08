/*
** EPITECH PROJECT, 2024
** Quiz des Émotions (Spinoff)
** File description:
** french-quiz.js
*/

// 🎯 Fetch DOM Elements
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const playAgainButton = document.getElementById("play-again-btn");


// 🆕 Score and Progress Elements
const scoreDisplay = document.createElement("p");
const progressDisplay = document.createElement("p");
document.getElementById("game").insertBefore(scoreDisplay, nextButton);
document.getElementById("game").insertBefore(progressDisplay, nextButton);


// 🛠 Hardcoded French Questions About Emotions
const questions = [
    {
        question: "Quelle émotion ressentez-vous lorsque vous gagnez un concours ?",
        answers: ["Tristesse", "Colère", "Joie", "Peur"],
        correct: 2
    },
    {
        question: "Quelle émotion ressentez-vous lorsque vous perdez quelque chose d’important ?",
        answers: ["Joie", "Tristesse", "Sérénité", "Excitation"],
        correct: 1
    },
    {
        question: "Quelle émotion est souvent associée à un danger soudain ?",
        answers: ["Peur", "Dégoût", "Bonheur", "Fatigue"],
        correct: 0
    },
    {
        question: "Quelle émotion ressentez-vous lorsqu’un ami vous trahit ?",
        answers: ["Amour", "Colère", "Joie", "Soulagement"],
        correct: 1
    },
    {
        question: "Quelle émotion peut être causée par une mauvaise odeur ?",
        answers: ["Dégoût", "Peur", "Tristesse", "Joie"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

// 🎯 Function: Start the Game
function startGame() {
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
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.addEventListener("click", () => checkAnswer(index));
        answersContainer.appendChild(button);
    });

    feedback.textContent = "";
    nextButton.style.display = "none";
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

    nextButton.style.display = "block";
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

    // Show "Play Again" button
    playAgainButton.style.display = "block";
}

// 🎯 Function: Restart the Quiz
function playAgain() {
    startGame();
}

// 🎯 Function: Update Score Display
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
    playAgainButton.addEventListener("click", playAgain);
    startGame(); // Automatically start the quiz on page load
});
